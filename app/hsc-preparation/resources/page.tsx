import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { hscResources, hscScopeNote, hscPdfPage } from "@/data/hsc";

export const metadata: Metadata = {
  title: "প্রশ্ন, উত্তর ও রিভিশন · HSC Preparation",
  description: "HSC ICT-এর সংক্ষিপ্ত প্রশ্ন, অনুধাবনমূলক প্রশ্ন, বোর্ড-ধাঁচের প্রশ্ন, সৃজনশীল মডেল, উত্তর কৌশল ও শব্দকোষ।",
};

const studyLinks = [
  { title: "অধ্যায় ৪ · ওয়েব ডিজাইন ও HTML", desc: "সংক্ষিপ্ত প্রশ্ন, অনুধাবনমূলক উত্তর, বোর্ড-ধাঁচের প্রশ্ন ও MCQ", page: 8, tag: "অধ্যায় ৪" },
  { title: "অধ্যায় ৫ · প্রোগ্রামিং ভাষা", desc: "Compiler, Algorithm, C Programming, Loop ও Array নিয়ে প্রশ্নোত্তর", page: 17, tag: "অধ্যায় ৫" },
  { title: "অধ্যায় ৬ · Database Management System", desc: "DBMS, Key, Relationship, SQL, Indexing ও Security নিয়ে প্রশ্নোত্তর", page: 25, tag: "অধ্যায় ৬" },
  { title: "সমাধানসহ সৃজনশীল Model Question", desc: "HTML, Algorithm/C, Loop, DBMS/Key এবং SQL-এর অনুশীলনী প্রশ্ন", page: 29, tag: "CQ Practice" },
  { title: "পূর্ণাঙ্গ Model Test ও উত্তর কৌশল", desc: "অনুশীলনী পরীক্ষার প্রশ্ন, সংক্ষিপ্ত উত্তর ও সময় ব্যবস্থাপনার পরামর্শ", page: 36, tag: "Model Test" },
  { title: "রিভিশন Checklist ও গুরুত্বপূর্ণ পার্থক্য", desc: "পরীক্ষার আগে কী কী পারো তা নিজে যাচাই করো", page: 38, tag: "Revision" },
  { title: "শব্দকোষ ও প্রয়োজনীয় সংজ্ঞা", desc: "প্রধান ICT শব্দের বাংলা অর্থ ও সংক্ষিপ্ত ব্যাখ্যা", page: 40, tag: "Glossary" },
];

export default function HscResourcesPage() {
  return <>
    <section className="hsc-page-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/hsc-preparation/">HSC Preparation</Link><span>/</span><span>প্রশ্ন ও রিভিশন</span></div>
      <div className="hsc-page-title-row"><div><span className="hsc-eyebrow"><i/> শেষ মুহূর্তের প্রস্তুতি</span><h1>প্রশ্ন ও Revision<span>।</span></h1><p>পাঠ শেখার পর লিখে অনুশীলন করো। সংক্ষিপ্ত উত্তর, ব্যাখ্যা, সৃজনশীল প্রশ্ন এবং মডেল পরীক্ষা—সব এক জায়গায় গুছিয়ে রাখা হয়েছে।</p></div><div className="hsc-page-mark"><Mark name="layers" size={34}/></div></div>
    </div></section>
    <section className="section hsc-resources-page"><div className="shell hsc-single-column">
      <div className="hsc-resource-intro"><div><span className="section-kicker">প্রশ্ন অনুশীলন</span><h2>যে অংশটি পড়তে চাও, সেটি বেছে নাও।</h2><p>প্রতিটি লিংক মূল প্রস্তুতি PDF-এর নির্দিষ্ট পৃষ্ঠা খুলবে। ওয়েবসাইটের chapter lesson ও MCQ অনুশীলনের সঙ্গেও মিলিয়ে পড়ো।</p></div><a className="button button-primary" href={hscPdfPage(1)} target="_blank" rel="noreferrer"><Mark name="book" size={16}/> সম্পূর্ণ বই পড়ো</a></div>
      <div className="hsc-resource-list">{studyLinks.map((item,index)=><a href={hscPdfPage(item.page)} target="_blank" rel="noreferrer" className="hsc-resource-card" key={item.title}><span className="hsc-resource-index">{String(index+1).padStart(2,"0")}</span><div><small>{item.tag} · PDF পৃষ্ঠা {item.page} থেকে</small><strong>{item.title}</strong><p>{item.desc}</p></div><Mark name="external" size={17}/></a>)}</div>
      <div className="hsc-resource-warning"><Mark name="info" size={20}/><div><strong>বোর্ড প্রশ্ন ও Model Question সম্পর্কে</strong><p>PDF-এ “বিগত বোর্ড প্রশ্ন” অংশে প্রশ্নের মূল ধারণা ও বোর্ড-সাল উল্লেখ করে ভাষা পুনর্লিখন করা হয়েছে; এগুলো হুবহু প্রশ্নপত্রের প্রতিলিপি নয়। Model Question অনুশীলনের জন্য তৈরি, আসল বোর্ড প্রশ্ন নয়।</p></div></div>
      <div className="hsc-resource-download"><div><span className="section-kicker">মূল উৎস</span><h2>HSC Preparation PDF</h2><p>সব পাঠ, প্রশ্নোত্তর, Practical, Model Test, ২১ দিনের পরিকল্পনা ও শব্দকোষ একসঙ্গে পড়তে মূল বইটি খুলে নাও।</p></div><a className="button button-secondary" href={hscPdfPage(1)} target="_blank" rel="noreferrer"><Mark name="download" size={16}/> PDF খুলে পড়ো</a></div>
      <div className="hsc-scope-note"><Mark name="shield" size={18}/><p>{hscScopeNote}</p></div>
    </div></section>
  </>;
}
