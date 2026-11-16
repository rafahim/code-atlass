import type { Metadata } from "next";
import Link from "next/link";
import { HtmlCourseQuiz } from "@/components/HtmlCourseQuiz";
import { getHtmlTeaching } from "@/data/html-teaching";
import { getCourseChapter, stripLessonPrefix } from "@/data/curriculum";

export const metadata: Metadata = { title: "HTML Quiz — বাংলা HTML Tutorial", description: "HTML-এর সব পাঠ থেকে বাংলা বহুনির্বাচনি অনুশীলন।" };

export default function HtmlQuizPage() {
  const chapter = getCourseChapter("html")!;
  const items = chapter.lessons.flatMap((lesson) => {
    const teaching = getHtmlTeaching(lesson.slug);
    if (!teaching) return [];
    return teaching.quiz.map((quiz, index) => ({ id: `${lesson.slug}-${index}`, title: stripLessonPrefix(lesson.title), href: `/courses/html/${lesson.slug}/`, ...quiz }));
  });
  return <main className="html-resource-page shell">
    <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/courses/html/">HTML Tutorial</Link><span>/</span><span>Quiz</span></div>
    <header className="html-resource-hero"><span className="section-kicker">শেখা যাচাই করো</span><h1>HTML Quiz</h1><p>সব HTML পাঠ থেকে প্রশ্ন এসেছে। আগে নিজের জ্ঞান দিয়ে উত্তর দাও। শেষে একসঙ্গে ফলাফল ও ব্যাখ্যা দেখো। এটি শেখার অনুশীলন, কোনো সরকারি পরীক্ষা নয়।</p></header>
    <HtmlCourseQuiz items={items}/>
  </main>;
}
