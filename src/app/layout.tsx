import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/ui/header";

export const metadata: Metadata = {
  title: "Chule",
  description: "Created by Chule AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={"dark"}>
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}