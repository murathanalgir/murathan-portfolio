import { NextResponse } from "next/server";
import { getAll } from "@/lib/mdx";

export const runtime = "nodejs";

export async function GET() {
  const site = "https://murathan.online";
  const posts = getAll("posts");
  const items = posts
    .map(p => {
      const url = `${site}/blog/${p.slug}`;
      return `
        <item>
          <title><![CDATA[${p.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          <description><![CDATA[${p.summary ?? ""}]]></description>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Murathan Algır — Blog</title>
<link>${site}</link>
<description>MDX posts</description>
${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
