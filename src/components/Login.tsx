"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function Login() {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <div className="flex gap-5 flex-col justify-center align-middle">
        <Image
          src={session.user?.image}
          width={80}
          height={40}
          className="rounded-full mx-auto"
          alt="userimage"
        />
        <div className="text-center">Welcome {session?.user?.name}, <br/>
     signed in as {session?.user?.email}</div>
        <button
          className="bg-red-300 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center align-middle gap-2">
      <div className="text-center"> Please sign in to view all recipes</div>
      <button
        className="group bg-gray-300 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={() => signIn("github")}
      >
        Sign in
      </button>
    </div>
  );
}
