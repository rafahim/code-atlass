import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/Mark";
import { ChapterProgress } from "@/components/LessonProgress";
import { getHscChapter, hscChapters, bnNumber, hscPdfPage } from "@/data/hsc";

export const dynamicParams = false;
export function generateStaticParams() { return hscChapters.map((chapter) => ({ chapter: chapter.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter: slug } = await params; const chapter = getHscChapter(slug);
  return chapter ? { title: `অধ্যায় ${bnNumber(chapter.number)} · ${chapter.title}`, description: chapter.description } : { title: "HSC অধ্যায় পাওয়া যায়নি" };
}

export default async function HscChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter: slug } = await params; const chapter = getHscChapter(slug); if (!chapter) notFound();
  return <>
    <section className="hsc-page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/hsc-preparation/">HSC Preparation</Link><span>/</span><span>অধ্যায় {bnNumber(chapter.number)}</span></div><div className="hsc-page-title-row"><div><span className="hsc-eyebrow"><i/> HSC ICT · PDF পৃষ্ঠা {chapter.pages}</span><h1>অধ্যায় {bnNumber(chapter.number)}<span> · {chapter.shortTitle}</span></h1><p>{chapter.description}</p></div><div className="hsc-page-mark">{bnNumber(chapter.number)}</div></div><ChapterProgress chapterSlug={`hsc:${chapter.slug}`} total={chapter.lessons.length}/></div></section>
    <section className="section hsc-chapter-body"><div className="shell hsc-chapter-layout"><main className="hsc-chapter-main">
      <div className="hsc-outcome-card"><Mark name="lightbulb" size={21}/><div><strong>এই অধ্যায় শেষে কী পারবে?</strong><p>{chapter.outcome}</p></div></div>
      <div className="hsc-topic-tags"><span>এই অধ্যায়ের মূল বিষয়</span>{chapter.topics.map((topic)=><b key={topic}>{topic}</b>)}</div>
      <div className="hsc-lesson-list-head"><div><span className="section-kicker">পাঠের তালিকা</span><h2>এক এক করে শিখে নাও।</h2></div><span>{bnNumber(chapter.lessons.length)}টি পাঠ</span></div>
      <div className="hsc-lesson-list">{chapter.lessons.map((lesson)=><Link href={`/hsc-preparation/${chapter.slug}/${lesson.slug}/`} key={lesson.slug}><span>{bnNumber(lesson.number)}</span><div><strong>{lesson.title}</strong><small>বিস্তারিত পাঠ · উদাহরণ · নিজেকে যাচাই</small></div><Mark name="arrow" size={17}/></Link>)}</div>
      <div className="hsc-chapter-actions"><Link href={`/hsc-preparation/exam-practice/#chapter-${chapter.number}`} className="button button-primary">অধ্যায় {bnNumber(chapter.number)} MCQ দাও <Mark name="arrow" size={17}/></Link><a className="button button-secondary" href={hscPdfPage(chapter.number===4?3:chapter.number===5?12:21)} target="_blank" rel="noreferrer">মূল PDF-এর পাঠ দেখো <Mark name="external" size={15}/></a></div>
    </main><aside className="hsc-chapter-aside"><div className="hsc-aside-card"><span className="section-kicker">পরীক্ষার প্রস্তুতি</span><h3>পাঠ শেষে নিজেকে যাচাই করো।</h3><ol><li>সংজ্ঞা নিজের ভাষায় বলো।</li><li>পার্থক্যগুলো লিখে দেখো।</li><li>Code বা diagram নিজে তৈরি করো।</li><li>MCQ ও সৃজনশীল প্রশ্ন করো।</li></ol></div><Link href="/hsc-preparation/" className="hsc-back-link">← HSC Preparation-এ ফেরো</Link></aside></div></section>
  </>;
}
