import type { Metadata } from "next";
import Link from "next/link";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { getHtmlTeaching } from "@/data/html-teaching";
import { getCourseChapter, stripLessonPrefix, toBengaliNumber } from "@/data/curriculum";

export const metadata: Metadata = { title: "HTML Examples | CodeAtlas", description: "সহজ বাংলায় HTML code example, ব্যাখ্যা ও live practice।" };

export default function HtmlExamplesPage() {
  const chapter = getCourseChapter("html")!;
  const records = chapter.lessons.map((lesson) => ({ slug: lesson.slug, lesson, teaching: getHtmlTeaching(lesson.slug) })).filter((entry) => entry.teaching);
  return <main className="html-resource-page shell">
    <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/courses/html/">HTML Tutorial</Link><span>/</span><span>Examples</span></div>
    <header className="html-resource-hero"><span className="section-kicker">দেখে শেখো · নিজে চালাও</span><h1>HTML Examples</h1><p>প্রতিটি উদাহরণ আগে পড়ো, তারপর নিজের Try It editor-এ পরিবর্তন করে দেখো। এখানে দেওয়া code-গুলো শিক্ষার্থীদের শেখার জন্য নতুন করে সাজানো হয়েছে।</p><div className="html-resource-actions"><Link href="/courses/html/html-editors/">HTML শেখা শুরু করো</Link><Link href="/practice/">Code Practice খোলো</Link></div></header>
    <div className="html-resource-list">{records.map(({ slug, teaching: item, lesson }) => <article className="html-example-card" key={slug}>
      <div className="html-example-card-head"><span>পাঠ {toBengaliNumber(lesson!.number)}</span><Link href={`/courses/html/${slug}/`}>{stripLessonPrefix(lesson!.title)} ↗</Link></div>
      <p>{item!.easyExplanation}</p>
      <div className="html-example-code"><div><strong>Code</strong><CopyCodeButton code={item!.exampleCode}/></div><pre><code>{item!.exampleCode}</code></pre></div>
      <div className="html-example-expect"><strong>কী দেখতে পাবে?</strong><p>{item!.expectedOutput}</p></div>
      <Link className="html-example-open" href={`/courses/html/${slug}/#lesson-tryit-title`}>নিজে edit করে দেখো <span>→</span></Link>
    </article>)}</div>
  </main>;
}
