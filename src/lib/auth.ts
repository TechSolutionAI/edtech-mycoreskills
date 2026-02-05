/**
 * Admin check: user email must be in ADMIN_EMAILS (comma-separated in env).
 * Used server-side only; not exposed to the client.
 */
export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const list = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean) ?? [];
  return list.includes(email.toLowerCase());
}
