import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Front = {
  title: string; slug: string; date: string;
  summary?: string; tech?: string[]; role?: string;
  links?: { repo?: string; live?: string };
  impact?: string; problem?: string; solution?: string;
  cover?: string;
};

const root = process.cwd();

export function getAll(type: "projects" | "posts") {
  const dir = path.join(root, "content", type);
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const front = data as Front;
    return { ...front, content };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBySlug(type: "projects" | "posts", slug: string) {
  const file = path.join(root, "content", type, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as Front), content };
}