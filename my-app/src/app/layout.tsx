import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/app/ui/navbar"
import "./globals.css";
import Footer from "./ui/footer";
import { siteConfig } from "./constants/site";
const { name, description } = siteConfig;
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${name}`,
    default: name,
  },
  description: description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: {
      template: `%s | ${name}`,
      default: name,
    },
    description: description,
    images: ['/_next/image?url=%2Fimages%2Fhero.jpg&w=640&q=75'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-white min-h-full flex flex-col">
        <Navbar />
        <div className="bg-gray-200">

          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
