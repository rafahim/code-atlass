import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/data/languages";
import { getTutorialCourse } from "@/data/language-tutorials";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { TutorialExerciseBoard, type ExerciseItem } from "@/components/TutorialExerciseBoard";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const course = getTutorialCourse(slug); return course ? { title: `${course.name} অনুশীলন` } : { title: "অনুশীলন পাওয়া যায়নি" }; }

export default async function TutorialExercisesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const course = getTutorialCourse(slug); if (!course) notFound();
  const exercises: ExerciseItem[] = course.lessons.flatMap((lesson) => lesson.exercises.map((task, index) => ({ id: `${lesson.slug}-${index}`, lesson: lesson.title, task, level: index === 0 ? "শুরু" : "আরও অনুশীলন", href: `/tutorials/${slug}/${lesson.slug}/` })));
  return <><section className="atlas-resource-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href={`/tutorials/${slug}/`}>{course.name}</Link><span>/</span><span>অনুশীলন</span></div><span className="section-kicker">নিজে করে শেখো</span><h1>{course.name} অনুশীলন</h1><p>প্রতিটি সমস্যায় নিজের code লেখো। শেষে কাজ শেষ হলে checkbox চিহ্নিত করো—অগ্রগতি এই browser-এ save থাকবে।</p></div></section><section className="section atlas-tutorial-main-section"><div className="shell atlas-tutorial-grid-layout"><TutorialSidebar course={course} activeResource="exercises"/><main className="atlas-tutorial-main"><div className="atlas-resource-intro"><strong>{exercises.length}টি অনুশীলন</strong><span>প্রথমে নিজে চেষ্টা করো; আটকে গেলে সংশ্লিষ্ট পাঠ খুলে দেখো।</span></div><TutorialExerciseBoard exercises={exercises} courseName={course.name}/></main><aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">কাজের কৌশল</span><h3>সমস্যা ভেঙে নাও</h3><ol><li>Input কী হবে লেখো।</li><li>Expected output লেখো।</li><li>ছোট code লেখো।</li><li>Edge case পরীক্ষা করো।</li></ol></div></aside></div></section></>;
}
