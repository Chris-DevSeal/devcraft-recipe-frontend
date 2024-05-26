'use client';
import { signIn } from 'next-auth/react';

export default function CustomSignIn() {
  const handleSignIn = async () => {
    try {
      await signIn('github', { callbackUrl: '/recipes' });
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl mb-4">Not logged in.</h1>
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
