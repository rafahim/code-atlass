import Link from "next/link";
import { Mark } from "@/components/Mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="brand" aria-label="Code Atlas হোম">
          <span className="brand-mark"><Mark name="code" size={21} /></span>
          <span className="brand-text"><b className="brand-name">Code Atlas</b><small>শিখো • তৈরি করো • এগিয়ে যাও</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="প্রধান নেভিগেশন">
          <Link href="/tutorials/">পাঠসমূহ</Link>
          <Link href="/languages/">সব ভাষা</Link>
          <Link href="/practice/">কোড প্র্যাকটিস</Link>
          <Link href="/about/">আমাদের সম্পর্কে</Link>
        </nav>
        <Link className="header-cta" href="/practice/">কোড লেখা শুরু করো <Mark name="arrow" size={16} /></Link>
        <details className="mobile-nav">
          <summary aria-label="মেনু খুলুন"><Mark name="menu" size={22} /></summary>
          <nav aria-label="মোবাইল নেভিগেশন">
            <Link href="/tutorials/">সব প্রোগ্রামিং পাঠ</Link>
              <Link href="/languages/">সব ভাষা</Link>
            <Link href="/practice/">কোড প্র্যাকটিস</Link>
            <Link href="/about/">আমাদের সম্পর্কে</Link>
            <Link href="/privacy/">গোপনীয়তা নীতি</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
