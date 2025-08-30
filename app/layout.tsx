import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalplatformarchitect.com"),
  title: {
    default: "Digital Platform Architect",
    template: "%s | Digital Platform Architect"
  },
  description:
    "Learn enterprise digital platform architecture: principles, patterns, and practices.",
  openGraph: {
    title: "Digital Platform Architect",
    description:
      "Learn enterprise digital platform architecture: principles, patterns, and practices.",
    url: "https://digitalplatformarchitect.com",
    siteName: "Digital Platform Architect",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Platform Architect",
    description:
      "Learn enterprise digital platform architecture: principles, patterns, and practices."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="page">
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

