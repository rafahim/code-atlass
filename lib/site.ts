// Central site settings used by metadata, sitemap, robots and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL (for example https://codeatlas.com) at build time so
// canonical links, the sitemap and social previews use your real domain.

export const SITE_NAME = "Code Atlas";
export const SITE_TAGLINE = "বাংলায় Programming শেখো";
export const SITE_DESCRIPTION =
  "বাংলায় Programming শেখার উন্মুক্ত জায়গা। HTML, CSS, JavaScript, Python, C, Java-সহ ৩০টি ভাষার ধাপে ধাপে পাঠ, quiz, অনুশীলন, HSC ICT প্রস্তুতি এবং ব্রাউজারেই Code Practice।";
export const SITE_LOCALE = "bn_BD";
export const CONTACT_EMAIL = "codeatlas@rafahim.com";

const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://codeatlas.example.com").replace(/\/+$/, "");
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

/** Origin plus base path, without a trailing slash. */
export const SITE_URL = `${rawSiteUrl}${BASE_PATH}`;

/** Absolute URL for a site path such as "/about/". */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Prefix for files in /public (images, PDFs) so they work under a base path. */
export function assetPath(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const DEVELOPER = {
  name: "RA Fahim",
  role: "Developer • Creator",
  email: "dev@rafahim.com",
  image: "/images/ra-fahim.webp",
  links: {
    facebook: "https://www.facebook.com/itsrafahim",
    instagram: "https://www.instagram.com/itsrafahim",
    youtube: "https://www.youtube.com/@itsrafahim",
    github: "https://github.com/rafahim",
    portfolio: "https://rafahim.com",
  },
} as const;
