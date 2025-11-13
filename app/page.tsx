import { getAll } from "@/lib/mdx";
import { getPinnedRepos } from "@/lib/github";
import HomeLanding from "@/components/HomeLanding";

export default async function Page() {
  const [projects, posts, repos] = await Promise.all([
    Promise.resolve(getAll("projects")),
    Promise.resolve(getAll("posts")),
    getPinnedRepos(),
  ]);

  return (
    <HomeLanding
      projects={projects}
      posts={posts}
      repos={repos}
    />
  );
}
