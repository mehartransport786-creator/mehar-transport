import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";
import { AuditLog } from "@/lib/models/AuditLog";
import { AdminSession } from "@/lib/models/AdminSession";
import { Role } from "@/lib/models/Role"; // Make sure to import Role
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToDatabase();

        // Populate role to get the role name and permissions
        const admin = await Admin.findOne({ email: credentials.email.toString().toLowerCase() }).populate("role");

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        if (admin.status !== "active") {
          throw new Error("Account is inactive or locked");
        }

        const isPasswordValid = await bcryptjs.compare(credentials.password as string, admin.passwordHash);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        const ip = req.headers?.get("x-forwarded-for") || "Unknown IP";
        const userAgent = req.headers?.get("user-agent") || "Unknown Browser";
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
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.sessionId = (user as any).sessionId;
      }
      
      // On every request, optionally verify the session is still active
      // Doing this here adds a DB call to every protected route hit.
      // For enterprise security, this is often required to support instant revocation.
      if (token.sessionId) {
        try {
          await connectToDatabase();
          const session = await AdminSession.findOne({ sessionToken: token.sessionId, status: "active" });
          if (!session) {
            // Session revoked or not found
            return null; // Returning null invalidates the JWT
          }
          
          // Optionally update lastActivity (debounce this to avoid too many writes, or skip for now)
          // session.lastActivity = new Date();
          // await session.save();
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
  },
  pages: {
    signIn: "/en/admin/login",
  },
  secret: process.env.AUTH_SECRET || "default_secret_for_development_only",
});
