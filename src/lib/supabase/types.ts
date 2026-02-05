export type LaunchArea = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Tile = {
  id: string;
  launch_area_id: string;
  title: string;
  url: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

export type LaunchAreaWithTiles = LaunchArea & { tiles: Tile[] };
