import Link from "next/link";
import { Mark } from "@/components/Mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand-block">
          <Link href="/" className="brand footer-brand"><span className="brand-mark"><Mark name="code" size={21} /></span><span>code<span className="brand-accent">atlas</span><small>শিখো • তৈরি করো • এগিয়ে যাও</small></span></Link>
          <p>Programming শেখার সহজ ঠিকানা। একদম শুরু থেকে নিজের project তৈরি করা পর্যন্ত—সবকিছু এক জায়গায়।</p>
        </div>
        <div className="footer-column"><strong>শেখা শুরু করো</strong><Link href="/courses/">সম্পূর্ণ বাংলা কোর্স</Link><Link href="/hsc-preparation/">HSC Preparation</Link><Link href="/languages/">সব Language</Link><Link href="/practice/">কোড প্র্যাকটিস</Link><Link href="/#learning-paths">শেখার পথ</Link></div>
        <div className="footer-column"><strong>CodeAtlas</strong><Link href="/about/">আমাদের সম্পর্কে</Link><Link href="/privacy/">গোপনীয়তা নীতি</Link></div>
        <div className="footer-note"><span className="footer-note-icon"><Mark name="spark" size={17} /></span><p>শেখার জন্য account দরকার নেই।<br />শুরু করো নিজের গতিতে।</p></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} CodeAtlas. সর্বস্বত্ব সংরক্ষিত।</span><span>কৌতূহল থেকেই শুরু হয় নতুন কিছু।</span></div>
    </footer>
  );
}
