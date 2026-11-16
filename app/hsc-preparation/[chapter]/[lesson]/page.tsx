import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/Mark";
import { LessonProgress } from "@/components/LessonProgress";
import { LessonSelfCheck } from "@/components/LessonSelfCheck";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { HscSidebar } from "@/components/HscSidebar";
import { getHscLesson, hscChapters, bnNumber, hscPdfPage } from "@/data/hsc";

export const dynamicParams = false;
export function generateStaticParams() { return hscChapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ chapter: chapter.slug, lesson: lesson.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ chapter: string; lesson: string }> }): Promise<Metadata> {
  const { chapter, lesson } = await params; const found = getHscLesson(chapter, lesson);
  return found ? { title: `${found.lesson.title} · HSC ICT`, description: `HSC ICT অধ্যায় ${bnNumber(found.chapter.number)}-এর ${found.lesson.title} পাঠ। সহজ বাংলা ব্যাখ্যা, MCQ অনুশীলন ও পরীক্ষার প্রস্তুতির জন্য সাজানো।` } : { title: "পাঠ পাওয়া যায়নি" };
}

function makeBlocks(content: string) {
  return content.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean).map((text) => {
    const codeLike = /#include|<!doctype|<html|<head|<body|<table|<form|<a href|<img|int main|printf\(|scanf\(|CREATE TABLE|INSERT INTO|SELECT\s|UPDATE\s|DELETE FROM|PRAGMA|\.open\s|\.tables|\.schema|\bSTART\b|\bINPUT\b|\bPRINT\b|for\s*\(|while\s*\(|if\s*\(/i.test(text);
    const heading = !codeLike && !text.includes("\n") && text.length < 78 && !/[।.!]$/.test(text);
    return { text, codeLike, heading };
  });
}

export default async function HscLessonPage({ params }: { params: Promise<{ chapter: string; lesson: string }> }) {
  const { chapter: chapterSlug, lesson: lessonSlug } = await params; const result = getHscLesson(chapterSlug, lessonSlug); if (!result) notFound();
  const { chapter, lesson } = result;
  const lessonIndex = chapter.lessons.findIndex((item)=>item.slug===lesson.slug);
  const chapterIndex = hscChapters.findIndex((item)=>item.slug===chapter.slug);
  const previous = lessonIndex > 0 ? chapter.lessons[lessonIndex-1] : hscChapters[chapterIndex-1]?.lessons.at(-1);
  const next = lessonIndex < chapter.lessons.length-1 ? chapter.lessons[lessonIndex+1] : hscChapters[chapterIndex+1]?.lessons[0];
  const previousChapter = lessonIndex===0 ? hscChapters[chapterIndex-1] : undefined;
  const nextChapter = lessonIndex===chapter.lessons.length-1 ? hscChapters[chapterIndex+1] : undefined;
  const sourcePageMap: Record<number, number[]> = {
    4: [3, 4, 5, 5, 6, 7, 7],
    5: [12, 12, 13, 13, 14, 14, 15, 16, 16, 17],
    6: [21, 21, 21, 22, 22, 23, 24, 24, 25, 25],
  };
  const pdfPage = sourcePageMap[chapter.number]?.[lesson.number - 1] ?? (chapter.number === 4 ? 3 : chapter.number === 5 ? 12 : 21);
  const blocks = makeBlocks(lesson.content);
  const lessonId = `hsc:${chapter.slug}:${lesson.slug}`;
  const isWebCode = chapter.number === 4;
  const isC = chapter.number === 5;
  const isDb = chapter.number === 6;
  return <>
    <section className="hsc-lesson-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/hsc-preparation/">HSC Preparation</Link><span>/</span><Link href={`/hsc-preparation/${chapter.slug}/`}>অধ্যায় {bnNumber(chapter.number)}</Link><span>/</span><span>পাঠ {bnNumber(lesson.number)}</span></div><span className="hsc-eyebrow"><i/> অধ্যায় {bnNumber(chapter.number)} · পাঠ {bnNumber(lesson.number)} / {bnNumber(chapter.lessons.length)}</span><h1>{lesson.title}</h1><p>{chapter.description}</p><div className="hsc-lesson-meta"><span><Mark name="book" size={15}/> HSC ICT</span><span><Mark name="clock" size={15}/> নিজের গতিতে শেখো</span><span><Mark name="check" size={15}/> Account লাগবে না</span></div></div></section>
    <section className="section hsc-lesson-section"><div className="shell hsc-lesson-layout"><HscSidebar activeChapter={chapter.slug} activeLesson={lesson.slug}/><main className="hsc-lesson-main">
      <div className="hsc-lesson-intro"><span><Mark name="lightbulb" size={20}/></span><div><strong>এই পাঠ কীভাবে পড়বে?</strong><p>প্রথমে প্রতিটি অংশের অর্থ বোঝো। Code থাকলে নিজে টাইপ করো, চালানোর আগে ফল অনুমান করো, তারপর নিজের ভাষায় বিষয়টি ব্যাখ্যা করার চেষ্টা করো।</p></div></div>
      <div className="hsc-lesson-content"><div className="hsc-reading-heading"><span className="section-kicker">মূল পাঠ</span><h2>চলো, বিষয়টি বুঝে নিই।</h2></div>{blocks.map((block,index)=>{
        if(block.codeLike) return <div className="hsc-code-card" key={index}><div><span><i/> উদাহরণ / Syntax</span><CopyCodeButton code={block.text}/></div><pre><code>{block.text}</code></pre></div>;
        if(block.heading) return <h3 className="hsc-content-subheading" key={index}>{block.text}</h3>;
        return <p className="hsc-content-paragraph" key={index}>{block.text}</p>;
      })}</div>
      <div className="hsc-exam-tip"><Mark name="info" size={18}/><p><strong>পরীক্ষার প্রস্তুতি:</strong> এই পাঠের সংজ্ঞা, মূল পার্থক্য, syntax এবং প্রয়োগ নিজের ভাষায় লিখে অনুশীলন করো। প্রশ্নে যা চাওয়া হয়েছে, তার সঙ্গে মিলিয়ে উত্তর দেবে।</p></div>
      {isWebCode ? <div className="hsc-practice-bridge"><div><span className="section-kicker">হাতে-কলমে চেষ্টা</span><h3>এবার নিজের HTML code চালিয়ে দেখো।</h3><p>Code Practice-এ HTML, CSS ও JavaScript লিখে সঙ্গে সঙ্গে output দেখা যাবে।</p></div><Link href="/practice/" className="button button-primary">Code Practice খোলো <Mark name="arrow" size={16}/></Link></div> : isC ? <div className="hsc-runtime-note"><Mark name="terminal" size={18}/><p>C code চালানোর জন্য C compiler দরকার। নিজের কম্পিউটারে GCC/Clang ব্যবহার করো; শুধু browser editor C compile করে না।</p></div> : isDb ? <div className="hsc-runtime-note"><Mark name="terminal" size={18}/><p>SQL example SQLite-compatible হলে SQLite command-line tool বা উপযুক্ত SQLite editor-এ চালিয়ে ফলাফল মিলিয়ে দেখো।</p></div> : null}
      <LessonSelfCheck lessonId={lessonId}/>
      <div className="hsc-pdf-reference"><div><strong>মূল PDF-এ এই অধ্যায় পড়ো</strong><p>PDF-এর প্রাসঙ্গিক অংশে আরও বিস্তারিত ব্যাখ্যা, প্রশ্ন ও উদাহরণ আছে।</p></div><a href={hscPdfPage(pdfPage)} target="_blank" rel="noreferrer">পৃষ্ঠা {bnNumber(pdfPage)} থেকে দেখো <Mark name="external" size={14}/></a></div>
      <div className="hsc-lesson-finish"><div><span className="section-kicker">পাঠের অগ্রগতি</span><h2>এই পাঠ শেষ করেছ?</h2><p>সম্পন্ন হিসেবে চিহ্নিত করলে অগ্রগতি এই browser-এ save থাকবে।</p></div><LessonProgress lessonId={lessonId}/></div>
      <div className="hsc-next-nav"><Link href={previous ? `/hsc-preparation/${previousChapter?.slug ?? chapter.slug}/${previous.slug}/` : `/hsc-preparation/${chapter.slug}/`}><small>← আগের পাঠ</small><strong>{previous?.title ?? "অধ্যায়ের পরিচিতি"}</strong></Link><Link href={next ? `/hsc-preparation/${nextChapter?.slug ?? chapter.slug}/${next.slug}/` : `/hsc-preparation/${chapter.slug}/`} className="next"><small>পরের পাঠ →</small><strong>{next?.title ?? "অধ্যায় শেষ · পাঠের তালিকা"}</strong></Link></div>
    </main></div></section>
  </>;
}
