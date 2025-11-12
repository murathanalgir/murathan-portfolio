// import { getAll, getBySlug } from "@/lib/mdx";
// import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   return getAll("projects").map(p => ({ slug: p.slug }));
// }

// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const p = getBySlug("projects", params.slug);
//   return {
//     title: `${p.title} | Case Study`,
//     description: p.summary,
//     openGraph: { images: p.cover ? [p.cover] : [] }
//   };
// }

// export default function Page({ params }: { params: { slug: string } }) {
//   const p = getBySlug("projects", params.slug);
//   if (!p) return notFound();
//   return (
//     <article className="mx-auto max-w-3xl px-4 py-10">
//       <h1 className="text-3xl font-semibold">{p.title}</h1>
//       <p className="text-sm opacity-70 mt-1">{p.role} · {p.tech?.join(" · ")}</p>
//       <section className="prose prose-invert max-w-none mt-6">
//         <h2>Özet</h2><p>{p.summary}</p>
//         <h3>Problem</h3><p>{p.problem}</p>
//         <h3>Çözüm</h3><p>{p.solution}</p>
//         <h3>Etki</h3><p>{p.impact}</p>
//       </section>
//     </article>
//   );
// }
import { getAll, getBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAll("projects").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getBySlug("projects", slug);
  return {
    title: `${p.title} | Case Study`,
    description: p.summary,
    openGraph: { images: p.cover ? [p.cover] : [] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getBySlug("projects", slug);
  if (!p) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{p.title}</h1>
      <p className="text-sm opacity-70 mt-1">{p.role} · {p.tech?.join(" · ")}</p>
      <section className="prose prose-invert max-w-none mt-6">
        <h2>Özet</h2><p>{p.summary}</p>
        <h3>Problem</h3><p>{p.problem}</p>
        <h3>Çözüm</h3><p>{p.solution}</p>
        <h3>Etki</h3><p>{p.impact}</p>
      </section>
    </article>
  );
}
