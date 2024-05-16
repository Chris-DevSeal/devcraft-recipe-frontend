import Login from "@/components/Login";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="flex gap-24">
        <h1 className={`mb-3 text-2xl font-semibold`}>Recipe App!</h1>
        <Login />
      </header>
      <Link
        className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        href="/recipes"
      >
        Recipes
      </Link>
    </main>
  );
}
