import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getLaunchAreasWithTiles } from "./actions/launch-areas";
import { DashboardClient } from "./dashboard-client";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const areas = await getLaunchAreasWithTiles();
  const isAdmin = isAdminEmail(user.email ?? undefined);

  return <DashboardClient initialAreas={areas} isAdmin={isAdmin} />;
}
