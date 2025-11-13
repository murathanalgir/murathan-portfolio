import "server-only";

export type RepoSummary = {
  name: string;
  description: string;
  stars: number;
  url: string;
};

export async function getPinnedRepos(): Promise<RepoSummary[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME ?? "murathanalgir"}/repos?per_page=100`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = (await res.json()) as any[];
  return data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map(r => ({
      name: r.name as string,
      description: (r.description as string) ?? "",
      stars: r.stargazers_count as number,
      url: r.html_url as string,
    }));
}
