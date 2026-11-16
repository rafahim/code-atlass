import Link from "next/link";
import { hscChapters, bnNumber } from "@/data/hsc";

export function HscSidebar({ activeChapter, activeLesson }: { activeChapter?: string; activeLesson?: string }) {
  return (
    <details className="hsc-sidebar-mobile" open>
      <summary><span>☰</span> HSC পাঠের তালিকা <small>অধ্যায় ও পাঠ</small></summary>
      <nav className="hsc-sidebar" aria-label="HSC ICT পাঠের তালিকা">
        <div className="hsc-sidebar-head"><strong>HSC ICT প্রস্তুতি</strong><Link href="/hsc-preparation/">সব অধ্যায় ↗</Link></div>
        {hscChapters.map((chapter) => {
          const current = chapter.slug === activeChapter;
          return (
            <section className={`hsc-sidebar-group${current ? " current" : ""}`} key={chapter.slug}>
              <Link className="hsc-sidebar-chapter" href={`/hsc-preparation/${chapter.slug}/`}>
                <span>{bnNumber(chapter.number)}</span><strong>{chapter.shortTitle}</strong>
                <small>{bnNumber(chapter.lessons.length)}</small>
              </Link>
              <div className="hsc-sidebar-lessons">
                {chapter.lessons.map((lesson) => {
                  const selected = current && lesson.slug === activeLesson;
                  return <Link key={lesson.slug} href={`/hsc-preparation/${chapter.slug}/${lesson.slug}/`} className={selected ? "active" : ""} aria-current={selected ? "page" : undefined}><span>{bnNumber(lesson.number)}</span>{lesson.title}</Link>;
                })}
              </div>
            </section>
          );
        })}
        <div className="hsc-sidebar-tools">
          <Link href="/hsc-preparation/exam-practice/">MCQ ও মডেল টেস্ট</Link>
          <Link href="/hsc-preparation/practical/">Practical Lab</Link>
          <Link href="/hsc-preparation/study-plan/">২১ দিনের পরিকল্পনা</Link>
          <Link href="/hsc-preparation/resources/">প্রশ্ন ও রিভিশন</Link>
        </div>
      </nav>
    </details>
  );
}
