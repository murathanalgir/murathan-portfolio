import { NextRequest, NextResponse } from "next/server";
import { limit } from "@/lib/rateLimit";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().optional(),   // honeypot (boş olmalı)
});

export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip ||
    "0.0.0.0";
  const gate = limit(ip, 60_000, 5); // 1 dakikada 5 istek
  if (!gate.ok) {
    return NextResponse.json(
      { error: "Too many requests", retryAfter: gate.retryAfter },
      { status: 429 }
    );
  }

  // Body parse + doğrulama
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot kontrolü
  if (website && website.trim().length > 0) {
    // Bot tespit edildi gibi davran: 204 dön, ipucu verme
    return new NextResponse(null, { status: 204 });
  }

  // İsteğe bağlı: Slack/Discord/Webhook
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