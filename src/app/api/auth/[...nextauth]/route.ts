import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: (process.env.GITHUB_CLIENT_ID as string) || "test",
      clientSecret: (process.env.GITHUB_SECRET_ID as string) || "test",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string, // refer to: https://medium.com/@rezahedi/using-nextauth-authentication-provider-in-next-js-by-app-router-f50cb23282c9
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
