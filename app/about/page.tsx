import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = { title: "আমাদের সম্পর্কে", description: "Code Atlas কেন তৈরি করা হচ্ছে এবং কীভাবে এটি Programming শেখাকে সহজ করতে চায়।" };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero"><div className="shell page-hero-inner"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>আমাদের সম্পর্কে</span></div><span className="section-kicker">Code Atlas-এর গল্প</span><h1>বড় কিছু শুরু হয় <span>একটি ছোট line থেকে।</span></h1><p>Programming শেখার জগৎকে সবার জন্য আরও সহজ, পরিষ্কার এবং উন্মুক্ত করে তোলাই Code Atlas-এর লক্ষ্য।</p><div className="about-hero-mark"><Mark name="spark" size={30} /></div></div></section>
      <section className="section about-story-section"><div className="shell about-story-grid"><div><span className="section-kicker">আমাদের উদ্দেশ্য</span><h2>শেখাকে করে তোলা <span>সহজ ও সম্ভব।</span></h2></div><div className="about-story-copy"><p className="lead-copy">Programming শুরু করতে গিয়ে অনেকেই দ্বিধায় পড়ে—কোন Language দিয়ে শুরু করবে, কোন বিষয় আগে শিখবে, কোথায় practice করবে।</p><p>Code Atlas এমন একটি জায়গা, যেখানে শিক্ষার্থীরা বিভিন্ন Programming Language সম্পর্কে জানতে পারে, প্রতিটির ব্যবহার বুঝতে পারে এবং বাংলা Master Course-এর ১৯টি অধ্যায়, ১৩৭টি পাঠ ও ৯৪টি code example ধরে একদম ভিত্তি থেকে এগোতে পারে।</p><p>স্কুল-কলেজের শিক্ষার্থী, বিশ্ববিদ্যালয়ের শিক্ষার্থী কিংবা নিজের আগ্রহে শেখা যে কেউ—সবাই যেন সহজভাবে Programming শেখার সুযোগ পায়, সেটিই আমাদের উদ্দেশ্য।</p><p>এখানে account খোলার প্রয়োজন নেই। নিজের পছন্দের বিষয় বেছে নিয়ে শেখা শুরু করা যাবে। Code Practice page-এ HTML, CSS ও JavaScript লিখে সরাসরি ফলাফলও দেখা যাবে।</p></div></div></section>
      <section className="section values-section"><div className="shell"><div className="section-heading-row"><div><span className="section-kicker">আমাদের কাছে যা গুরুত্বপূর্ণ</span><h2>শিক্ষার্থীদের কথা <span>মাথায় রেখে তৈরি।</span></h2></div><p>অপ্রয়োজনীয় জটিলতা নয়—শেখার জন্য পরিষ্কার ও সহজ একটি জায়গা।</p></div><div className="values-grid"><article><span className="value-icon"><Mark name="globe" size={22} /></span><h3>সবার জন্য উন্মুক্ত</h3><p>Account বা sign-up ছাড়াই শেখার বিষয়গুলো ঘুরে দেখা যাবে।</p></article><article><span className="value-icon"><Mark name="layers" size={22} /></span><h3>ভিত্তি থেকে শেখা</h3><p>কম্পিউটারের ভিত্তি থেকে Programming, Web, Database, Git, API, Testing ও বাস্তব project পর্যন্ত পাঠগুলো ধারাবাহিকভাবে সাজানো হয়েছে।</p></article><article><span className="value-icon"><Mark name="spark" size={22} /></span><h3>শিখে নিজে তৈরি করো</h3><p>নিজে code লেখা, পরীক্ষা করা এবং project তৈরি করার মধ্য দিয়েই শেখা আরও সহজ হয়।</p></article></div></div></section>
      <section className="about-cta-section"><div className="shell about-cta"><div><span className="section-kicker">শুরু করতে প্রস্তুত?</span><h2>আজই তোমার শেখার যাত্রা শুরু হোক।</h2></div><Link href="/languages/" className="button button-primary">Language বেছে নাও <Mark name="arrow" size={17} /></Link></div></section>
    </>
  );
}
