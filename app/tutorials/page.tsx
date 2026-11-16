import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { languages } from "@/data/languages";
import { localizeLanguage } from "@/data/bn";
import { getTutorialCourse } from "@/data/language-tutorials";
import { LanguageBrowser } from "@/components/LanguageBrowser";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = {
  title: "প্রোগ্রামিং শেখার পাঠক্রম — বাংলায়",
  description: "৩০টি প্রোগ্রামিং ভাষা ও ওয়েব প্রযুক্তির বাংলা পাঠ, উদাহরণ, অনুশীলন, কুইজ, চ্যালেঞ্জ ও রেফারেন্স।",
};

const categories = ["Web development", "General purpose", "Systems & performance", "Mobile development", "Data & databases", "Scripting & automation", "Functional programming"];
const categoryBn: Record<string, string> = {
  "Web development": "ওয়েব ডেভেলপমেন্ট", "General purpose": "সাধারণ প্রোগ্রামিং", "Systems & performance": "সিস্টেম ও পারফরম্যান্স", "Mobile development": "মোবাইল অ্যাপ", "Data & databases": "ডেটা ও ডেটাবেজ", "Scripting & automation": "স্ক্রিপ্টিং ও অটোমেশন", "Functional programming": "ফাংশনাল প্রোগ্রামিং"
};

export default function TutorialsPage() {
  const courses = languages.map((language) => ({ language, course: getTutorialCourse(language.slug) })).filter((item) => item.course);
  return <>
    <section className="atlas-tutorial-catalog-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>পাঠসমূহ</span></div>
      <span className="section-kicker">বাংলায় প্রোগ্রামিং শেখার লাইব্রেরি</span>
      <h1>যে ভাষা শিখতে চাও,<br/><span>সেখান থেকেই শুরু করো।</span></h1>
      <p>একদম প্রথম ধারণা থেকে কোডের উদাহরণ, নিজে চেষ্টা, অনুশীলন, কুইজ, চ্যালেঞ্জ ও রেফারেন্স—প্রতিটি ভাষার জন্য আলাদা শেখার পথ।</p>
      <div className="atlas-catalog-trust"><span><Mark name="book" size={16}/> ৩০টি আলাদা পাঠক্রম</span><span><Mark name="code" size={16}/> উদাহরণসহ শেখা</span><span><Mark name="smartphone" size={16}/> মোবাইল ও কম্পিউটার উপযোগী</span><span><Mark name="user" size={16}/> অ্যাকাউন্ট ছাড়াই</span></div>
    </div></section>
    <section className="section atlas-tutorial-catalog"><div className="shell">
      <div className="atlas-catalog-heading"><div><span className="section-kicker">সব পাঠক্রম</span><h2>নিজের পছন্দের ভাষা বেছে নাও</h2><p>প্রতিটি ভাষায় ধাপে ধাপে পাঠ, উদাহরণ, অনুশীলন, কুইজ, চ্যালেঞ্জ ও রেফারেন্স আলাদা করে সাজানো।</p></div><span className="atlas-course-count">{courses.length}টি পাঠক্রম</span></div>
      <LanguageBrowser />
      <div className="atlas-category-groups">
        {categories.map((category) => {
          const items = courses.filter((item) => item.language.category === category).map((item) => ({ ...item, localized: localizeLanguage(item.language) }));
          return items.length ? <section key={category} className="atlas-category-group"><div className="atlas-category-heading"><h2>{categoryBn[category] ?? category}</h2><span>{items.length}টি পাঠক্রম</span></div><div className="atlas-tutorial-grid">
            {items.map(({ language, course, localized }) => <Link href={`/tutorials/${language.slug}/`} key={language.slug} className="atlas-tutorial-card" style={{ "--tutorial-accent": language.color } as CSSProperties}>
              <span className="atlas-tutorial-card-symbol">{language.short}</span><div><h3>{language.name}</h3><p>{localized.descriptionBn}</p></div><div className="atlas-tutorial-card-meta"><span>{course?.lessons.length ?? 0}টি পাঠ</span><strong>শেখা শুরু করো ↗</strong></div>
            </Link>)}
          </div></section> : null;
        })}
      </div>
    </div></section>
  </>;
}
