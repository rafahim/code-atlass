import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/data/languages";
import { getTutorialCourse } from "@/data/language-tutorials";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { TutorialQuizBoard } from "@/components/TutorialQuizBoard";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const course = getTutorialCourse(slug); return course ? { title: `${course.name} কুইজ` } : { title: "কুইজ পাওয়া যায়নি" }; }

export default async function TutorialQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const course = getTutorialCourse(slug); if (!course) notFound();
  return <><section className="atlas-resource-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href={`/tutorials/${slug}/`}>{course.name}</Link><span>/</span><span>কুইজ</span></div><span className="section-kicker">নিজের জ্ঞান যাচাই করো</span><h1>{course.name} কুইজ</h1><p>প্রতিটি পাঠ থেকে একটি করে প্রশ্ন। আগে নিজে উত্তর দাও; জমা দিলে সঠিক উত্তর ও ব্যাখ্যা দেখতে পাবে।</p></div></section><section className="section atlas-tutorial-main-section"><div className="shell atlas-tutorial-grid-layout"><TutorialSidebar course={course} activeResource="quizzes"/><main className="atlas-tutorial-main"><TutorialQuizBoard lessons={course.lessons} courseName={course.name}/></main><aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">কুইজের কৌশল</span><h3>উত্তর আগে ভাবো</h3><p>প্রশ্নের উত্তর জানার আগে সংশ্লিষ্ট পাঠ মনে করার চেষ্টা করো। ভুল হলে ব্যাখ্যা পড়ে পাঠে ফিরে যাও।</p><Link href={`/tutorials/${slug}/exercises/`}>আরও অনুশীলন ↗</Link></div></aside></div></section></>;
}
