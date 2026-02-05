"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAdminLaunchAreasWithTiles() {
  const supabase = await createClient();
  const { data: areas, error: areasError } = await supabase
    .from("launch_areas")
    .select("*")
    .order("sort_order", { ascending: true });

  if (areasError) throw areasError;

  const { data: tiles, error: tilesError } = await supabase
    .from("tiles")
    .select("*")
    .order("sort_order", { ascending: true });

  if (tilesError) throw tilesError;

  const tilesByArea = (tiles ?? []).reduce<Record<string, typeof tiles>>((acc, t) => {
    if (!acc[t.launch_area_id]) acc[t.launch_area_id] = [];
    acc[t.launch_area_id].push(t);
    return acc;
  }, {});

  return (areas ?? []).map((a) => ({
    ...a,
    tiles: tilesByArea[a.id] ?? [],
  }));
}

export async function reorderLaunchAreas(areaIds: string[]) {
  const supabase = await createClient();
  for (let i = 0; i < areaIds.length; i++) {
    await supabase
      .from("launch_areas")
      .update({ sort_order: i })
      .eq("id", areaIds[i]);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function reorderTiles(launchAreaId: string, tileIds: string[]) {
  const supabase = await createClient();
  for (let i = 0; i < tileIds.length; i++) {
    await supabase
      .from("tiles")
      .update({ sort_order: i })
      .eq("id", tileIds[i])
      .eq("launch_area_id", launchAreaId);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateLaunchArea(id: string, data: { title?: string }) {
  const supabase = await createClient();
  await supabase.from("launch_areas").update(data).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createTile(launchAreaId: string, data: { title: string; url: string }) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("tiles")
    .select("sort_order")
    .eq("launch_area_id", launchAreaId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();
  const sortOrder = (existing?.sort_order ?? -1) + 1;
  await supabase.from("tiles").insert({
    launch_area_id: launchAreaId,
    title: data.title,
    url: data.url,
    sort_order: sortOrder,
    is_visible: true,
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateTile(
  id: string,
  data: { title?: string; url?: string; is_visible?: boolean }
) {
  const supabase = await createClient();
  await supabase.from("tiles").update(data).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteTile(id: string) {
  const supabase = await createClient();
  await supabase.from("tiles").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}
