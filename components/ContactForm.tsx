"use client";

import { useState } from "react";

type State = { type: "idle"|"loading"|"ok"|"error"; msg?: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
    };

    setState({ type: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>({ error: "Unknown error"}));
        throw new Error(data.error || "Request failed");
      }
      setState({ type: "ok", msg: "Mesajın alındı. En kısa sürede dönüş yapacağım." });
      form.reset();
    } catch (err:any) {
      setState({ type: "error", msg: err?.message || "Bir hata oluştu" });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm mb-1" htmlFor="name">Ad Soyad</label>
        <input id="name" name="name" required minLength={2} maxLength={80}
               className="w-full rounded-xl border px-3 py-2 bg-transparent" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="email">E-posta</label>
        <input id="email" name="email" type="email" required
               className="w-full rounded-xl border px-3 py-2 bg-transparent" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="message">Mesaj</label>
        <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={6}
                  className="w-full rounded-xl border px-3 py-2 bg-transparent" />
      </div>

      {/* Honeypot: kullanıcı görmesin, botlar doldursun */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button disabled={state.type==="loading"}
              className="rounded-xl border px-4 py-2 hover:shadow transition disabled:opacity-60">
        {state.type==="loading" ? "Gönderiliyor..." : "Gönder"}
      </button>

      {state.type==="ok" && <p className="text-sm text-green-500">{state.msg}</p>}
      {state.type==="error" && <p className="text-sm text-red-500">{state.msg}</p>}
    </form>
  );
}