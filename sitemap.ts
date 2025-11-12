import { getAll } from "@/lib/mdx";

export default async function sitemap() {
  const base = "https://murathan.space";
  const pages = ["", "/projects", "/blog", "/contact"].map(p=>({ url: base+p, lastModified: new Date() }));
  const projectUrls = getAll("projects").map(p => ({ url: `${base}/projects/${p.slug}`, lastModified: p.date }));
  const postUrls = getAll("posts").map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date }));
  return [...pages, ...projectUrls, ...postUrls];
}