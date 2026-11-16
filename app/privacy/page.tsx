import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "গোপনীয়তা নীতি (Privacy Policy)", description: "Code Atlas ওয়েবসাইটে কোন তথ্য সংগ্রহ বা সংরক্ষণ করা হয়, Local Storage ও তৃতীয় পক্ষের সেবা কীভাবে কাজ করে — সহজ বাংলায় জানো।", alternates: { canonical: "./" } };

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero privacy-hero"><div className="shell page-hero-inner"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>গোপনীয়তা নীতি</span></div><span className="section-kicker">তোমার গোপনীয়তা গুরুত্বপূর্ণ</span><h1>সহজ শেখা।<br /><span>স্বচ্ছ গোপনীয়তা।</span></h1><p>Code Atlas ব্যবহার করার সময় কোন তথ্য কীভাবে ব্যবহৃত হতে পারে, এই পাতায় তা ব্যাখ্যা করা হয়েছে।</p><div className="policy-updated"><Mark name="shield" size={16} /> সর্বশেষ হালনাগাদ: ১৭ নভেম্বর ২০২৬</div></div></section>
      <section className="section policy-section"><div className="shell policy-layout"><aside className="policy-aside"><div className="policy-aside-icon"><Mark name="shield" size={25} /></div><strong>শুরু থেকেই গোপনীয়তার গুরুত্ব</strong><p>Code Atlas একটি learning website। শেখার page দেখতে account খোলার প্রয়োজন নেই।</p></aside><article className="policy-content"><div className="policy-intro"><p className="lead-copy">কোনো account তৈরি না করেই Programming শেখার resource ঘুরে দেখার সুযোগ দেওয়াই Code Atlas-এর বর্তমান পরিকল্পনা।</p><p>এই নীতি Code Atlas website-এর সব পেজের জন্য প্রযোজ্য। ভবিষ্যতে analytics, comment বা account-এর মতো কোনো feature যোগ হলে এই নীতি হালনাগাদ করা হবে এবং উপরের তারিখ বদলে যাবে।</p></div>
        <section><h2>১. তোমার দেওয়া তথ্য</h2><p>বর্তমান সংস্করণে account registration, login, comment বা contact form নেই। Learning page দেখতে তোমার নাম, email বা profile information দিতে হয় না।</p></section>
        <section><h2>২. Cookie ও Local Storage</h2><p>বর্তমান সংস্করণে advertising cookie, analytics cookie বা user profile storage যোগ করা হয়নি। Browser website-এর file দ্রুত load করার জন্য সাধারণ cache ব্যবহার করতে পারে, এবং আগে দেখা পাঠ ইন্টারনেট ছাড়াই খোলার জন্য সেগুলো browser-এ জমা থাকতে পারে। Code Practice page-এ তোমার code draft browser-এর Local Storage-এ রাখা হয়। নির্বাচিত ছবি ও ভিডিও একই browser/device-এর IndexedDB-তে রাখা হয়, যাতে পরেরবারও পাওয়া যায়। কোর্সের পাঠ শেষ চিহ্নিত করলে সেই অগ্রগতি এবং লাইট/ডার্ক মোডের পছন্দও একই browser-এর Local Storage-এ রাখা হয়। Code draft, lesson progress বা media Code Atlas-এর server-এ upload করা হয় না। Browser-এর site data মুছে ফেললে এগুলো হারিয়ে যেতে পারে।</p></section>
        <section><h2>৩. Technical তথ্য</h2><p>যেকোনো website-এর মতো, পেজ সরবরাহ ও নিরাপদ রাখার সময় IP address, browser-এর ধরন এবং request log-এর মতো সাধারণ technical তথ্য process হতে পারে। Code Atlas এই তথ্য দিয়ে তোমাকে শনাক্ত করার চেষ্টা করে না।</p></section>
        <section><h2>৪. তৃতীয় পক্ষের Link</h2><p>Learning page ও <Link href="/ra-fahim/">ডেভেলপার পেজ</Link> থেকে বাইরের documentation, portfolio বা social media (Facebook, Instagram, YouTube, GitHub) website-এ link থাকতে পারে। সেসব website আলাদাভাবে পরিচালিত হয় এবং তাদের নিজস্ব privacy practice রয়েছে। Link-এ ক্লিক করার পর সেই website-এর নীতি প্রযোজ্য হয়।</p></section>
        <section><h2>৫. শিশু ও শিক্ষার্থীদের গোপনীয়তা</h2><p>Code Atlas সাধারণ শিক্ষার্থীসহ সবার শেখার জন্য তৈরি হচ্ছে। এই সংস্করণে কোনো profile বা account feature নেই এবং website শেখার page দেখার জন্য ব্যক্তিগত তথ্য চায় না।</p></section>
        <section><h2>৬. নীতির পরিবর্তন</h2><p>Website বা feature পরিবর্তিত হলে এই নীতি হালনাগাদ হতে পারে। গুরুত্বপূর্ণ পরিবর্তনের পর উপরের তারিখ পরিবর্তন করা হবে।</p></section>
        <section><h2>৭. যোগাযোগ</h2><p>গোপনীয়তা নিয়ে কোনো প্রশ্ন বা মতামত থাকলে ইমেইল করো: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} <Mark name="mail" size={13} /></a></p><p>ওয়েবসাইট ব্যবহারের নিয়মের জন্য <Link href="/terms/">শর্তাবলি</Link> পেজটিও দেখতে পারো।</p></section>
      </article></div></section>
    </>
  );
}
