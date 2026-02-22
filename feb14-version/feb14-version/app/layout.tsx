import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// Use the React runtime for Vercel Analytics to avoid server vendor-chunk issues
import dynamic from "next/dynamic";
const Analytics = dynamic(() => import("@vercel/analytics/react").then(m => m.Analytics), { ssr: false });

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalplatformarchitect.com"),
  title: {
    default: "Digital Platform Architect",
    template: "%s | Digital Platform Architect"
  },
  description:
    "Master enterprise digital platform architecture: explore core building blocks like message brokers, streaming platforms, API management, and more.",
  openGraph: {
    title: "Digital Platform Architect",
    description:
      "Master enterprise digital platform architecture: explore core building blocks like message brokers, streaming platforms, API management, and more.",
    url: "https://digitalplatformarchitect.com",
    siteName: "Digital Platform Architect",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Platform Architect",
    description:
      "Master enterprise digital platform architecture: explore core building blocks like message brokers, streaming platforms, API management, and more."
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
    <html lang="en">
      <body>
        <div className="page">
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
