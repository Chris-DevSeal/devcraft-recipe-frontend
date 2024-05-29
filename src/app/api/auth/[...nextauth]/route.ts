//import { NextAuthOptions } from "next-auth";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: (process.env.GITHUB_CLIENT_ID as string) || "",
      clientSecret: (process.env.GITHUB_CLIENT_SECRET as string) || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string, // refer to: https://medium.com/@rezahedi/using-nextauth-authentication-provider-in-next-js-by-app-router-f50cb23282c9
  pages: {
    signIn: "/api/auth/custom-signin",
    error: "/api/auth/custom-error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
