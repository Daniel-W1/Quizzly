import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzly, Study Smart!",
  description: "Unlock your academic potential with science-based collaborative learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <body className={`${inter.className} overflow-x-hidden`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
