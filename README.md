# MyCoreSkills Student Dashboard

Login-gated student launch dashboard: hero + scroll sections (Foxton-style), each section opens a full-page list of tiles (links). Built with Next.js, Supabase Auth, and a data-driven tile system.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - In the SQL Editor, run the migration: `supabase/migrations/001_launch_areas_and_tiles.sql`.
   - Run the seed (optional): `supabase/seed.sql`.
   - In Authentication → Providers, enable Email and set up a user for testing.

3. **Environment**
   - Copy `.env.example` to `.env.local`.
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the Supabase project **Connect** / API settings.

4. **Background videos (optional)**
   - Add one `.mp4` per launch area under `public/videos/`:
     - `math.mp4`, `reading.mp4`, `english-grammar.mp4`, `science.mp4`, `typing.mp4`, `my-workshops.mp4`, `im-bored.mp4`
   - Or change URLs in `src/app/config/launch-videos.ts` to point to hosted Luma videos.

5. **Run**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) → redirects to `/login` until signed in.

## Updating tiles and links

- **In the app:** Sign in, go to **Admin** (link on the hero). There you can:
  - **Reorder launch areas** — use ▲/▼ next to each area name.
  - **Expand an area** — click the area to see its tiles.
  - **Reorder tiles** — use ▲/▼ next to each tile.
  - **Add a tile** — “+ Add tile”, then enter Title and URL.
  - **Edit a tile** — “Edit”, change Title/URL, “Save”.
  - **Show/Hide** — toggle visibility without deleting.
  - **Remove** — delete a tile.

- **In the database:** Tiles are in the `tiles` table (`launch_area_id`, `title`, `url`, `sort_order`, `is_visible`). Launch areas are in `launch_areas` (`slug`, `title`, `sort_order`). You can edit or seed via Supabase Dashboard or SQL.

## Structure

- **Hero:** First screen; moving dot only here; “Scroll to choose a launch area”.
- **Sections:** One full-screen section per launch area (with optional background video). Clicking a section opens a **full-page list** of tiles for that area.
- **Tiles:** Each tile shows title and, on hover, a preview image from the link’s Open Graph image when available; otherwise a placeholder (first letter of title).
- **Auth:** Supabase Auth; login at `/login`, callback at `/auth/callback`.

## Tech

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.
- Supabase: Auth + Postgres (launch_areas, tiles) with RLS.
