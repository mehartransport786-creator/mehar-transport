import { auth } from "@/auth";

export async function requireAdmin(): Promise<
  { ok: true } | { ok: false; response: Response }
> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { ok: false, response: new Response("Unauthorized", { status: 401 }) };
    }
    return { ok: true };
  } catch (err) {
    console.error("[require-admin] session read failed:", err);
    // Fail closed. A session check that throws must deny, never allow.
    return { ok: false, response: new Response("Unauthorized", { status: 401 }) };
  }
}
