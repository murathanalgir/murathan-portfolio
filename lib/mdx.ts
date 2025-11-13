import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Front = {
  title: string;
  slug: string;
  date: string;
  summary?: string;
  tags?: string[];
  tech?: string[];
  role?: string;
  links?: { repo?: string; live?: string };
  impact?: string;
  problem?: string;
  solution?: string;
  cover?: string;
};

const root = process.cwd();

function getDir(type: "projects" | "posts") {
  return path.join(root, "content", type);
}

export function getAll(type: "projects" | "posts") {
  const dir = getDir(type);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as Front), content };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBySlug(type: "projects" | "posts", slug: string) {
  const dir = getDir(type);
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as Front), content };
}
