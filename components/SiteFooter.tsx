import Link from "next/link";
import { Mark } from "@/components/Mark";
import { DEVELOPER } from "@/lib/site";

const learnLinks = [
  { href: "/courses/", label: "সম্পূর্ণ বাংলা কোর্স" },
  { href: "/tutorials/", label: "সব প্রোগ্রামিং পাঠ" },
  { href: "/languages/", label: "সব Language" },
  { href: "/practice/", label: "কোড প্র্যাকটিস" },
];

const popularLinks = [
  { href: "/tutorials/html/", label: "HTML" },
  { href: "/tutorials/css/", label: "CSS" },
  { href: "/tutorials/javascript/", label: "JavaScript" },
  { href: "/tutorials/python/", label: "Python" },
  { href: "/tutorials/c/", label: "C Programming" },
  { href: "/tutorials/java/", label: "Java" },
];

const siteLinks = [
  { href: "/about/", label: "আমাদের সম্পর্কে" },
  { href: "/ra-fahim/", label: "ডেভেলপার" },
  { href: "/privacy/", label: "গোপনীয়তা নীতি" },
  { href: "/terms/", label: "শর্তাবলি" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Code Atlas ফুটার</h2>
      <div className="footer-glow" aria-hidden="true" />
      <div className="shell">
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <span className="footer-cta-kicker"><Mark name="spark" size={14} /> শুরু করতে প্রস্তুত?</span>
            <h3>আজই নিজের প্রথম কোড লিখে ফেলো</h3>
            <p>Account ছাড়াই শেখা শুরু করো — পছন্দের ভাষা বেছে নাও আর ব্রাউজারেই কোড চালিয়ে দেখো।</p>
          </div>
          <div className="footer-cta-actions">
            <Link href="/practice/" className="footer-cta-primary">কোড লেখা শুরু করো <Mark name="arrow" size={16} /></Link>
            <Link href="/languages/" className="footer-cta-secondary">সব Language দেখো</Link>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-brand-block">
            <Link href="/" className="brand footer-brand" aria-label="Code Atlas হোম">
              <span className="brand-mark"><Mark name="code" size={21} /></span>
              <span>Code <span className="brand-accent">Atlas</span><small>শিখো • তৈরি করো • এগিয়ে যাও</small></span>
            </Link>
            <p>বাংলায় Programming শেখার সহজ ঠিকানা। একদম শুরু থেকে নিজের project তৈরি করা পর্যন্ত — সবকিছু এক জায়গায়, কোনো account ছাড়াই।</p>
          </div>

          <nav className="footer-column" aria-label="শেখা শুরু করো">
            <strong>শেখা শুরু করো</strong>
            {learnLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>

          <nav className="footer-column" aria-label="জনপ্রিয় বিষয়">
            <strong>জনপ্রিয় বিষয়</strong>
            {popularLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>

          <nav className="footer-column" aria-label="Code Atlas">
            <strong>Code Atlas</strong>
            {siteLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© {year} Code Atlas. সর্বস্বত্ব সংরক্ষিত।</span>
          <div className="footer-bottom-links">
            <Link href="/privacy/">গোপনীয়তা নীতি</Link>
            <Link href="/terms/">শর্তাবলি</Link>
            <Link href="/ra-fahim/">Developed by <b>{DEVELOPER.name}</b></Link>
          </div>
          <a href="#top" className="footer-top" aria-label="পেজের উপরে যাও">উপরে যাও <Mark name="arrow-up" size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
