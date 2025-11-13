import { NextRequest, NextResponse } from "next/server";
import { limit } from "@/lib/rateLimit";

export const runtime = "nodejs"; 

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string; 
}


function sanitize(text: unknown): string {
  return typeof text === "string" ? text.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeMarkdown(s: string): string {
  return s.replace(/([_*~`>])/g, "\\$1");
  
}


async function postJson(url: string, body: unknown, attempts = 1) {
  const target =
    process.env.NODE_ENV === "production"
      ? url
      : url.includes("?")
      ? `${url}&wait=true`
      : `${url}?wait=true`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Discord ${res.status}: ${text}`);
    }
    return res.status;
  } catch (err) {
    clearTimeout(timeout);
    if (attempts > 0) {
      await new Promise((r) => setTimeout(r, 500));
      return postJson(url, body, attempts - 1);
    }
    throw err;
  }
}
function stripCodeFences(s: string): string {
  return s
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, ""))
    .replace(/`/g, "´"); 
}



function toDiscordPayload({ name, email, message, ip }:{ name:string; email:string; message:string; ip:string }) {
  const clean = (s: string) => escapeMarkdown(s.trim());
  const raw = stripCodeFences(message);
  const msg = raw.length > 1900 ? raw.slice(0, 1900) + "…" : raw;

  return {
    username: "Portfolio Contact",
    content: "Yeni iletişim formu geldi 📩",
    embeds: [
      {
        title: "Yeni İletişim Formu",
        description: msg,
        color: 0x5865f2,
        fields: [
          { name: "Ad", value: clean(name) || "—", inline: true },
          { name: "E-posta", value: clean(email) || "—", inline: true },
          { name: "IP", value: clean(ip) || "—", inline: true },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
    allowed_mentions: { parse: [] as string[] },
  };
}


async function notifyDiscord({
  name,
  email,
  message,
  ip,
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
}) {
  const url = process.env.WEBHOOK_URL;
  if (!url) throw new Error("Missing DISCORD_WEBHOOK_URL");
  const payload = toDiscordPayload({ name, email, message, ip });
  return await postJson(url, payload, 1);
}


export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip ||
    "0.0.0.0";

  const gate = limit(ip, 60_000, 5);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "Too many requests", retryAfter: gate.retryAfter },
      { status: 429 }
    );
  }


  const body: ContactBody | null = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const message = sanitize(body.message);
  const website = sanitize(body.website); 

 
  if (website.length > 0) return new NextResponse(null, { status: 204 });


  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80)
    errors.name = "Name must be between 2–80 characters.";
  if (!isEmail(email)) errors.email = "Email is invalid.";
  if (message.length < 10 || message.length > 2000)
    errors.message = "Message must be between 10–2000 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Invalid payload", details: errors },
      { status: 400 }
    );
  }


  try {
    const sent = await notifyDiscord({ name, email, message, ip });
    console.log("[contact]", { name, email, sent, ip });
  } catch (err) {
    console.error("[contact] discord webhook error", err);
    return NextResponse.json(
      { error: "Notification failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
