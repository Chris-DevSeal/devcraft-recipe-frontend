"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function Login() {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <div className="flex gap-5">
        <Image 
        src={session.user.image} 
        width={80}
        height={40}
        className="rounded-full"
        />
        Signed in as {session?.user?.email}
        <button
          className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={() => signOut()}
        >
          Sign out
        </button>
        </div>      
    );
  }
  return (
    <div>
      Not signed in <br />
      <button
        className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={() => signIn("github")}>Sign in
      </button>
    </div>
  );
}
