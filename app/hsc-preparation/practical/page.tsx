import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { HscPracticalList } from "@/components/HscPracticalList";
import { hscPracticals, hscPdfPage, bnNumber } from "@/data/hsc";

export const metadata: Metadata = {
  title: "Practical Lab · HSC Preparation",
  description: "HSC ICT-এর ৬টি HTML, ৪টি C এবং ২টি Database ব্যবহারিক কাজ ধাপে ধাপে অনুশীলন করো।",
};

export default function HscPracticalPage() {
  return <>
    <section className="hsc-page-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/hsc-preparation/">HSC Preparation</Link><span>/</span><span>Practical Lab</span></div>
      <div className="hsc-page-title-row"><div><span className="hsc-eyebrow"><i/> হাতে-কলমে শেখা</span><h1>Practical Lab<span>।</span></h1><p>শুধু পড়ে নয়—নিজে ফাইল তৈরি করো, code লেখো, query চালাও এবং কাজের ফলাফল যাচাই করো।</p></div><div className="hsc-page-mark"><Mark name="terminal" size={34}/></div></div>
      <div className="hsc-exam-summary"><span><strong>{bnNumber(6)}</strong>টি HTML Lab</span><span><strong>{bnNumber(4)}</strong>টি C Lab</span><span><strong>{bnNumber(2)}</strong>টি Database Lab</span></div>
    </div></section>
    <section className="section hsc-practical-page"><div className="shell hsc-single-column">
      <div className="hsc-practical-intro"><Mark name="lightbulb" size={21}/><p><strong>কীভাবে করবে:</strong> প্রতিটি কাজের ধাপ অনুসরণ করো। কাজটি সত্যিই সম্পন্ন হলে checkbox-এ টিক দাও। অগ্রগতি এই browser-এ সংরক্ষিত থাকবে; account লাগবে না।</p></div>
      <HscPracticalList tasks={hscPracticals}/>
      <div className="hsc-runtime-grid"><div><strong>HTML Practical</strong><p>Code Atlas-এর Code Practice ব্যবহার করে HTML, CSS ও JavaScript-এর output দেখতে পারো।</p><Link href="/practice/">Code Practice খোলো <Mark name="arrow" size={14}/></Link></div><div><strong>C ও Database Practical</strong><p>C চালাতে compiler এবং SQL/SQLite চালাতে SQLite-compatible tool দরকার। Browser preview নিজে থেকে এগুলো compile করে না।</p><a href={hscPdfPage(34)} target="_blank" rel="noreferrer">মূল practical নির্দেশনা <Mark name="external" size={13}/></a></div></div>
    </div></section>
  </>;
}
