import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { JsonLd } from "@/components/JsonLd";
import { DEVELOPER, SITE_NAME, absoluteUrl, assetPath } from "@/lib/site";

const title = "RA Fahim — Developer & Creator";
const description =
  "RA Fahim is a web developer and creator who builds modern websites, web applications and e-commerce platforms. Code Atlas-এর ডেভেলপার সম্পর্কে জানো।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "profile",
    siteName: SITE_NAME,
    locale: "bn_BD",
    title,
    description: "Meet RA Fahim, a web developer and creator building modern websites and e-commerce experiences.",
    url: "./",
    images: [{ url: absoluteUrl(DEVELOPER.image), width: 540, height: 540, alt: "RA Fahim — Developer & Creator" }],
  },
  twitter: { card: "summary", title, description, images: [absoluteUrl(DEVELOPER.image)] },
};

const focus = [
  { number: "01", title: "Web development", text: "Responsive websites and web applications with a focus on clarity, performance and maintainable structure." },
  { number: "02", title: "E-commerce", text: "Online stores and business platforms that make browsing, checkout and day-to-day management straightforward." },
  { number: "03", title: "Product thinking", text: "Turning a practical idea into a complete user experience—from interface details to the systems behind it." },
];

const links = [
  { label: "Facebook", text: "Connect on Facebook", href: DEVELOPER.links.facebook, icon: "facebook" as const },
  { label: "Instagram", text: "Follow on Instagram", href: DEVELOPER.links.instagram, icon: "instagram" as const },
  { label: "YouTube", text: "Watch on YouTube", href: DEVELOPER.links.youtube, icon: "youtube" as const },
  { label: "Portfolio", text: "Explore my work", href: DEVELOPER.links.portfolio, icon: "globe" as const },
  { label: "GitHub", text: "See my code", href: DEVELOPER.links.github, icon: "github" as const },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": absoluteUrl("/developer/#person"),
    name: DEVELOPER.name,
    alternateName: "rafahim",
    jobTitle: "Web Developer & Creator",
    description,
    image: absoluteUrl(DEVELOPER.image),
    url: absoluteUrl("/developer/"),
    email: `mailto:${DEVELOPER.email}`,
    sameAs: Object.values(DEVELOPER.links),
  },
};

export default function DeveloperPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <section className="page-hero dev-hero">
        <div className="shell page-hero-inner dev-hero-inner">
          <div className="dev-hero-copy">
            <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>ডেভেলপার</span></div>
            <span className="dev-pill"><i /> {DEVELOPER.name}</span>
            <span className="dev-kicker">Developer &amp; Creator</span>
            <h1>RA <span>Fahim</span></h1>
            <p>Web developer and digital product builder focused on clean, practical experiences—from modern websites and web apps to e-commerce platforms and the infrastructure behind them.</p>
            <div className="dev-actions">
              <a className="button button-primary" href={DEVELOPER.links.portfolio} target="_blank" rel="noopener noreferrer">View portfolio <Mark name="external" size={16} /></a>
              <a className="button button-outline-light" href={`mailto:${DEVELOPER.email}`}><Mark name="mail" size={17} /> Contact me</a>
            </div>
          </div>
          <div className="dev-photo-wrap">
            <div className="dev-photo-glow" aria-hidden="true" />
            <figure className="dev-photo-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetPath(DEVELOPER.image)} alt="RA Fahim — Developer & Creator" width={540} height={540} fetchPriority="high" decoding="async" />
              <figcaption>
                <span><strong>{DEVELOPER.name}</strong><small>{DEVELOPER.role}</small></span>
                <b>WEB</b>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section dev-about">
        <div className="shell">
          <span className="section-kicker dev-section-kicker">A little about me</span>
          <h2 className="dev-h2">I build useful things <span>for the web.</span></h2>
          <p className="dev-lead">I build modern websites, web applications and e-commerce experiences with a focus on polished interfaces, straightforward user flows and dependable systems.</p>
          <div className="dev-focus-grid">
            {focus.map((item) => (
              <article key={item.number}>
                <span className="dev-num">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dev-connect">
        <div className="shell">
          <span className="section-kicker dev-section-kicker">Find me online</span>
          <h2 className="dev-h2">Connect, explore <span>or see what I build.</span></h2>
          <div className="dev-links">
            {links.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                <span className="dev-link-icon"><Mark name={item.icon} size={20} /></span>
                <strong>{item.label}</strong>
                <small>{item.text}</small>
                <Mark name="external" size={14} className="dev-link-arrow" />
              </a>
            ))}
          </div>
          <div className="dev-contact">
            <span><Mark name="mail" size={18} /> For collaboration, projects or inquiries.</span>
            <a href={`mailto:${DEVELOPER.email}`}>{DEVELOPER.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
