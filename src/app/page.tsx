import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Hello to quizz page👋</h1>
      </main>

      <footer>
        <Button>Start</Button>
      </footer>
    </div>
  );
}
