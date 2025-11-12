import { NextRequest, NextResponse } from "next/server";
import { limit } from "@/lib/rateLimit";

// Basit yardımcılar
function isString(v: unknown): v is string {
  return typeof v === "string";
}
function saneText(s: unknown) {
  return isString(s) ? s.trim() : "";
}
function isEmail(s: string) {
  // Basit ve güvenli bir kontrol (RFC tam değil ama üretim için yeterli)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    // @ts-expect-error: Next 15'te req.ip olmayabilir; fallback
    req.ip ||
    "0.0.0.0";
  const gate = limit(ip, 60_000, 5);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "Too many requests", retryAfter: gate.retryAfter },
      { status: 429 }
    );
  }

  // Body parse
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  // Alanlar
  const name = saneText((body as any).name);
  const email = saneText((body as any).email);
  const message = saneText((body as any).message);
  const website = saneText((body as any).website); // honeypot

  // Honeypot: bot doldurduysa sessizce 204
  if (website.length > 0) {
    return new NextResponse(null, { status: 204 });
  }

  // Doğrulama
  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 80) {
    errors.name = "Name must be 2–80 characters.";
  }
  if (!isEmail(email)) {
    errors.email = "Email is invalid.";
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = "Message must be 10–2000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid payload", details: errors }, { status: 400 });
  }

  // TODO: Burada e-posta gönderimi / Slack-Discord webhook / DB kaydı yap
  // const url = process.env.WEBHOOK_URL;
  // if (url) {
  //   await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ text: `New contact: ${name} <${email}>\n${message}` }),
  //   });
  // } else {
  //   console.log("[contact]", { name, email, message, ip });
  // }

  console.log("[contact]", { name, email, message, ip });

  return NextResponse.json({ ok: true });
}
