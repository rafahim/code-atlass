import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = { title: "গোপনীয়তা নীতি", description: "CodeAtlas ওয়েবসাইটে তথ্য কীভাবে ব্যবহৃত হয়, তা জানো।" };

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero privacy-hero"><div className="shell page-hero-inner"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>গোপনীয়তা নীতি</span></div><span className="section-kicker">তোমার গোপনীয়তা গুরুত্বপূর্ণ</span><h1>সহজ শেখা।<br /><span>স্বচ্ছ গোপনীয়তা।</span></h1><p>CodeAtlas ব্যবহার করার সময় কোন তথ্য কীভাবে ব্যবহৃত হতে পারে, এই পাতায় তা ব্যাখ্যা করা হয়েছে।</p><div className="policy-updated"><Mark name="shield" size={16} /> সর্বশেষ হালনাগাদ: ২ নভেম্বর ২০২৬</div></div></section>
      <section className="section policy-section"><div className="shell policy-layout"><aside className="policy-aside"><div className="policy-aside-icon"><Mark name="shield" size={25} /></div><strong>শুরু থেকেই গোপনীয়তার গুরুত্ব</strong><p>CodeAtlas একটি static learning website। শেখার page দেখতে account খোলার প্রয়োজন নেই।</p></aside><article className="policy-content"><div className="policy-intro"><p className="lead-copy">কোনো account তৈরি না করেই Programming শেখার resource ঘুরে দেখার সুযোগ দেওয়াই CodeAtlas-এর বর্তমান পরিকল্পনা।</p><p>এই নীতি website-এর বর্তমান সংস্করণের জন্য লেখা। ভবিষ্যতে analytics, contact form, comment বা account যোগ হলে নীতিটি হালনাগাদ করতে হবে।</p></div>
        <section><h2>১. তোমার দেওয়া তথ্য</h2><p>বর্তমান সংস্করণে account registration, login, comment বা contact form নেই। Learning page দেখতে তোমার নাম, email বা profile information দিতে হয় না।</p></section>
        <section><h2>২. Cookie ও Local Storage</h2><p>বর্তমান সংস্করণে advertising cookie, analytics cookie বা user profile storage যোগ করা হয়নি। Browser static website-এর file দ্রুত load করার জন্য সাধারণ cache ব্যবহার করতে পারে। Code Practice page-এ তোমার code draft browser-এর Local Storage-এ রাখা হয়। নির্বাচিত ছবি ও ভিডিও একই browser/device-এর IndexedDB-তে রাখা হয়, যাতে পরেরবারও পাওয়া যায়। কোর্সের পাঠ শেষ চিহ্নিত করলে সেই অগ্রগতিও একই browser-এর Local Storage-এ রাখা হয়। Code draft, lesson progress বা media CodeAtlas-এর server-এ upload করা হয় না। Browser-এর site data মুছে ফেললে এগুলো হারিয়ে যেতে পারে।</p></section>
        <section><h2>৩. Hosting ও Technical তথ্য</h2><p>CodeAtlas GitHub Pages-এ host করার জন্য তৈরি। তৃতীয় পক্ষের hosting provider website সরবরাহ ও নিরাপদ রাখার জন্য IP address, browser details এবং request log-এর মতো technical তথ্য process করতে পারে। এ বিষয়ে provider-এর নিজস্ব privacy policy প্রযোজ্য।</p><p>বিস্তারিত জানতে <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noreferrer">GitHub Privacy Statement <Mark name="external" size={13} /></a> দেখো।</p></section>
        <section><h2>৪. Font ও বাইরের Resource</h2><p>Website-এর বাংলা typography-এর জন্য Google Fonts থেকে Hind Siliguri font load করা হয়। Font request-এর সময় Google কিছু technical information, যেমন IP address, পেতে পারে। বিস্তারিত জানতে <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy <Mark name="external" size={13} /></a> দেখো। চাইলে CSS থেকে external font import সরিয়ে system font ব্যবহার করা যাবে।</p></section>
        <section><h2>৫. তৃতীয় পক্ষের Link</h2><p>Learning page থেকে বাইরের documentation বা website-এ link থাকতে পারে। সেসব website আলাদাভাবে পরিচালিত হয় এবং তাদের নিজস্ব privacy practice রয়েছে।</p></section>
        <section><h2>৬. শিশু ও শিক্ষার্থীদের গোপনীয়তা</h2><p>CodeAtlas সাধারণ শিক্ষার্থীসহ সবার শেখার জন্য তৈরি হচ্ছে। এই সংস্করণে কোনো profile বা account feature নেই এবং website শেখার page দেখার জন্য ব্যক্তিগত তথ্য চায় না।</p></section>
        <section><h2>৭. নীতির পরিবর্তন</h2><p>Website বা feature পরিবর্তিত হলে এই নীতি হালনাগাদ হতে পারে। গুরুত্বপূর্ণ পরিবর্তনের পর উপরের তারিখ পরিবর্তন করা হবে।</p></section>
        <section><h2>৮. যোগাযোগ</h2><p>এই starter version-এ এখনো public contact email যোগ করা হয়নি। Website প্রকাশের আগে এখানে official contact email যোগ করতে হবে, যাতে privacy-সংক্রান্ত প্রশ্ন জানানো যায়।</p></section>
        <div className="policy-note"><strong>প্রকাশের আগে</strong><p>চূড়ান্ত hosting setup, external service এবং website-এর feature অনুযায়ী এই নীতিটি আরেকবার পর্যালোচনা করে নিও।</p></div>
      </article></div></section>
    </>
  );
}
