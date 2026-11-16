import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/data/languages";
import { getTutorialCourse } from "@/data/language-tutorials";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { TutorialCodeExample } from "@/components/TutorialCodeExample";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const course = getTutorialCourse(slug); return course ? { title: `${course.name} উদাহরণ — CodeAtlas` } : { title: "উদাহরণ পাওয়া যায়নি" }; }

export default async function TutorialExamplesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const course = getTutorialCourse(slug); if (!course) notFound();
  const examples = course.lessons.flatMap((lesson) => lesson.sections.filter((section) => section.code).map((section, index) => ({ lesson, section, index })));
  return <><section className="atlas-resource-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href={`/tutorials/${slug}/`}>{course.name}</Link><span>/</span><span>উদাহরণ</span></div><span className="section-kicker">{course.name} · কোডের উদাহরণ</span><h1>উদাহরণ দেখে শেখো।</h1><p>প্রতিটি কোড নিজে টাইপ করো, ফলাফল অনুমান করো এবং নিজের মতো পরিবর্তন করে দেখো।</p></div></section><section className="section atlas-tutorial-main-section"><div className="shell atlas-tutorial-grid-layout"><TutorialSidebar course={course} activeResource="examples"/><main className="atlas-tutorial-main"><div className="atlas-resource-intro"><strong>{examples.length}টি কোডের উদাহরণ</strong><span>প্রতিটি উদাহরণের সঙ্গে সংশ্লিষ্ট পাঠ দেওয়া আছে।</span></div>{examples.map(({ lesson, section, index }) => <section className="atlas-example-list-item" key={`${lesson.slug}-${index}`}><div className="atlas-example-list-heading"><span className="section-kicker">{lesson.title}</span><h2>{section.title}</h2><Link href={`/tutorials/${slug}/${lesson.slug}/`}>সম্পূর্ণ পাঠ পড়ো ↗</Link></div><TutorialCodeExample title={`${course.name} · ${lesson.title}`} code={section.code ?? ""} output={section.output} language={course.name}/>{section.paragraphs.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}</section>)}{examples.length === 0 && <div className="atlas-source-note">এই course-এর উদাহরণ এখনো সংযোজন করা হয়নি। প্রথম পাঠ থেকে শেখা শুরু করো।</div>}</main><aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">অনুশীলন</span><h3>শুধু কোড দেখো না</h3><p>প্রতিটি উদাহরণে variable বা condition বদলে নতুন output তৈরি করো।</p><Link href={`/tutorials/${slug}/exercises/`}>অনুশীলন করো ↗</Link></div></aside></div></section></>;
}
