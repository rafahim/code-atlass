import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { HscQuiz } from "@/components/HscQuiz";
import { hscMcqs, hscModelTest, hscPdfPage, bnNumber } from "@/data/hsc";

export const metadata: Metadata = {
  title: "MCQ ও Model Test · HSC Preparation",
  description: "HSC ICT-এর অধ্যায়ভিত্তিক MCQ এবং অনুশীলনী Model Test দিয়ে নিজের প্রস্তুতি যাচাই করো।",
};

export default function HscExamPracticePage() {
  return <>
    <section className="hsc-page-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/hsc-preparation/">HSC Preparation</Link><span>/</span><span>পরীক্ষার অনুশীলন</span></div>
      <div className="hsc-page-title-row"><div><span className="hsc-eyebrow"><i/> MCQ · মডেল পরীক্ষা</span><h1>নিজেকে পরীক্ষা করো<span>।</span></h1><p>প্রথমে অধ্যায়ভিত্তিক প্রশ্ন অনুশীলন করো। তারপর তিনটি অধ্যায়ের বিষয় মিলিয়ে মডেল টেস্টের MCQ অংশ অনুশীলন করো।</p></div><div className="hsc-page-mark"><Mark name="check" size={34}/></div></div>
      <div className="hsc-exam-summary"><span><strong>{bnNumber(hscMcqs.length)}</strong>টি অধ্যায়ভিত্তিক MCQ</span><span><strong>{bnNumber(hscModelTest.length)}</strong>টি মডেল-টেস্ট MCQ</span><span><strong>৩</strong>টি অধ্যায়</span></div>
    </div></section>
    <section className="section hsc-exam-body"><div className="shell hsc-exam-layout">
      <main className="hsc-exam-main">
        <HscQuiz chapterQuestions={hscMcqs} modelQuestions={hscModelTest}/>
      </main>
      <aside className="hsc-exam-aside">
        <div className="hsc-aside-card"><span className="section-kicker">পরীক্ষার কৌশল</span><h3>ভালোভাবে অনুশীলন করতে</h3><ol><li>প্রশ্নটি মনোযোগ দিয়ে পড়ো।</li><li>বিকল্প না দেখে উত্তর মনে করার চেষ্টা করো।</li><li>উত্তর জমা দিয়ে ভুলের কারণ বুঝে নাও।</li><li>ভুল হওয়া বিষয়টি সংশ্লিষ্ট পাঠে আবার পড়ো।</li></ol></div>
        <div className="hsc-aside-card hsc-aside-note"><Mark name="info" size={19}/><p>এটি অনুশীলনের প্রশ্ন। PDF-এর মডেল টেস্টে প্রস্তাবিত সময় ২ ঘণ্টা ৩০ মিনিট ও পূর্ণমান ৫০; এটি বোর্ডের সরকারি নম্বরবণ্টন নয়।</p></div>
        <Link href="/hsc-preparation/resources/" className="hsc-side-link">সংক্ষিপ্ত ও সৃজনশীল প্রশ্ন দেখো <Mark name="arrow" size={15}/></Link>
        <a href={hscPdfPage(36)} target="_blank" rel="noreferrer" className="hsc-side-link">মূল Model Test PDF-এ দেখো <Mark name="external" size={14}/></a>
      </aside>
    </div></section>
  </>;
}
