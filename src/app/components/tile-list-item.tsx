"use client";

import { useEffect, useState } from "react";

type TileListItemProps = {
  title: string;
  url: string;
};

export function TileListItem({ title, url }: TileListItemProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover) return;
    const encoded = encodeURIComponent(url);
    fetch(`/api/og-image?url=${encoded}`)
      .then((r) => r.json())
      .then((d: { imageUrl?: string | null }) => setPreviewUrl(d.imageUrl ?? null))
      .catch(() => setPreviewUrl(null));
  }, [url, hover]);

  const initial = title.trim().charAt(0).toUpperCase() || "?";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors text-left group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-neutral-800 flex items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setPreviewUrl(null)}
          />
        ) : (
          <span className="text-xl font-semibold text-neutral-400">{initial}</span>
        )}
      </div>
      <span className="font-medium text-white group-hover:text-white/90">{title}</span>
    </a>
  );
}
