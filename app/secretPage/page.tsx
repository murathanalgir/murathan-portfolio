import GithubShowcase from "@/components/GithubShowcase";
import Intro from "@/components/Intro";
import Weather from "@/components/weather";
import RandomSong from '@/components/randomSong';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8">
    <div className="w-full max-w-lg flex flex-col items-center space-y-12">
      <Intro  />
      <RandomSong />
      <Weather />
      <GithubShowcase />
    </div>
   </section>
  );
}
