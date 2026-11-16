import type { Metadata } from "next";
import Link from "next/link";
import { LanguageBrowser } from "@/components/LanguageBrowser";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = {
  title: "সব Programming Language",
  description: "Python, JavaScript, HTML, CSS-সহ বিভিন্ন Programming Language-এর পরিচিতি ও শেখার roadmap দেখো।",
};

export default function LanguagesPage() {
  return (
    <>
      <section className="page-hero catalog-hero"><div className="shell page-hero-inner"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>সব Language</span></div><span className="section-kicker">Programming-এর জগৎ</span><h1>এক জায়গায়। <span>অনেক সম্ভাবনা।</span></h1><p>পছন্দের Language খুঁজে নাও, কী কাজে লাগে জানো এবং একদম শুরু থেকে শেখার পথ দেখে নাও।</p><div className="catalog-meta"><span><Mark name="layers" size={16} /> ৩০টি Language ও Technology</span><span><Mark name="check" size={16} /> একদম ভিত্তি থেকে</span><span><Mark name="globe" size={16} /> নিজের গতিতে শেখো</span></div></div></section>
      <section className="section catalog-section"><div className="shell"><LanguageBrowser /></div></section>
    </>
  );
}
