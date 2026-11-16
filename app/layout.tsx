import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "CodeAtlas — বাংলায় Programming শেখো",
    template: "%s | CodeAtlas",
  },
  description: "বাংলায় Programming Language শেখো, সহজ Roadmap অনুসরণ করো এবং Code Practice page-এ নিজের code লিখে দেখো।",
  applicationName: "CodeAtlas",
  keywords: ["বাংলায় programming শেখা", "Programming tutorials Bangla", "coding practice", "Python Bangla", "JavaScript Bangla", "HTML CSS tutorial", "Programming language"],
  openGraph: {
    title: "CodeAtlas — বাংলায় Programming শেখো",
    description: "বাংলায় সহজভাবে Programming শেখার উন্মুক্ত জায়গা।",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101629",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
