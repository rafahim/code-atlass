import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { hscChapters, hscMcqs, hscModelTest, hscPracticals, hscScopeNote, bnNumber, hscPdfPage } from "@/data/hsc";

export const metadata: Metadata = {
  title: "HSC Preparation · ICT",
  description: "HSC ICT অধ্যায় ৪, ৫ ও ৬-এর বাংলা পাঠ, MCQ, সৃজনশীল প্রশ্ন, practical lab ও ২১ দিনের প্রস্তুতি পরিকল্পনা।",
};

const tools = [
  { href: "/hsc-preparation/exam-practice/", no: "০১", title: "MCQ ও Model Test", desc: "৯০টি অধ্যায়ভিত্তিক MCQ এবং ১৫টি মডেল-টেস্ট MCQ দিয়ে নিজের প্রস্তুতি যাচাই করো।", icon: "book" as const },
  { href: "/hsc-preparation/practical/", no: "০২", title: "Practical Lab", desc: "৬টি HTML, ৪টি C এবং ২টি Database practical হাতে-কলমে করো।", icon: "terminal" as const },
  { href: "/hsc-preparation/study-plan/", no: "০৩", title: "২১ দিনের প্রস্তুতি", desc: "প্রতিদিনের নির্দিষ্ট পড়া ও আত্মপরীক্ষা শেষ করে অগ্রগতি চিহ্নিত করো।", icon: "clock" as const },
  { href: "/hsc-preparation/resources/", no: "০৪", title: "প্রশ্ন ও রিভিশন", desc: "সংক্ষিপ্ত, অনুধাবনমূলক, বোর্ড-ধাঁচের ও সৃজনশীল প্রশ্নের মূল PDF অংশ দেখো।", icon: "layers" as const },
];

export default function HscPreparationPage() {
  return <>
    <section className="hsc-hero"><div className="shell hsc-hero-inner">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>HSC Preparation</span></div>
      <div className="hsc-hero-grid"><div>
        <span className="hsc-eyebrow"><i /> একাদশ–দ্বাদশ শ্রেণি · ICT</span>
        <h1>HSC Preparation<span>.</span></h1>
        <p>ICT-এর নির্বাচিত অধ্যায়গুলো সহজ বাংলা পাঠ, উদাহরণ, code, MCQ, সৃজনশীল প্রশ্ন ও practical-এর মাধ্যমে প্রস্তুত করো। পড়ো, নিজে অনুশীলন করো, তারপর পরীক্ষা দাও।</p>
        <div className="hsc-hero-actions"><a className="button button-primary" href="#hsc-chapters">পড়াশোনা শুরু করো <Mark name="arrow" size={18}/></a><a className="button button-outline-light" href={hscPdfPage(1)} target="_blank" rel="noreferrer"><Mark name="download" size={17}/> মূল PDF দেখো</a></div>
        <div className="hsc-hero-trust"><span><Mark name="check" size={15}/> Account লাগবে না</span><span><Mark name="check" size={15}/> বাংলা ব্যাখ্যা</span><span><Mark name="check" size={15}/> নিজে practice করো</span></div>
      </div><aside className="hsc-hero-summary"><div className="hsc-summary-top"><span className="hsc-summary-icon"><Mark name="book" size={26}/></span><span>শিক্ষার্থী সংস্করণ · ২০২৬ প্রস্তুতি</span></div><h2>HSC ICT প্রস্তুতি</h2><div className="hsc-summary-stats"><div><strong>{bnNumber(3)}</strong><small>অধ্যায়</small></div><div><strong>{bnNumber(27)}</strong><small>মূল পাঠ</small></div><div><strong>{bnNumber(90)}</strong><small>MCQ</small></div></div><div className="hsc-summary-rule"/><p>শেখো · অনুশীলন করো · নিজের প্রস্তুতি যাচাই করো</p></aside></div>
    </div></section>

    <section className="hsc-scope"><div className="shell hsc-scope-inner"><Mark name="info" size={21}/><p><strong>সিলেবাসের সীমা:</strong> {hscScopeNote}</p></div></section>

    <section className="section hsc-chapters-section" id="hsc-chapters"><div className="shell"><div className="section-heading-row"><div><span className="section-kicker">পাঠ্যসূচি</span><h2>তিনটি অধ্যায়।<span> এক ধাপে এক ধাপ।</span></h2><p>প্রথমে পাঠ বুঝে পড়ো, তারপর প্রশ্ন ও ব্যবহারিক কাজ দিয়ে নিজের শেখা যাচাই করো।</p></div><span className="hsc-total-chip"><Mark name="book" size={16}/> {bnNumber(27)}টি পাঠ</span></div>
      <div className="hsc-chapter-grid">{hscChapters.map((chapter) => <Link href={`/hsc-preparation/${chapter.slug}/`} className="hsc-chapter-card" key={chapter.slug}><div className="hsc-chapter-card-top"><span>অধ্যায় {bnNumber(chapter.number)}</span><small>{bnNumber(chapter.lessons.length)}টি পাঠ · PDF পৃষ্ঠা {chapter.pages}</small></div><h3>{chapter.shortTitle}</h3><p>{chapter.description}</p><div className="hsc-chapter-tags">{chapter.topics.slice(0,4).map((topic)=> <span key={topic}>{topic}</span>)}</div><strong>অধ্যায় খুলে পড়ো <Mark name="arrow" size={16}/></strong></Link>)}</div></div></section>

    <section className="section hsc-tools-section"><div className="shell"><div className="section-heading-row"><div><span className="section-kicker">পরীক্ষার প্রস্তুতি</span><h2>শুধু পড়া নয়।<span> পরীক্ষা ও practice-ও।</span></h2><p>পাঠ শেষ হলে MCQ, written practice এবং practical-এর মাধ্যমে প্রস্তুতি যাচাই করো।</p></div></div><div className="hsc-tool-grid">{tools.map((tool)=><Link href={tool.href} className="hsc-tool-card" key={tool.no}><span className="hsc-tool-no">{tool.no}</span><span className="hsc-tool-icon"><Mark name={tool.icon} size={22}/></span><h3>{tool.title}</h3><p>{tool.desc}</p><strong>এখনই খোলো <Mark name="arrow" size={15}/></strong></Link>)}</div></div></section>

    <section className="hsc-quick-stats"><div className="shell hsc-quick-stats-inner"><div><strong>{bnNumber(hscMcqs.length)}</strong><span>অধ্যায়ভিত্তিক MCQ</span></div><div><strong>{bnNumber(hscModelTest.length)}</strong><span>মডেল টেস্ট MCQ</span></div><div><strong>{bnNumber(hscPracticals.length)}</strong><span>Practical Lab</span></div><div><strong>{bnNumber(21)}</strong><span>দিনের পড়ার পরিকল্পনা</span></div></div></section>

    <section className="hsc-source-section"><div className="shell hsc-source-inner"><div><span className="section-kicker">মূল শিক্ষাসামগ্রী</span><h2>তোমার দেওয়া HSC Preparation বই থেকেই সাজানো।</h2><p>ওয়েবসাইটের পাঠগুলো মূল PDF-এর অধ্যায় অনুসারে সাজানো হয়েছে। সংক্ষিপ্ত প্রশ্ন, অনুধাবন, বোর্ড-ধাঁচের প্রশ্ন, সৃজনশীল প্রশ্ন, উত্তর কৌশল ও শব্দকোষও মূল PDF-এ রাখা আছে।</p><a className="button button-primary" href={hscPdfPage(1)} download><Mark name="download" size={17}/> HSC Preparation PDF ডাউনলোড</a></div><div className="hsc-source-page-links">{[{t:"অধ্যায় ৪ · ওয়েব ডিজাইন ও HTML",p:3},{t:"অধ্যায় ৫ · প্রোগ্রামিং ভাষা",p:12},{t:"অধ্যায় ৬ · DBMS",p:21},{t:"সমাধানসহ সৃজনশীল প্রশ্ন",p:29},{t:"Practical ও পূর্ণাঙ্গ Model Test",p:34}].map((item)=><a href={hscPdfPage(item.p)} target="_blank" rel="noreferrer" key={item.p}><span>{item.t}</span><small>পৃষ্ঠা {bnNumber(item.p)} থেকে <Mark name="external" size={13}/></small></a>)}</div></div></section>
  </>;
}
