import { ImageResponse } from "next/og";

export const runtime = "edge";

function clamp(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = clamp(searchParams.get("title") ?? "Murathan Algır", 100);
  const desc = clamp(
    searchParams.get("desc") ?? "Full-Stack Developer · Next.js / TypeScript",
    160
  );
  const badge = clamp(searchParams.get("badge") ?? "Portfolio", 24);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        }}
      >
        <div style={{ display: "flex", alignSelf: "flex-start" }}>
          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: 28,
              opacity: 0.95,
            }}
          >
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 34,
              opacity: 0.9,
              lineHeight: 1.35,
              width: 900,
              maxWidth: "100%",
            }}
          >
            {desc}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 0.9,
            fontSize: 28,
          }}
        >
          <div>murathan.online</div>
          <div>github.com/murathanalgir</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
