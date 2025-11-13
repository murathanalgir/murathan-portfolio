import Link from "next/link";
import { getAll } from "@/lib/mdx";
import { getPinnedRepos } from "@/lib/github";

export default async function HomePage() {
  const [projects, posts, repos] = await Promise.all([
    Promise.resolve(getAll("projects")),
    Promise.resolve(getAll("posts")),
    getPinnedRepos(),
  ]);

  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10">
      <section className="grid gap-8 md:grid-cols-[2fr,1.5fr] md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
            Full-Stack Developer · Next.js / TypeScript
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Building product-focused web applications with{" "}
              <span className="text-sky-400">Next.js</span> and{" "}
              <span className="text-emerald-400">TypeScript</span>.
            </h1>
            <p className="max-w-xl text-sm text-zinc-300 md:text-base">
              I design, build and ship end-to-end web experiences: from API and
              data modeling to pixel-perfect UI, with a strong focus on
              performance, DX and maintainability.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl border border-sky-500 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 hover:bg-sky-500/20"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-500"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-600"
            >
              Read blog
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
            <span className="rounded-full border border-zinc-800 px-3 py-1">
              Next.js
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1">
              TypeScript
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1">
              Node.js
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1">
              MongoDB
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1">
              Tailwind CSS
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/60 to-zinc-950/80 p-5 shadow-xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Snapshot
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-400">Location</dt>
              <dd className="text-zinc-100">Istanbul · Remote-friendly</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-400">Focus</dt>
              <dd className="text-zinc-100">
                Product engineering, dashboards, internal tools
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-400">Stack</dt>
              <dd className="text-zinc-100">
                Next.js, React, Node.js, Express, MongoDB
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-400">Available for</dt>
              <dd className="text-emerald-300">Freelance & remote roles</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured projects</h2>
          <Link
            href="/projects"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-200"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.length === 0 && (
            <div className="col-span-3 rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400">
              No projects yet. Add MDX files under <code>content/projects</code>{" "}
              to populate this section.
            </div>
          )}
          {featuredProjects.map(project => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 hover:border-zinc-600 hover:bg-zinc-900/60"
            >
              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-200 group-hover:text-white">
                  {project.title}
                </div>
                <p className="line-clamp-3 text-xs text-zinc-400">
                  {project.summary}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1 text-[11px] text-zinc-400">
                {(project.tech ?? []).slice(0, 3).map(t => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-800 px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.4fr,1.6fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest posts</h2>
            <Link
              href="/blog"
              className="text-xs font-medium text-zinc-400 hover:text-zinc-200"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {latestPosts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-4 text-sm text-zinc-400">
                No posts yet. Add MDX files under <code>content/posts</code>.
              </div>
            )}
            {latestPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-start justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 hover:border-zinc-600 hover:bg-zinc-900/60"
              >
                <div className="space-y-1">
                  <div className="text-sm font-medium text-zinc-200">
                    {post.title}
                  </div>
                  <p className="text-xs text-zinc-400">{post.summary}</p>
                </div>
                <span className="ml-4 shrink-0 text-[11px] text-zinc-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">GitHub activity</h2>
          <div className="space-y-2 text-xs text-zinc-400">
            <p>
              A selection of public repositories. Data is fetched from the GitHub
              API and cached.
            </p>
          </div>
          <div className="space-y-3">
            {repos.length === 0 && (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-4 text-sm text-zinc-400">
                No repositories found or GitHub API rate limit reached.
              </div>
            )}
            {repos.map(repo => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 hover:border-zinc-600 hover:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-zinc-200">
                    {repo.name}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ★ {repo.stars}
                  </span>
                </div>
                {repo.description && (
                  <p className="mt-1 text-xs text-zinc-400">
                    {repo.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
