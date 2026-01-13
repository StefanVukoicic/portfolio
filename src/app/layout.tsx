import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Stefan Vukoičić | Frontend Developer",
  description:
    "Frontend developer based in Serbia with 4+ years of experience. I care about performance, accessibility, reusability, and clean code.",
  openGraph: {
    title: "Stefan Vukoičić | Frontend Developer",
    description:
      "Frontend developer based in Serbia with 4+ years of experience.",
    url: "https://stefanvukoicic-dev.vercel.app/",
    siteName: "Stefan Vukoičić",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Stefan Vukoičić - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stefan Vukoičić | Frontend Developer",
    description:
      "Frontend developer based in Serbia with 4+ years of experience.",
    images: ["/thumbnail.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
