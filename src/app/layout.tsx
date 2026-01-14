import type { Metadata } from "next";
import "./globals.css";
import { MouseProvider } from "@/context/MouseContext";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://stefanvukoicic-dev.vercel.app"),
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
    images: ["/og-image.webp"],
  },
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased cursor-none`}>
        <MouseProvider>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </MouseProvider>
      </body>
    </html>
  );
}
