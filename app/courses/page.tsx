import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { curriculum, courseChapters, totalLessons, toBengaliNumber, stripChapterPrefix } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "বাংলা Programming Master Course",
  description: "একদম শূন্য থেকে programming, web development, database, Git, API, testing ও software project শেখার ১৯ অধ্যায়ের বাংলা কোর্স।",
};

export default function CoursesPage() {
  return (
    <>
      <section className="course-hero">
        <div className="shell course-hero-inner">
          <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>সম্পূর্ণ কোর্স</span></div>
          <div className="course-hero-grid">
            <div>
              <span className="course-eyebrow"><i /> একদম শূন্য থেকে শুরু</span>
              <h1>শূন্য থেকে <span>সফটওয়্যার ডেভেলপার।</span></h1>
              <p>কম্পিউটারের ভিত্তি থেকে Programming, Web, Database, API, Testing ও বাস্তব project—সবকিছু ধাপে ধাপে শেখার জন্য সাজানো বাংলা পাঠক্রম।</p>
              <div className="course-hero-actions"><a href="#chapters" className="button button-primary">পাঠ শুরু করো <Mark name="arrow" size={18} /></a><Link href="/practice/" className="button button-outline-light"><Mark name="terminal" size={17} /> Code Practice</Link></div>
              <div className="course-trust"><span><Mark name="check" size={15} /> Account লাগবে না</span><span><Mark name="check" size={15} /> নিজের গতিতে শেখো</span><span><Mark name="check" size={15} /> বাংলা ব্যাখ্যা</span></div>
            </div>
            <aside className="course-hero-card">
              <div className="course-book-mark"><Mark name="book" size={28} /></div>
              <span className="course-card-label">শিক্ষার্থী সংস্করণ · ২০২৬</span>
              <h2>বাংলা Programming Master Course</h2>
              <div className="course-stat-grid"><div><strong>{toBengaliNumber(courseChapters.length)}</strong><span>অধ্যায়</span></div><div><strong>{toBengaliNumber(totalLessons)}</strong><span>পাঠ</span></div><div><strong>০</strong><span>অ্যাকাউন্ট</span></div></div>
              <div className="course-card-rule" />
              <p>শেখো · অনুশীলন করো · তৈরি করো</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section course-method-section">
        <div className="shell course-method-grid">
          <div><span className="section-kicker">শিক্ষকের পরামর্শ</span><h2>কোড কপি করলেই শেখা শেষ নয়।</h2><p>নিজে টাইপ করো, চালানোর আগে output অনুমান করো, তারপর ভুল হলে error message পড়ে কারণ খুঁজে ঠিক করো।</p></div>
          <div className="course-method-steps"><div><b>০১</b><span>পড়ো এবং বোঝো</span></div><div><b>০২</b><span>নিজে কোড লেখো</span></div><div><b>০৩</b><span>চালিয়ে ফল মিলাও</span></div><div><b>০৪</b><span>ভুল খুঁজে ঠিক করো</span></div></div>
        </div>
      </section>
      <section className="course-guide-section"><div className="shell course-guide-grid"><div><span className="section-kicker">এই কোর্স কার জন্য</span><h2>একদম নতুন শিক্ষার্থীর জন্য।</h2>{curriculum.intro.map((block, index) => <p className={block.type === "note" ? "course-guide-highlight" : ""} key={index}>{block.text}</p>)}</div><div><span className="section-kicker">কীভাবে পড়বে</span><h2>ধাপে ধাপে এগিয়ে যাও।</h2>{curriculum.howTo.map((block, index) => <p className={block.type === "note" ? "course-guide-highlight" : ""} key={index}>{block.text}</p>)}</div></div></section>

      <section className="section course-chapters-section" id="chapters">
        <div className="shell">
          <div className="section-heading-row"><div><span className="section-kicker">সম্পূর্ণ শেখার পথ</span><h2>একটি অধ্যায় শেষ করে <span>পরেরটিতে যাও।</span></h2><p>প্রথমে ভিত্তি, তারপর language ও tools, শেষে বাস্তব project—এই ক্রমে সাজানো হয়েছে।</p></div><span className="course-total-pill"><Mark name="book" size={16} /> {toBengaliNumber(courseChapters.length)}টি অধ্যায়</span></div>
          <div className="course-chapter-grid">
            {courseChapters.map((chapter) => (
              <Link href={`/courses/${chapter.slug}/`} className="course-chapter-card" key={chapter.slug}>
                <div className="course-chapter-card-top"><span className="course-chapter-number">{toBengaliNumber(chapter.number).padStart(2, "০")}</span><span className="course-chapter-count">{toBengaliNumber(chapter.lessons.length)}টি পাঠ</span></div>
                <h3>{stripChapterPrefix(chapter.title)}</h3>
                <p>{chapter.description}</p>
                <span className="course-card-link">অধ্যায় খুলে দেখো <Mark name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="course-source-section"><div className="shell course-source-inner"><div><span className="section-kicker">পাঠক্রম সম্পর্কে</span><h2>ধাপে ধাপে শেখার জন্য তৈরি।</h2><p>এই কোর্সে beginner-to-intermediate ভিত্তি, নিয়মিত ব্যবহৃত বিষয়, অনুশীলন ও project রাখা হয়েছে। সব ভাষার প্রতিটি library বা framework API এক কোর্সে শেষ করা সম্ভব নয়—প্রয়োজন হলে official documentation দেখে আরও গভীরে যাবে।</p></div><div className="course-source-note"><Mark name="info" size={20} /><p>এই পাঠক্রম তোমার দেওয়া <strong>Programming Master Course Bangla</strong> নথি থেকে সাজানো হয়েছে। মূল অধ্যায় ও উদাহরণ রাখা হয়েছে; প্রতিটি পাঠে অনুশীলনের জন্য আলাদা শেখার নির্দেশনাও যোগ করা হয়েছে।</p></div></div></section>
    </>
  );
}
