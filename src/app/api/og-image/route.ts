import { NextRequest, NextResponse } from "next/server";

/**
 * Fetches a URL and returns the og:image meta tag value.
 * Used for hover previews on tiles; avoids CORS by proxying on the server.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
  }

  try {
    const res = await fetch(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MyCoreSkills/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    const html = await res.text();

    const ogImageMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    ) || html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
    );

    const imageUrl = ogImageMatch ? ogImageMatch[1].trim() : null;
    if (imageUrl) {
      const absolute = imageUrl.startsWith("http")
        ? imageUrl
        : new URL(imageUrl, parsed.origin).toString();
      return NextResponse.json({ imageUrl: absolute });
    }
    return NextResponse.json({ imageUrl: null });
  } catch {
    return NextResponse.json({ imageUrl: null });
  }
}
