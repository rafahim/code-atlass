import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/data/languages";
import { getTutorialCourse } from "@/data/language-tutorials";
import { TutorialSidebar } from "@/components/TutorialSidebar";

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((language) => ({ slug: language.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const course = getTutorialCourse(slug); return course ? { title: `${course.name} প্রজেক্ট ও চ্যালেঞ্জ — CodeAtlas` } : { title: "চ্যালেঞ্জ পাওয়া যায়নি" }; }

export default async function TutorialChallengesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const course = getTutorialCourse(slug); if (!course) notFound();
  return <><section className="atlas-resource-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href={`/tutorials/${slug}/`}>{course.name}</Link><span>/</span><span>চ্যালেঞ্জ ও প্রজেক্ট</span></div><span className="section-kicker">বাস্তব সমস্যা সমাধান</span><h1>শেখা জ্ঞান দিয়ে কিছু তৈরি করো।</h1><p>{course.name} ব্যবহার করে ছোট প্রজেক্ট তৈরি করো, কোডের ত্রুটি খুঁজে ঠিক করো এবং বাস্তব সমস্যা সমাধান করো।</p></div></section><section className="section atlas-tutorial-main-section"><div className="shell atlas-tutorial-grid-layout"><TutorialSidebar course={course} activeResource="challenges"/><main className="atlas-tutorial-main"><div className="atlas-resource-intro"><strong>{course.projects.length}টি প্রজেক্ট ও চ্যালেঞ্জ</strong><span>প্রতিটি প্রজেক্ট নিজের কোড এডিটরে তৈরি করে পরীক্ষা করো।</span></div><div className="atlas-project-grid">{course.projects.map((project, index) => <article className="atlas-project-card" key={project.title}><div className="atlas-project-top"><span>প্রজেক্ট {String(index + 1).padStart(2, "০").replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)])}</span><em>{project.level === "Beginner" ? "শুরু" : project.level === "Intermediate" ? "মাঝারি" : project.level === "Practice" ? "অনুশীলন" : project.level}</em></div><h2>{project.title}</h2><p>{project.brief}</p><div className="atlas-project-requirements"><strong>যা যা করতে হবে</strong><ul>{project.requirements.map((item) => <li key={item}>{item}</li>)}</ul></div><Link href={`/tutorials/${slug}/exercises/`}>প্রাসঙ্গিক অনুশীলন করো ↗</Link></article>)}</div></main><aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">প্রজেক্ট করার নিয়ম</span><h3>নিজে পরিকল্পনা করো</h3><ol><li>সমস্যা লিখে বোঝো।</li><li>কাজ ছোট অংশে ভাগ করো।</li><li>প্রথমে সবচেয়ে সহজ সংস্করণ তৈরি করো।</li><li>পরীক্ষা ও README যোগ করো।</li></ol></div></aside></div></section></>;
}
