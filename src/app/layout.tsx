import type { Metadata } from "next";
import "./globals.css";
import "@once-ui-system/core/css/styles.css";

export const metadata: Metadata = {
  title: "Stefi | Frontend Developer",
  description: "Portfolio showcasing frontend development and SSR optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
