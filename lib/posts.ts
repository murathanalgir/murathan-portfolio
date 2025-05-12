// lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostMeta = {
  title: string
  date: string
  tags: string[]
  slug: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Tüm post’ların meta verilerini oku ve tarihe göre sırala
export function getAllPostsMeta(): PostMeta[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(name => /\.mdx?$/.test(name))

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      ...(data as Omit<PostMeta, 'slug'>)
    }
  })

  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

// Belirli bir slug için post meta + içerik döndür
export function getPostBySlug(
  slug: string
): { meta: Omit<PostMeta, 'slug'>; content: string } {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: data as Omit<PostMeta, 'slug'>,
    content
  }
}
