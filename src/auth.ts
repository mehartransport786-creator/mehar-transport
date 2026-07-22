import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";
import { AuditLog } from "@/lib/models/AuditLog";
import { AdminSession } from "@/lib/models/AdminSession";
import { Role } from "@/lib/models/Role";

// Force TypeScript/Webpack to NOT tree-shake the Role import, which is required for Mongoose populate()
if (!Role) console.warn("Role model missing");
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await connectToDatabase();

          // Populate role to get the role name and permissions
          const admin = await Admin.findOne({ email: credentials.email.toString().toLowerCase() }).populate("role");

          if (!admin) {
            return null;
          }

          if (admin.status !== "active") {
            throw new Error("Account is inactive or locked");
          }

          // Check if account is temporarily locked
          if (admin.lockedUntil && admin.lockedUntil > new Date()) {
            throw new Error("Account is temporarily locked due to multiple failed login attempts. Try again later.");
          }

          const isPasswordValid = await bcryptjs.compare(credentials.password as string, admin.passwordHash);
          const ip = req.headers?.get("x-forwarded-for") || "Unknown IP";
          const userAgent = req.headers?.get("user-agent") || "Unknown Browser";

          if (!isPasswordValid) {
            // Increment failed attempts atomically
            const updatedAdmin = await Admin.findByIdAndUpdate(
              admin._id,
              { $inc: { failedLoginAttempts: 1 } },
              { new: true }
            );
            
            const currentAttempts = updatedAdmin?.failedLoginAttempts || 1;
            
            if (currentAttempts >= 5) {
              // Lock for 15 minutes
              await Admin.findByIdAndUpdate(admin._id, {
                lockedUntil: new Date(Date.now() + 15 * 60 * 1000),
                status: "locked"
              });
            }

            // Log failed attempt
            try {
              await AuditLog.create({
                adminId: admin._id,
                adminEmail: admin.email,
                ip: ip,
                browser: userAgent,
                action: "LOGIN_FAILED",
                module: "auth",
                details: { reason: "Invalid password", attempt: admin.failedLoginAttempts }
              });
            } catch (e) {
              console.error(e);
            }

            return null;
          }

        // Reset failed attempts on success
        admin.failedLoginAttempts = 0;
        admin.lockedUntil = undefined;
        if (admin.status === "locked") admin.status = "active";
        
        const sessionToken = crypto.randomUUID();

        // Create AdminSession
        try {
          await AdminSession.create({
            adminId: admin._id,
            sessionToken: sessionToken,
            ip: ip,
            browser: userAgent,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
          });

          await AuditLog.create({
            adminId: admin._id,
            adminEmail: admin.email,
            ip: ip,
            browser: userAgent,
            action: "LOGIN_SUCCESS",
            module: "auth"
          });

          admin.lastLogin = new Date();
          await admin.save();
        } catch (error) {
          console.error("Failed to create session or audit log", error);
        }

          return {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role?.name || "Admin",
            sessionId: sessionToken
          };
        } catch (error) {
          console.error("Auth error in authorize:", error);
          return null; // Return null on any unexpected error to trigger a normal login failure
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.sessionId = (user as any).sessionId;
      }
      
      if (token.sessionId) {
        try {
          await connectToDatabase();
          const session = await AdminSession.findOne({ sessionToken: token.sessionId, status: "active" });
          if (!session) {
            return null; // Returning null invalidates the JWT
          }
        } catch (error) {
          console.error("Session verification failed", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).sessionId = token.sessionId;
      }
      return session;
    }
  }
});
