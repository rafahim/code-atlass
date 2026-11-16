import type { Metadata } from "next";
import Link from "next/link";
import { getHtmlTeaching } from "@/data/html-teaching";
import { getCourseChapter, stripLessonPrefix, toBengaliNumber } from "@/data/curriculum";

export const metadata: Metadata = { title: "HTML Exercises — বাংলা HTML Tutorial", description: "HTML শেখার জন্য topic-wise বাংলা অনুশীলন।" };

export default function HtmlExercisesPage() {
  const chapter = getCourseChapter("html")!;
  const records = chapter.lessons.map((lesson) => ({ slug: lesson.slug, lesson, teaching: getHtmlTeaching(lesson.slug) })).filter((entry) => entry.teaching);
  const total = records.reduce((sum, entry) => sum + entry.teaching!.exercises.length, 0);
  return <main className="html-resource-page shell">
    <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/courses/html/">HTML Tutorial</Link><span>/</span><span>Exercises</span></div>
    <header className="html-resource-hero"><span className="section-kicker">পড়ার পর হাতে-কলমে শেখা</span><h1>HTML Exercises</h1><p>{toBengaliNumber(records.length)}টি topic-এর জন্য মোট {toBengaliNumber(total)}টি ছোট কাজ সাজানো হয়েছে। উত্তর আগে না দেখে নিজে চেষ্টা করো। প্রতিটি কাজের বিস্তারিত নির্দেশনা সংশ্লিষ্ট পাঠে পাবে।</p><div className="html-resource-actions"><Link href="/courses/html/quiz/">Quiz দিয়ে যাচাই করো</Link><Link href="/courses/html/">সব HTML পাঠ</Link></div></header>
    <div className="html-exercise-index">{records.map(({ slug, teaching, lesson }) => <article className="html-exercise-index-card" key={slug}>
      <div className="html-exercise-index-head"><span>পাঠ {toBengaliNumber(lesson!.number)}</span><Link href={`/courses/html/${slug}/`}>{stripLessonPrefix(lesson!.title)} ↗</Link></div>
      <ol>{teaching!.exercises.map((task, index) => <li key={`${slug}-${index}`}><span>{toBengaliNumber(index + 1)}</span>{task}</li>)}</ol>
      <Link className="html-example-open" href={`/courses/html/${slug}/#html-practice`}>এই পাঠের অনুশীলনে যাও <span>→</span></Link>
    </article>)}</div>
  </main>;
}
