import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chule",
  description: "Created by Chule AI",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
    messages: Record<string, string>;
  };
}

export default function RootLayout({
  children,
  params: { locale, messages },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <SessionProvider>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <body className={"dark"}>
            <Header />
            {children}
          </body>
        </NextIntlClientProvider>
      </SessionProvider>
    </html>
  );
}
