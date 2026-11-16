import Link from "next/link";
import { courseChapters, stripChapterPrefix, stripLessonPrefix, toBengaliNumber } from "@/data/curriculum";

export function CourseSidebar({ activeChapter, activeLesson }: { activeChapter: string; activeLesson: string }) {
  return (
    <details className="tutorial-sidebar-mobile" open>
      <summary><span>☰</span> পাঠের তালিকা <small>অধ্যায় ও পাঠ</small></summary>
      <nav className="tutorial-sidebar" aria-label="কোর্সের পাঠ তালিকা">
        <div className="tutorial-sidebar-top">
          <span className="tutorial-sidebar-kicker">সম্পূর্ণ পাঠক্রম</span>
          <Link href="/courses/">সব অধ্যায় <span>↗</span></Link>
        </div>
        {courseChapters.map((chapter) => {
          const isActive = chapter.slug === activeChapter;
          return (
            <details className={`tutorial-sidebar-chapter${isActive ? " is-current" : ""}`} key={chapter.slug} open={isActive}>
              <summary>
                <span className="tutorial-sidebar-chapter-no">{toBengaliNumber(chapter.number).padStart(2, "০")}</span>
                <span className="tutorial-sidebar-chapter-title">{stripChapterPrefix(chapter.title)}</span>
                <span className="tutorial-sidebar-count">{toBengaliNumber(chapter.lessons.length)}</span>
              </summary>
              <div className="tutorial-sidebar-lessons">
                <Link href={`/courses/${chapter.slug}/`} className="tutorial-sidebar-overview">অধ্যায়ের পরিচিতি</Link>
                {chapter.lessons.map((lesson) => {
                  const current = isActive && lesson.slug === activeLesson;
                  return (
                    <Link
                      href={`/courses/${chapter.slug}/${lesson.slug}/`}
                      key={lesson.slug}
                      className={current ? "active" : ""}
                      aria-current={current ? "page" : undefined}
                    >
                      <span>{toBengaliNumber(lesson.number).padStart(2, "০")}</span>
                      {stripLessonPrefix(lesson.title)}
                      {current && <i aria-hidden="true">●</i>}
                    </Link>
                  );
                })}
                {chapter.slug === "html" && <div className="tutorial-sidebar-tools"><span>আরও অনুশীলন</span><Link href="/courses/html/examples/">HTML Examples</Link><Link href="/courses/html/exercises/">HTML Exercises</Link><Link href="/courses/html/quiz/">HTML Quiz</Link><Link href="/courses/html/reference/">HTML Reference</Link></div>}
              </div>
            </details>
          );
        })}
      </nav>
    </details>
  );
}
