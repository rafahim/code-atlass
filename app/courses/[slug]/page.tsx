import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/Mark";
import { ChapterProgress } from "@/components/LessonProgress";
import { courseChapters, getCourseChapter, toBengaliNumber, stripChapterPrefix, stripLessonPrefix } from "@/data/curriculum";

export const dynamicParams = false;
export function generateStaticParams() { return courseChapters.map((chapter) => ({ slug: chapter.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getCourseChapter(slug);
  return chapter ? { title: stripChapterPrefix(chapter.title), description: chapter.description } : { title: "অধ্যায় পাওয়া যায়নি" };
}

function ContentIntro({ blocks }: { blocks: { type: string; text: string }[] }) {
  if (!blocks.length) return null;
  return <div className="course-intro-blocks">{blocks.map((block, index) => <p key={index}>{block.text}</p>)}</div>;
}

export default async function CourseChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getCourseChapter(slug);
  if (!chapter) notFound();
  const chapterIndex = courseChapters.findIndex((item) => item.slug === slug);
  const previous = courseChapters[chapterIndex - 1];
  const next = courseChapters[chapterIndex + 1];

  return (
    <>
      <section className="course-page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/courses/">সব অধ্যায়</Link><span>/</span><span>অধ্যায় {toBengaliNumber(chapter.number)}</span></div><div className="course-page-hero-content"><div><span className="section-kicker">অধ্যায় {toBengaliNumber(chapter.number)} · {toBengaliNumber(chapter.lessons.length)}টি পাঠ</span><h1>{stripChapterPrefix(chapter.title)}</h1><p>{chapter.description}</p></div><div className="course-chapter-mark"><Mark name="book" size={30} /><span>{toBengaliNumber(chapter.number).padStart(2, "০")}</span></div></div><ChapterProgress chapterSlug={chapter.slug} total={chapter.lessons.length} /></div></section>

      <section className="section course-chapter-content"><div className="shell course-chapter-layout"><main className="course-chapter-main">
        <div className="course-teacher-note"><span><Mark name="lightbulb" size={20} /></span><div><strong>শেখার আগে মনে রাখো</strong><p>একবার পড়ে এগিয়ে যেও না। আগে ধারণাটি বোঝো, তারপর code থাকলে নিজে লিখে চালাও। না বুঝলে আগের অংশে ফিরে আসা একদম স্বাভাবিক।</p></div></div>
        <ContentIntro blocks={chapter.intro} />
        {chapter.slug === "html" && <>
          <div className="html-course-start"><div><span className="section-kicker">একদম নতুন? এখান থেকে শুরু করো</span><strong>প্রথমে HTML Editors, তারপর নিজের প্রথম HTML file তৈরি করো।</strong><p>আগে code লেখার জায়গা চিনে নাও। তারপর save, browser-এ open ও refresh করে নিজের লেখা দেখবে। কোনো programming অভিজ্ঞতা লাগবে না।</p></div><Link href="/courses/html/html-editors/">প্রথম পাঠ শুরু করো <Mark name="arrow" size={16}/></Link></div>
          <section className="html-course-toolkit" aria-label="HTML শেখার অতিরিক্ত অংশ">
          <div className="html-course-toolkit-heading"><span className="section-kicker">সম্পূর্ণ শেখার সহায়িকা</span><h2>শুধু পাঠ নয়—অনুশীলনও করো</h2><p>উদাহরণ দেখে শিখো, নিজে code চালাও, প্রশ্নের উত্তর দাও এবং প্রয়োজনীয় tag দ্রুত খুঁজে নাও।</p></div>
          <div className="html-course-toolkit-grid">
            <Link href="/courses/html/examples/" className="html-course-toolkit-card"><span className="toolkit-icon">⌘</span><strong>HTML Examples</strong><small>বাস্তব উদাহরণ দেখো ও code কপি করো</small><i>উদাহরণ দেখো ↗</i></Link>
            <Link href="/courses/html/exercises/" className="html-course-toolkit-card"><span className="toolkit-icon">✎</span><strong>HTML Exercises</strong><small>নিজে কাজ করে শেখা যাচাই করো</small><i>অনুশীলন করো ↗</i></Link>
            <Link href="/courses/html/quiz/" className="html-course-toolkit-card"><span className="toolkit-icon">?</span><strong>HTML Quiz</strong><small>সব পাঠ থেকে প্রশ্নের উত্তর দাও</small><i>Quiz শুরু করো ↗</i></Link>
            <Link href="/courses/html/reference/" className="html-course-toolkit-card"><span className="toolkit-icon">#</span><strong>HTML Reference</strong><small>Tag ও attribute এক জায়গায় খুঁজে নাও</small><i>Reference খোলো ↗</i></Link>
          </div>
          </section>
        </>}
        <div className="course-lesson-list-heading"><div><span className="section-kicker">এই অধ্যায়ের পাঠ</span><h2>এক এক করে শেখো</h2></div><span>{toBengaliNumber(chapter.lessons.length)}টি পাঠ</span></div>
        <div className="course-lesson-list">
          {chapter.lessons.map((lesson) => (
            <Link href={`/courses/${chapter.slug}/${lesson.slug}/`} className="course-lesson-row" key={lesson.slug}>
              <span className="course-lesson-number">{toBengaliNumber(lesson.number).padStart(2, "০")}</span>
              <span className="course-lesson-name"><strong>{stripLessonPrefix(lesson.title)}</strong><small>{toBengaliNumber(lesson.blocks.length)}টি ব্যাখ্যা, উদাহরণ ও note block</small></span>
              <span className="course-lesson-arrow"><Mark name="arrow" size={17} /></span>
            </Link>
          ))}
        </div>
        <div className="course-chapter-nav"><Link href={previous ? `/courses/${previous.slug}/` : "/courses/"}><span>আগের অধ্যায়</span><strong>{previous ? stripChapterPrefix(previous.title) : "কোর্স পরিচিতি"}</strong></Link><Link href={next ? `/courses/${next.slug}/` : "/courses/"} className="next"><span>পরের অধ্যায়</span><strong>{next ? stripChapterPrefix(next.title) : "সব অধ্যায়"}</strong></Link></div>
      </main><aside className="course-chapter-aside"><div className="course-aside-card"><span className="section-kicker">শেখার নিয়ম</span><h3>ছোট ধাপে এগিয়ে যাও</h3><ol><li>পাঠটি মন দিয়ে পড়ো।</li><li>উদাহরণ নিজে টাইপ করো।</li><li>Output আগে অনুমান করো।</li><li>নিজের একটি উদাহরণ বানাও।</li></ol><Link href="/practice/" className="text-link">Code Practice খোলো <Mark name="arrow" size={15} /></Link></div><Link href="/courses/" className="course-back-link"><Mark name="grid" size={16} /> সব অধ্যায়ে ফিরে যাও</Link></aside></div></section>
    </>
  );
}
