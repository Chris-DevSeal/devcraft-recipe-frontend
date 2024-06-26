import App from "@/components/App";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ session, children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App session={session}>{children}</App>
      </body>
    </html>
  );
}
