import { notFound } from "next/navigation";
import { getAll, getBySlug } from "@/lib/mdx";
import { mdxToHtml } from "@/lib/renderMdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Prose from "@/components/Prose";

export async function generateStaticParams() {
  return getAll("projects")
    .filter(p => typeof p.slug === "string")
    .map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBySlug("projects", slug);

  if (!p) return {}; // build’de hatayı engeller

  const q = new URLSearchParams({
    title: p.title,
    desc: p.summary ?? "",
    badge: "Case Study",
  }).toString();

  return {
    title: `${p.title} | Case Study`,
    description: p.summary ?? "",
    openGraph: { images: [`/api/og?${q}`] },
    twitter: { card: "summary_large_image", images: [`/api/og?${q}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBySlug("projects", slug);

  if (!p) return notFound(); // runtime için güvenli

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
