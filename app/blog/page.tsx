import Link from "next/link";
import { getAll } from "@/lib/mdx";

export const metadata = {
  title: "Blog | Murathan Algır",
  description: "Posts and notes",
};

export default async function Page() {
  const posts = getAll("posts");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="space-y-4">
        {posts.map(p => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-2xl border p-5 hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold">{p.title}</div>
            <p className="mt-1 text-sm opacity-80">{p.summary}</p>
            <div className="mt-2 text-xs opacity-70">
              {new Date(p.date).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
