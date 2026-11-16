import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_LOCALE, SITE_URL, CONTACT_EMAIL, absoluteUrl } from "@/lib/site";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Hind+Siliguri:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "RA Fahim", url: absoluteUrl("/ra-fahim/") }],
  creator: "RA Fahim",
  publisher: SITE_NAME,
  category: "education",
  keywords: [
    "বাংলায় programming শেখা",
    "Programming tutorials Bangla",
    "বাংলা কোডিং টিউটোরিয়াল",
    "HTML CSS JavaScript বাংলা",
    "Python Bangla tutorial",
    "coding practice online",
    "Learn programming in Bengali",
  ],
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "বাংলায় সহজভাবে Programming শেখার উন্মুক্ত জায়গা — পাঠ, quiz, অনুশীলন ও Code Practice এক ঠিকানায়।",
    url: "./",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "বাংলায় সহজভাবে Programming শেখার উন্মুক্ত জায়গা।",
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101629",
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ["CodeAtlas", "Code Atlas বাংলা"],
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: "bn",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absoluteUrl("/icon.svg"),
    email: CONTACT_EMAIL,
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL, availableLanguage: ["bn", "en"] },
    description: SITE_DESCRIPTION,
    founder: { "@type": "Person", name: "RA Fahim", url: absoluteUrl("/ra-fahim/") },
  },
];

// Runs before first paint so a saved (or system) dark preference never flashes light.
const THEME_INIT = `(function(){try{var t=localStorage.getItem("codeatlas-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_URL} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <JsonLd data={siteSchema} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">মূল অংশে যাও</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
