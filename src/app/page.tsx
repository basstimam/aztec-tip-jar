import { HeroJar } from "@/components/HeroJar";
import { TipForm } from "@/components/TipForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="text-center">
        <HeroJar />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          Aztec Private Tip Jar
        </h1>
        <p className="mt-2 text-ink/80">
          Send a private tip. Amount and sender stay hidden.
        </p>
      </div>
      <TipForm />
    </div>
  );
}