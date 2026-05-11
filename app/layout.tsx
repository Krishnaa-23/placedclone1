import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import the Analytics component from Vercel
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PLACED | Infinite Possibilities. Definite Outcome.",
  description: "The premier career accelerator bridging the gap between student potential and professional tech success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* 2. Add the component right before the closing body tag */}
        <Analytics />
      </body>
    </html>
  );
}