/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/GithubShowcase.tsx
import Link from 'next/link'
import axios from 'axios'
import { format } from 'date-fns'

const GITHUB_USERNAME = process.env.GITHUB_USERNAME!
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!

// Next.js’in ISR (Incremental Static Regeneration) için revalidate süresi
export const revalidate = 3600  // saniye cinsinden

// Server-side olarak en güncel 6 repo’yu çek
async function fetchLatestRepos() {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos`
  const { data } = await axios.get(url, {
    params: { per_page: 6, sort: 'updated' },
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.mercy-preview+json' // topics için gerekli
    }
  })
  return data
}

export default async function GithubShowcase() {
  const repos: any[] = await fetchLatestRepos()

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Check out my GitHub</h2>
        <p className="mt-3 text-gray-600">
          Here are my 6 most recently updated repositories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{repo.name}</h3>
            {repo.description && (
              <p className="mt-2 text-sm text-gray-600">{repo.description}</p>
            )}
            <p className="mt-4 text-xs text-gray-500">
              Created {format(new Date(repo.created_at), 'LLL d, yyyy')} | Updated {format(new Date(repo.updated_at), 'LLL d, yyyy')}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.isArray(repo.topics) && repo.topics.map((topic: string) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs font-medium rounded-full
    bg-gray-200 text-gray-800
    dark:bg-gray-700 dark:text-gray-200
  "
                >
                  {topic}
                </span>
              ))}
              {repo.language && (
                <span className="px-2 py-1 text-xs font-medium rounded-full
    bg-gray-200 text-gray-800
    dark:bg-gray-700 dark:text-gray-200
  ">
                  {repo.language}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link className='inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition dark:bg-gray-700 dark:text-gray-200' href={`https://github.com/${GITHUB_USERNAME}`}>
            Find more on my GitHub
        </Link>
      </div>
    </section>
  )
}
