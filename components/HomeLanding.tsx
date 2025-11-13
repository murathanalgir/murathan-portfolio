
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Front } from "@/lib/mdx";
import type { RepoSummary } from "@/lib/github";
import HeroSimulation from "@/components/HeroSimulation";
import InteractiveShell from "@/components/InteractiveShell";

type Props = {
  projects: Front[];
  posts: Front[];
  repos: RepoSummary[];
};
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
export default function HomeLanding({ projects, posts, repos }: Props) {
  
  const [cvMode, setCvMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  if (cvMode) {
    const handlePrint = () => {
      if (typeof window !== "undefined") {
        window.print();
      }
    };

    const experience = [
      {
        title: "Freelance Full-Stack Developer",
        company: "Self-employed",
        period: "2022 – Present",
        location: "Remote",
        bullets: [
          "Design and build full-stack web applications with Next.js, TypeScript, Node.js and MongoDB.",
          "Collaborate with founders and small teams to translate vague product ideas into scoped features and iterative releases.",
          "Set up CI/CD pipelines, basic observability and deployment workflows on Vercel and similar platforms.",
        ],
      },
      {
        title: "Full-Stack Developer (Part-time)",
        company: "Remote client",
        period: "2023 – 2024",
        location: "Remote",
        bullets: [
          "Implemented regression-testing workflows based on visual screenshots integrated into CI/CD pipelines.",
          "Maintained and extended existing dashboards and internal tools used by non-technical stakeholders.",
          "Improved DX by refactoring legacy JavaScript code to modern TypeScript-based modules.",
        ],
      },
    ];

    const education = [
      {
        program: "Information Security Technology (Associate)",
        school: "Istanbul Esenyurt University",
        period: "2022 – 2025",
        details:
          "Coursework in network security, cryptography, ethical hacking and secure systems fundamentals.",
      },
      {
        program: "Self-directed Web Development",
        school: "Online resources & personal projects",
        period: "Ongoing",
        details:
          "Focused on modern full-stack JavaScript: Next.js, TypeScript, Node.js, React ecosystem and deployment tooling.",
      },
    ];


    return (
      <main
        className="mx-auto max-w-4xl px-6 py-10 space-y-8 bg-white text-zinc-900"
        data-cv-mode="on"
      >
        <div className="flex items-start justify-between gap-6 border-b border-zinc-300 pb-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Murathan Algır</h1>
            <p className="mt-1 text-sm font-medium text-zinc-700">
              Full-Stack Developer · Next.js / TypeScript
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-zinc-600">
            <span>murathan.space</span>
            <span>github.com/murathanalgir</span>
            <span>Istanbul · Remote-friendly</span>
            <div className="mt-2 flex gap-2 print:hidden">
              <button
                onClick={() => setCvMode(false)}
                className="rounded-full border border-zinc-400 px-3 py-1 text-[11px] hover:bg-zinc-100"
              >
                Back to site
              </button>
              <button
                onClick={handlePrint}
                className="rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-black"
              >
                Print / PDF
              </button>
            </div>
          </div>
        </div>

        <section className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-zinc-800">
            Full-stack developer focused on product engineering, dashboards and internal
            tools. Comfortable owning features end-to-end: from data modeling and APIs to
            polished, accessible UI. Strong experience with Next.js, TypeScript and modern
            Node.js tooling, with a background in information security and digital
            marketing.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.4fr,1.6fr]">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map(role => (
                <div key={role.title} className="space-y-1 text-sm leading-relaxed">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-semibold text-zinc-900">{role.title}</p>
                      <p className="text-xs text-zinc-700">{role.company}</p>
                    </div>
                    <div className="text-right text-[11px] text-zinc-500">
                      <p>{role.period}</p>
                      <p>{role.location}</p>
                    </div>
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-800">
                    {role.bullets.map(line => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
                Skills
              </h2>
              <div className="text-xs leading-relaxed text-zinc-800">
                <p>
                  <span className="font-medium">Frontend:</span> React, Next.js,
                  TypeScript, Tailwind CSS, responsive design
                </p>
                <p>
                  <span className="font-medium">Backend:</span> Node.js, Express, REST
                  APIs, authentication, JWT
                </p>
                <p>
                  <span className="font-medium">Data:</span> MongoDB, Mongoose, basic SQL,
                  data modeling
                </p>
                <p>
                  <span className="font-medium">Tooling:</span> pnpm, GitHub Actions,
                  Vercel, CI/CD, automated checks
                </p>
                <p>
                  <span className="font-medium">Other:</span> information security
                  fundamentals, digital marketing and social media concepts
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
                Education
              </h2>
              <div className="space-y-2">
                {education.map(item => (
                  <div key={item.program} className="text-xs leading-relaxed">
                    <p className="font-semibold text-zinc-900">{item.program}</p>
                    <p className="text-[11px] text-zinc-700">
                      {item.school} · {item.period}
                    </p>
                    <p className="mt-1 text-zinc-800">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
            Selected projects
          </h2>
          <div className="space-y-3">
            {featuredProjects.length === 0 && (
              <p className="text-xs text-zinc-600">
                No projects found. Add MDX files under <code>content/projects</code>.
              </p>
            )}
            {featuredProjects.map(project => (
              <div key={project.slug} className="text-sm leading-relaxed">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold text-zinc-900">{project.title}</span>
                  <span className="text-[11px] text-zinc-500">
                    {new Date(project.date).getFullYear()}
                  </span>
                </div>
                {project.summary && (
                  <p className="mt-1 text-zinc-800">{project.summary}</p>
                )}
                {project.tech && project.tech.length > 0 && (
                  <p className="mt-1 text-xs text-zinc-600">
                    Stack: {project.tech.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
            Writing
          </h2>
          <div className="space-y-2">
            {posts.slice(0, 3).map(post => (
              <div key={post.slug} className="flex items-baseline justify-between gap-4">
                <div className="text-sm">
                  <span className="font-medium text-zinc-900">{post.title}</span>
                  {post.summary && (
                    <span className="ml-1 text-xs text-zinc-600">
                      – {post.summary}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-500">
                  {new Date(post.date).getFullYear()}
                </span>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-xs text-zinc-600">
                No posts yet. Add MDX files under <code>content/posts</code>.
              </p>
            )}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
            Links
          </h2>
          <div className="text-xs text-zinc-800">
            <p>Portfolio: https://murathan.space</p>
            <p>GitHub: https://github.com/murathanalgir</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10"
      data-cv-mode="off"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCvMode(v => !v)}
          className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
        >
          CV mode
        </button>
        <button
          onClick={() => setTerminalOpen(true)}
          className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
        >
          Open terminal
        </button>
      </div>

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

        <div className="space-y-4">
          <HeroSimulation />
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl text-xs text-zinc-300">
            <div className="mb-2 font-semibold text-zinc-100">Profile</div>
            <p>Istanbul · Remote-friendly · Product-oriented full-stack developer.</p>
          </div>
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
              No projects yet. Add MDX files under <code>content/projects</code>.
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
            {latestPosts.map((post, index) => (
              <Link
                key={`${post.slug}-${index}`}
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
                  {formatDate(post.date)}
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

      <InteractiveShell open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </main>
  );
}
