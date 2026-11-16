import Link from "next/link";
import type { TutorialCourse } from "@/data/language-tutorials";
import { tutorialResourceLinks } from "@/data/language-tutorials";

export function TutorialSidebar({ course, activeLesson, activeResource }: { course: TutorialCourse; activeLesson?: string; activeResource?: string }) {
  const resources = tutorialResourceLinks(course.slug);
  return (
    <aside className="atlas-tutorial-sidebar">
      <div className="atlas-tutorial-sidebar-inner">
        <div className="atlas-tutorial-side-title">
          <span className="section-kicker">শেখার বিষয়</span>
          <strong>{course.name} পাঠক্রম</strong>
          <small>{course.lessons.length}টি ধাপে সাজানো পাঠ</small>
        </div>
        <div className="atlas-tutorial-side-resources">
          {resources.map((item) => <Link key={item.href} href={item.href} className={(activeResource === item.key || (!activeResource && item.key === "tutorial" && !activeLesson)) ? "active" : ""}>
            <span className="atlas-side-resource-icon">{item.icon === "book" ? "▤" : item.icon === "code" ? "⌘" : item.icon === "pencil" ? "✎" : item.icon === "help" ? "?" : item.icon === "target" ? "◇" : "#"}</span>
            <span><b>{item.label}</b><small>{item.detail}</small></span>
          </Link>)}
        </div>
        <div className="atlas-tutorial-side-lessons">
          <div className="atlas-sidebar-heading"><span>এই কোর্সের পাঠ</span><span>{course.lessons.length}</span></div>
          {course.lessons.map((item) => <Link key={item.slug} href={`/tutorials/${course.slug}/${item.slug}/`} className={activeLesson === item.slug ? "active" : ""}>
            <span className="atlas-sidebar-number">{String(item.number).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)])}</span>
            <span>{item.title}</span>
          </Link>)}
        </div>
        <Link href="/tutorials/" className="atlas-back-to-catalog">← সব পাঠক্রমে ফিরে যাও</Link>
      </div>
      <details className="atlas-mobile-tutorial-menu">
        <summary>☰ {course.name} পাঠের তালিকা ও সহায়িকা</summary>
        <div className="atlas-mobile-tutorial-menu-content">
          {resources.map((item) => <Link key={item.href} href={item.href}>{item.label} — {item.detail}</Link>)}
          {course.lessons.map((item) => <Link key={item.slug} href={`/tutorials/${course.slug}/${item.slug}/`}>{item.number}. {item.title}</Link>)}
        </div>
      </details>
    </aside>
  );
}
