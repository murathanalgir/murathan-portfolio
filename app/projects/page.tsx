import { getAll } from "@/lib/mdx";
import Link from "next/link";

export const metadata = { title: "Projects | Murathan Algır" };

export default async function Page() {
  const items = getAll("projects");
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group block rounded-2xl border p-5 hover:shadow-lg transition">
            <div className="text-lg font-semibold group-hover:underline">{p.title}</div>
            <p className="mt-1 text-sm opacity-80 line-clamp-2">{p.summary}</p>
            <div className="mt-3 text-xs opacity-70">{p.tech?.join(" · ")}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}