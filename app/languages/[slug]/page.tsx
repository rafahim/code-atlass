import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanguage, languages } from "@/data/languages";
import { localizeLanguage } from "@/data/bn";
import { getTutorialCourse, tutorialResourceLinks } from "@/data/language-tutorials";
import { Mark } from "@/components/Mark";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const language = getLanguage(slug);
  if (!language) return { title: "Language পাওয়া যায়নি" };
  return { title: `${language.name} বাংলায় শেখো`, description: `${language.name} পাঠ, উদাহরণ, অনুশীলন, কুইজ, চ্যালেঞ্জ ও রেফারেন্স বাংলায় শেখো।` };
}

export default async function LanguagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = getLanguage(slug);
  if (!language) notFound();
  const item = localizeLanguage(language);
  const course = getTutorialCourse(slug);
  if (!course) notFound();
  const resources = tutorialResourceLinks(slug).filter((resource) => resource.key !== "tutorial");
  const firstLesson = course.lessons[0];
  return <>
    <section className="language-hero"><div className="shell language-hero-inner">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/languages/">সব Language</Link><span>/</span><span>{language.name}</span></div>
      <div className="language-hero-content"><div className="language-hero-copy"><span className="section-kicker">{item.categoryBn}</span><h1><span>{language.name}</span> শেখা শুরু করো।</h1><p className="language-tagline">{item.taglineBn}</p><p className="language-description">{item.descriptionBn}</p><div className="language-hero-pills"><span><Mark name="check" size={15}/> {item.levelBn}</span><span><Mark name="book" size={15}/> {course.lessons.length}টি বাংলা পাঠ</span><span><Mark name="user" size={15}/> Account লাগে না</span></div><Link href={`/tutorials/${slug}/${firstLesson.slug}/`} className="button button-primary">প্রথম পাঠ শুরু করো <Mark name="arrow" size={17}/></Link></div>
        <div className="language-code-card"><div className="language-code-header"><span className="language-symbol big-symbol" style={{ "--language-color": language.color } as CSSProperties}>{language.short}</span><div><span className="code-file-label">প্রথম Code-এর নমুনা</span><strong>{language.name}</strong></div><span className="code-ready">● READY</span></div><div className="code-preview">{language.firstSnippet.split("\n").slice(0, 12).map((line, index) => <div className="code-preview-line" key={`${index}-${line}`}><span>{String(index + 1).padStart(2, "0")}</span><code>{line || " "}</code></div>)}</div><div className="code-card-footer"><span><i className="footer-dot"/> প্রথম line-ই শেষ নয়, শুরু মাত্র।</span><Mark name="spark" size={17}/></div></div>
      </div>
    </div></section>
    <section className="section language-content-section"><div className="shell language-content-grid"><div className="language-main-column">
      <div className="content-heading"><span className="section-kicker">তোমার শেখার যাত্রা</span><h2>একটি পরিষ্কার পথ, <span>ধাপে ধাপে।</span></h2><p>প্রতিটি পাঠে বাংলা ব্যাখ্যা, code example, exercise, quiz ও reference—নিজের গতিতে শেখো।</p></div>
      <div className="language-full-course"><div><span className="section-kicker">সম্পূর্ণ পাঠক্রম</span><strong>{language.name} — শূন্য থেকে শেখো</strong><p>{course.lessons.length}টি পাঠে syntax, data type, condition, loop, function, language-specific feature ও project অনুশীলন করো।</p></div><Link href={`/tutorials/${slug}/`} className="button button-primary">পুরো পাঠক্রম দেখো <Mark name="arrow" size={17}/></Link></div>
      <div className="atlas-language-resource-grid">{resources.map((resource) => <Link href={resource.href} key={resource.href} className="atlas-language-resource-card"><strong>{resource.label}</strong><p>{resource.detail}</p><span>খুলে দেখো ↗</span></Link>)}</div>
      <div className="course-lesson-list-heading"><div><span className="section-kicker">পাঠক্রম</span><h2>শুরু থেকে শেখার পাঠ</h2></div><span>{course.lessons.length}টি পাঠ</span></div>
      <div className="course-lesson-list">{course.lessons.map((lesson) => <Link href={`/tutorials/${slug}/${lesson.slug}/`} className="course-lesson-row" key={lesson.slug}><span className="course-lesson-number">{String(lesson.number).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)])}</span><span className="course-lesson-name"><strong>{lesson.title}</strong><small>{lesson.summary}</small></span><span className="course-lesson-arrow"><Mark name="arrow" size={17}/></span></Link>)}</div>
    </div><aside className="language-sidebar"><div className="sidebar-card"><span className="section-kicker">কী কী শিখবে</span><h3>{language.name} দিয়ে কী তৈরি করা যায়?</h3><div className="usecase-list">{item.useCasesBn.map((useCase) => <div key={useCase}><span className="usecase-check"><Mark name="check" size={14}/></span>{useCase}</div>)}</div></div><div className="sidebar-card sidebar-dark"><span className="section-kicker">শেখার সরঞ্জাম</span><h3>একই জায়গায় সব</h3><p>পাঠ, উদাহরণ, অনুশীলন, কুইজ ও রেফারেন্স—সব এক জায়গায়।</p><Link href={`/tutorials/${slug}/`} className="sidebar-link">শেখা শুরু করো <Mark name="arrow" size={16}/></Link></div></aside></div></section>
  </>;
}
