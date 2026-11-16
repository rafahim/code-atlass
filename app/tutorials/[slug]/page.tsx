import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/data/languages";
import { localizeLanguage } from "@/data/bn";
import { getTutorialCourse, tutorialResourceLinks } from "@/data/language-tutorials";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { Mark } from "@/components/Mark";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getTutorialCourse(slug);
  const language = languages.find((item) => item.slug === slug);
  const localized = language ? localizeLanguage(language) : undefined;
  return course ? { title: `${course.name} পাঠক্রম — বাংলায় শিখো`, description: `${localized?.descriptionBn ?? course.description} ${course.lessons.length}টি বাংলা পাঠ, উদাহরণ, অনুশীলন, কুইজ ও রেফারেন্স।` } : { title: "পাঠক্রম পাওয়া যায়নি" };
}

export default async function TutorialOverviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getTutorialCourse(slug);
  if (!course) notFound();
  const language = languages.find((item) => item.slug === slug);
  const localized = language ? localizeLanguage(language) : undefined;
  const resources = tutorialResourceLinks(slug).filter((item) => item.key !== "tutorial");
  const firstLesson = course.lessons[0];
  return <>
    <section className="atlas-course-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/tutorials/">পাঠসমূহ</Link><span>/</span><span>{course.name}</span></div>
      <div className="atlas-course-hero-grid"><div><span className="section-kicker">{localized?.categoryBn ?? course.category} · বাংলা পাঠক্রম</span><h1>{course.name} <span>পাঠক্রম</span></h1><p>{localized?.descriptionBn ?? course.description}</p><div className="atlas-course-hero-badges"><span>{localized?.levelBn ?? course.level}</span><span>{course.lessons.length}টি ধাপে সাজানো পাঠ</span><span>নিজের গতিতে শেখো</span></div><Link href={`/tutorials/${slug}/${firstLesson.slug}/`} className="button button-primary">প্রথম পাঠ শুরু করো <Mark name="arrow" size={17}/></Link></div>
        <div className="atlas-course-start-card"><span className="atlas-course-start-symbol">{course.name.slice(0, 3)}</span><span className="section-kicker">শুরু করার আগে</span><h2>কোড লেখা শুরু করার প্রস্তুতি</h2><p>{course.setup}</p><div className="atlas-course-start-bottom"><span><Mark name="check" size={15}/> অ্যাকাউন্ট লাগবে না</span><span><Mark name="smartphone" size={15}/> মোবাইলে ব্যবহারযোগ্য</span></div></div></div>
    </div></section>
    <section className="section atlas-tutorial-main-section"><div className="shell atlas-tutorial-grid-layout">
      <TutorialSidebar course={course}/>
      <main className="atlas-tutorial-main">
        <div className="atlas-intro-note"><Mark name="lightbulb" size={20}/><div><strong>শিক্ষকের পরামর্শ</strong><p>প্রতিটি কোড নিজে টাইপ করো। চালানোর আগে কী ফল আসবে অনুমান করো। ভুল হলে error message পড়ো, তারপর একবারে একটি পরিবর্তন করো।</p></div></div>
        <div className="atlas-section-heading"><span className="section-kicker">পাঠক্রম পরিচিতি</span><h2>{course.name} শেখার সম্পূর্ণ পথ</h2><p>প্রথমে ভিত্তি, এরপর সমস্যা সমাধান, ভাষার নিজস্ব বৈশিষ্ট্য এবং ছোট প্রজেক্ট—ধাপে ধাপে এগিয়ে যাও।</p></div>
        <div className="atlas-resource-grid">{resources.map((item) => <Link href={item.href} key={item.href} className="atlas-resource-card"><span className="atlas-resource-symbol">{item.icon === "code" ? "⌘" : item.icon === "pencil" ? "✎" : item.icon === "help" ? "?" : item.icon === "target" ? "◇" : "#"}</span><div><strong>{item.label}</strong><p>{item.detail}</p></div><Mark name="arrow" size={16}/></Link>)}</div>
        <div className="atlas-lesson-list-head"><div><span className="section-kicker">পাঠের তালিকা</span><h2>এক এক করে শেখো</h2></div><span>{course.lessons.length}টি পাঠ</span></div>
        <div className="atlas-tutorial-lesson-list">{course.lessons.map((item) => <Link href={`/tutorials/${slug}/${item.slug}/`} key={item.slug} className="atlas-tutorial-lesson-row"><span className="atlas-tutorial-lesson-number">{String(item.number).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)])}</span><span className="atlas-tutorial-lesson-copy"><strong>{item.title}</strong><small>{item.summary}</small></span><Mark name="arrow" size={17}/></Link>)}</div>
        <div className="atlas-source-note"><Mark name="info" size={18}/><p>{course.sourceNote}</p></div>
      </main>
      <aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">শেখার নিয়ম</span><h3>বুঝে শেখো, মুখস্থ নয়।</h3><ol><li>পাঠটি ধীরে পড়ো।</li><li>উদাহরণ নিজে লিখো।</li><li>ফলাফল অনুমান করো।</li><li>নিজের সমস্যা সমাধান করো।</li></ol></div><div className="atlas-rail-card"><span className="section-kicker">প্রজেক্ট</span><h3>{course.projects.length}টি প্রজেক্ট ও চ্যালেঞ্জ</h3><p>শেখা ধারণা বাস্তব কাজে ব্যবহার করো।</p><Link href={`/tutorials/${slug}/challenges/`}>সব চ্যালেঞ্জ দেখো ↗</Link></div></aside>
    </div></section>
  </>;
}
