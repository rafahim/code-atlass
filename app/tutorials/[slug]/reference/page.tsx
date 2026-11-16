import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/data/languages";
import { getTutorialCourse } from "@/data/language-tutorials";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { CopyCodeButton } from "@/components/CopyCodeButton";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const course = getTutorialCourse(slug); return course ? { title: `${course.name} রেফারেন্স — CodeAtlas` } : { title: "রেফারেন্স পাওয়া যায়নি" }; }

export default async function TutorialReferencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const course = getTutorialCourse(slug); if (!course) notFound();
  return <><section className="atlas-resource-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href={`/tutorials/${slug}/`}>{course.name}</Link><span>/</span><span>রেফারেন্স</span></div><span className="section-kicker">দ্রুত দেখে নাও</span><h1>{course.name} রেফারেন্স</h1><p>পড়ার সময় প্রয়োজনীয় syntax, keyword ও code pattern দ্রুত খুঁজে নাও। বিস্তারিত বুঝতে সংশ্লিষ্ট পাঠ খুলে দেখো।</p></div></section><section className="section atlas-tutorial-main-section"><div className="shell atlas-tutorial-grid-layout"><TutorialSidebar course={course} activeResource="reference"/><main className="atlas-tutorial-main"><div className="atlas-resource-intro"><strong>{course.references.length}টি দ্রুত রেফারেন্স</strong><span>প্রতিটি শব্দের বাংলা অর্থ ও ছোট syntax উদাহরণ দেওয়া হয়েছে।</span></div><div className="atlas-reference-table-wrap"><table className="atlas-reference-table"><thead><tr><th>শব্দ / Syntax</th><th>সহজ বাংলা অর্থ</th><th>উদাহরণ</th></tr></thead><tbody>{course.references.map((item) => <tr key={`${item.term}-${item.example}`}><td><code>{item.term}</code></td><td>{item.meaning}</td><td><div className="atlas-reference-example"><code>{item.example}</code><CopyCodeButton code={item.example}/></div></td></tr>)}</tbody></table></div><div className="atlas-source-note"><strong>সংস্করণ ও সরকারি নথি</strong><p>Programming language ও toolchain-এর সংস্করণ অনুযায়ী কিছু syntax/API বদলাতে পারে। বাস্তব প্রজেক্টে ব্যবহারের আগে সংশ্লিষ্ট ভাষার সরকারি documentation দেখে নাও।</p></div></main><aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">আরও শিখো</span><h3>রেফারেন্স মুখস্থ নয়</h3><p>প্রতিটি syntax একটি ছোট program-এ ব্যবহার করে দেখো।</p><Link href={`/tutorials/${slug}/examples/`}>উদাহরণ দেখো ↗</Link></div></aside></div></section></>;
}
