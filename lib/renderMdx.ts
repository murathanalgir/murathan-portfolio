import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function mdxToHtml(source: string) {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
    },
  });
}
