import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { HscStudyPlan } from "@/components/HscStudyPlan";
import { hscStudyPlan, hscPdfPage } from "@/data/hsc";

export const metadata: Metadata = {
  title: "২১ দিনের প্রস্তুতি পরিকল্পনা · HSC Preparation",
  description: "HSC ICT অধ্যায় ৪, ৫ ও ৬ পড়ার জন্য ২১ দিনের প্রস্তুতি পরিকল্পনা।",
};

export default function HscStudyPlanPage() {
  return <>
    <section className="hsc-page-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/hsc-preparation/">HSC Preparation</Link><span>/</span><span>২১ দিনের পরিকল্পনা</span></div>
      <div className="hsc-page-title-row"><div><span className="hsc-eyebrow"><i/> প্রতিদিন অল্প অল্প করে</span><h1>২১ দিনের Study Plan<span>।</span></h1><p>একদিনে সব শেষ করার দরকার নেই। প্রতিদিন একটি নির্দিষ্ট বিষয় পড়ো, ছোট কাজ করো এবং শেষে নিজেকে যাচাই করো।</p></div><div className="hsc-page-mark"><Mark name="clock" size={34}/></div></div>
    </div></section>
    <section className="section hsc-study-page"><div className="shell hsc-single-column">
      <div className="hsc-practical-intro"><Mark name="info" size={21}/><p>এই পরিকল্পনাটি তোমার দেওয়া PDF-এর ২১ দিনের রুটিন ধরে সাজানো। প্রতিদিনের কাজ শেষ হলে টিক দাও। পরিকল্পনাটি তোমার কলেজের routine ও পরীক্ষার তারিখ অনুযায়ী প্রয়োজনমতো মানিয়ে নেবে।</p></div>
      <HscStudyPlan items={hscStudyPlan}/>
      <div className="hsc-source-inline"><span>PDF-এ ২১ দিনের মূল পরিকল্পনা</span><a href={hscPdfPage(39)} target="_blank" rel="noreferrer">পৃষ্ঠা ৩৯ থেকে দেখো <Mark name="external" size={14}/></a></div>
    </div></section>
  </>;
}
