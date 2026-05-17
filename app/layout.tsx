import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import the Analytics component from Vercel
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PLACED | Empowering Institutions & Advancing Student Outcomes',
  description: 'PLACED partners with colleges and academic institutions to deliver structured career readiness programs, competitive exam preparation frameworks, and industry-oriented student development initiatives.',
  metadataBase: new URL('https://www.placededu.com'),
  keywords: ['Career Readiness', 'Placement Training', 'Student Outcomes', 'Institution Partner', 'Campus Placements'],
  openGraph: {
    title: 'PLACED | Empowering Institutions',
    description: 'Delivering structured career readiness and competitive exam preparation for long-term student success.',
    url: 'https://www.placededu.com',
    siteName: 'PLACED',
    images: [
      {
        url: '/og-image.jpg', // We will add this image in Step 2!
        width: 1200,
        height: 630,
        alt: 'PLACED Official Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PLACED | Empowering Institutions',
    description: 'Structured career readiness programs and student development.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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