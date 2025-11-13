import { getAll, getBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { mdxToHtml } from "@/lib/renderMdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Prose from "@/components/Prose";

export async function generateStaticParams() {
  return getAll("posts")
    .filter(p => typeof p.slug === "string" && p.slug.length > 0)
    .map(p => ({ slug: p.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBySlug("posts", slug);
  if (!p) return {};
  const desc = p.summary ?? "";
  const q = `title=${encodeURIComponent(p.title)}&desc=${encodeURIComponent(desc)}&badge=Blog`;
  return {
    title: `${p.title} | Blog`,
    description: desc,
    openGraph: { images: [`/api/og?${q}`] },
    twitter: { card: "summary_large_image", images: [`/api/og?${q}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBySlug("posts", slug);
  if (!p) return notFound();

  const mdx = await mdxToHtml(p.content);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{p.title}</h1>
      <p className="text-sm opacity-70 mt-1">
        {new Date(p.date).toLocaleDateString()}
      </p>
      <Prose>
        <MDXRemote source={mdx} />
      </Prose>
    </article>
  );
}
