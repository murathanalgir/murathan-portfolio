// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/blog/[slug]/page.tsx
// import { Metadata } from 'next'
// import { format } from 'date-fns'
// import { serialize } from 'next-mdx-remote/serialize'
// import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
// import MdxRenderer from '@/components/mdxRenderer'
// import { getAllPostsMeta, getPostBySlug } from '@/lib/posts'

// type Params = { slug: string }

// // hangi slug’ları önceden oluşturacağımız
// export function generateStaticParams(): Params[] {
//   return getAllPostsMeta().map(post => ({ slug: post.slug }))
// }

// // Next.js’in beklediği signature: params + searchParams
// export async function generateMetadata({
//   params,
//   searchParams
// }: {
//   params: Params
//   searchParams: Record<string, any>
// }): Promise<Metadata> {
//   const { meta } = getPostBySlug(params.slug)
//   return {
//     title: meta.title,
//     description: `Blog post about ${meta.tags.join(', ')}`
//   }
// }

// // page component’i için de aynı
// export default async function PostPage({
//   params,
//   searchParams
// }: {
//   params: Params
//   searchParams: Record<string, any>
// }) {
//   const { meta, content } = getPostBySlug(params.slug)
//   const mdxSource: MDXRemoteSerializeResult = await serialize(content)

//   return (
//     <article className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-16">
//       <h1>{meta.title}</h1>
//       <time className="block text-sm text-gray-500 dark:text-gray-400 mb-6">
//         {format(new Date(meta.date), 'LLL d, yyyy')}
//       </time>
//       <MdxRenderer source={mdxSource} />
//     </article>
//   )
// }
