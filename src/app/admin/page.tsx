import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminLaunchAreasWithTiles } from "./actions";
import { AdminClient } from "./admin-client";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email ?? undefined)) redirect("/");

  const areas = await getAdminLaunchAreasWithTiles();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AdminClient initialAreas={areas} />
    </div>
  );
}
