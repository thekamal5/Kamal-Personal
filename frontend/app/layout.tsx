import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ['italic', 'normal'],
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: "Kamal Shrestha | Media & Personal Brand",
  description: "Kamal Shrestha explores the intersection of journalism, technology, and cinematic branding in an ever-evolving digital landscape.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamal-shrestha.com.np'),
  openGraph: {
    siteName: "Kamal Shrestha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
