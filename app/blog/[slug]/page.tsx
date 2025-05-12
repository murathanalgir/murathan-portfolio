// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { format } from 'date-fns'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getAllPostsMeta, getPostBySlug, PostMeta } from '@/lib/posts'
import MdxRenderer from '@/components/mdxRenderer'

type Props = { params: { slug: string } }

// 1) Static parametreleri bildir
export function generateStaticParams(): { slug: string }[] {
  const posts: PostMeta[] = getAllPostsMeta()
  return posts.map(post => ({ slug: post.slug }))
}

// 2) Dinamik metadata (head title vs.) isteğe bağlı
export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { meta } = getPostBySlug(slug)
  return {
    title: meta.title,
    description: `Blog post about ${meta.tags.join(', ')}`
  }
}

// 3) Sayfa component’i
export default async function PostPage({ params: { slug } }: Props) {
  // frontmatter ve ham içeriği al
  const { meta, content } = getPostBySlug(slug)

  // MDX string’ini derle
  const mdxSource: MDXRemoteSerializeResult = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    }
  })

  return (
    <article className="prose prose-lg mx-auto py-16 dark:prose-invert">
      <h1>{meta.title}</h1>
      <time className="block text-sm text-gray-500 dark:text-gray-400 mb-6">
        {format(new Date(meta.date), 'LLL d, yyyy')}
      </time>
      <MdxRenderer source={mdxSource} />
    </article>
  )
}
