// app/blog/page.tsx
import Link from 'next/link'
import { format } from 'date-fns'
import { getAllPostsMeta, PostMeta } from '@/lib/posts'

export const metadata = {
  title: 'Blog'
}

export default function BlogPage() {
  const posts: PostMeta[] = getAllPostsMeta()

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <time className="block text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(post.date), 'LLL d, yyyy')}
            </time>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="
                    px-2 py-1 text-xs font-medium rounded-full
                    bg-gray-200 text-gray-800
                    dark:bg-gray-700 dark:text-gray-200
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
