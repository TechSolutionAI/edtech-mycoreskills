# Updating tiles and links

## In the Admin UI (easiest)

1. Sign in at **MyCoreSkills**.
2. On the hero screen, click **Admin**.
3. **Reorder launch areas:** Use the ▲ and ▼ buttons next to each area name to change the order of sections (Math, ReadTheory, etc.) on the dashboard.
4. **Open an area:** Click an area name to expand it and see its tiles.
5. **Reorder tiles:** Use ▲ and ▼ next to each tile to change the order in the list students see.
6. **Add a tile:** Click “+ Add tile”, enter **Title** and **URL**, then **Add**.
7. **Edit a tile:** Click **Edit**, change **Title** or **URL**, then **Save**.
8. **Hide a tile:** Click **Hide** so it no longer appears for students (you can **Show** again later).
9. **Remove a tile:** Click **Remove** and confirm to delete it.

No code or deploy is required; changes apply after you refresh the dashboard.

## In the database (Supabase)

- **Tables:** `launch_areas` (sections) and `tiles` (links per area).
- **Tiles:** Each row has `launch_area_id`, `title`, `url`, `sort_order`, `is_visible`. Edit or insert rows in the Supabase Table Editor or via SQL.
- **Launch areas:** `slug` (e.g. `math`, `reading`, `my-workshops`), `title`, `sort_order`. The app expects the seven slugs used in the seed; reordering is done via `sort_order`.

## Background videos

Video per section is configured in code: `src/app/config/launch-videos.ts`. Each key is a launch area `slug`; the value is the path or URL of the .mp4. Place files in `public/videos/` or set full URLs to your hosted Luma videos.
