import type { Metadata } from "next";
import Link from "next/link";
import { CodePractice } from "@/components/CodePractice";

export const metadata: Metadata = {
  title: "Code Practice — Live Code Editor",
  description: "HTML, CSS ও JavaScript লিখে সঙ্গে সঙ্গে নিজের website-এর preview দেখো।",
};

export default function PracticePage() {
  return (
    <>
      <section className="page-hero practice-hero"><div className="shell page-hero-inner"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>Code Practice</span></div><span className="section-kicker">নিজে কোড লিখে শেখো</span><h1>লিখে দেখো। <span>সঙ্গে সঙ্গে ফলাফল।</span></h1><p>HTML, CSS ও JavaScript-এর আলাদা ফাইলে কোড লিখো। Run করে কনসোলে সমস্যা দেখো, আর কম্পিউটার, ট্যাবলেট ও মোবাইলের পর্দায় ফলাফল পরীক্ষা করো।</p><div className="catalog-meta"><span>✓ অ্যাকাউন্ট প্রয়োজন নেই</span><span>✓ ছবি ও ভিডিও নিজের device থেকে</span><span>✓ মোবাইল ও কম্পিউটারে ব্যবহারযোগ্য</span></div></div></section>
      <section className="practice-page-section"><div className="shell"><CodePractice /><div className="practice-help-grid"><article><span>01</span><div><strong>HTML</strong><p>ওয়েবপেজের লেখা, ছবি, বোতাম ও কাঠামো তৈরি করো।</p></div></article><article><span>02</span><div><strong>CSS</strong><p>রং, ফাঁকা জায়গা, বিন্যাস ও responsive design সাজাও।</p></div></article><article><span>03</span><div><strong>JavaScript</strong><p>বোতামে ক্লিক করলে কী হবে, এমন কাজ যোগ করো।</p></div></article></div></div></section>
    </>
  );
}
