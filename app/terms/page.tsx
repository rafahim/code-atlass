import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "শর্তাবলি (Terms & Conditions)",
  description: "Code Atlas ওয়েবসাইট ব্যবহারের নিয়ম, শেখার content ও Code Practice-এর ব্যবহারবিধি, দায় সীমাবদ্ধতা এবং বৌদ্ধিক সম্পত্তি সংক্রান্ত শর্তাবলি।",
  alternates: { canonical: "./" },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero privacy-hero"><div className="shell page-hero-inner"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>শর্তাবলি</span></div><span className="section-kicker">ব্যবহারের নিয়ম</span><h1>পরিষ্কার নিয়ম।<br /><span>নির্ভাবনায় শেখা।</span></h1><p>Code Atlas ব্যবহার করার আগে এই শর্তাবলি পড়ে নাও। ওয়েবসাইট ব্যবহার করলে তুমি এই শর্তগুলো মেনে নিচ্ছ বলে ধরা হবে।</p><div className="policy-updated"><Mark name="file-text" size={16} /> সর্বশেষ হালনাগাদ: ১৭ নভেম্বর ২০২৬</div></div></section>
      <section className="section policy-section"><div className="shell policy-layout"><aside className="policy-aside"><div className="policy-aside-icon"><Mark name="file-text" size={25} /></div><strong>সংক্ষেপে</strong><p>Code Atlas বিনামূল্যে শেখার জন্য তৈরি। Content নিজের শেখার কাজে ব্যবহার করো, তবে অনুমতি ছাড়া বাণিজ্যিকভাবে কপি বা পুনরায় প্রকাশ করো না।</p></aside><article className="policy-content"><div className="policy-intro"><p className="lead-copy">Code Atlas একটি বাংলা-ভাষী Programming শেখার ওয়েবসাইট। নিচের শর্তাবলি এই ওয়েবসাইটের সব পেজ, পাঠ, quiz, অনুশীলন ও Code Practice-এর জন্য প্রযোজ্য।</p><p>শর্তগুলো মেনে না নিলে অনুগ্রহ করে ওয়েবসাইটটি ব্যবহার করো না।</p></div>
        <section><h2>১. সেবার ধরন</h2><p>Code Atlas শিক্ষামূলক তথ্য, Programming-এর পাঠ, উদাহরণ, quiz, HSC ICT প্রস্তুতির উপকরণ এবং ব্রাউজার-ভিত্তিক Code Practice সুবিধা দেয়। এখানে account তৈরি করার প্রয়োজন নেই এবং সব সুবিধা বর্তমানে বিনামূল্যে।</p></section>
        <section><h2>২. শেখার উদ্দেশ্যে ব্যবহার</h2><p>তুমি Code Atlas-এর content ব্যক্তিগত শেখা, শ্রেণিকক্ষে পাঠদান এবং অবাণিজ্যিক কাজে ব্যবহার করতে পারো। ওয়েবসাইট ব্যবহারের সময় তুমি—</p><ul><li>আইন বা অন্যের অধিকার লঙ্ঘন করে এমন কাজে এটি ব্যবহার করবে না;</li><li>ওয়েবসাইটের নিরাপত্তা, কার্যকারিতা বা অন্য ব্যবহারকারীর অভিজ্ঞতা নষ্ট করার চেষ্টা করবে না;</li><li>স্বয়ংক্রিয় উপায়ে (scraper বা bot) অতিরিক্ত চাপ সৃষ্টি করে বা পুরো content সংগ্রহ করে পুনরায় প্রকাশ করবে না।</li></ul></section>
        <section><h2>৩. বৌদ্ধিক সম্পত্তি</h2><p>Code Atlas-এর নকশা, লেখা, বাংলা ব্যাখ্যা, উদাহরণ ও অন্যান্য content-এর স্বত্ব Code Atlas বা সংশ্লিষ্ট স্বত্বাধিকারীর। লিখিত অনুমতি ছাড়া এগুলো বিক্রি, পুনর্বিতরণ বা নিজের নামে প্রকাশ করা যাবে না। সংক্ষিপ্ত অংশ উদ্ধৃত করলে অবশ্যই Code Atlas-কে উৎস হিসেবে উল্লেখ করতে হবে।</p><p>Programming Language, framework ও প্রযুক্তির নাম তাদের নিজ নিজ মালিকের ট্রেডমার্ক। Code Atlas এসব প্রতিষ্ঠানের সঙ্গে যুক্ত নয় বা তাদের দ্বারা অনুমোদিত নয়।</p></section>
        <section><h2>৪. Code Practice ও তোমার Code</h2><p>Code Practice পেজে তুমি যে code, ছবি বা ভিডিও ব্যবহার করো তা তোমার নিজের ব্রাউজারেই থাকে এবং Code Atlas-এর server-এ upload হয় না। এসব তোমার নিজের দায়িত্বে থাকবে। অন্যের স্বত্ব লঙ্ঘন করে এমন ফাইল ব্যবহার করবে না। Browser-এর site data মুছে ফেললে draft হারিয়ে যেতে পারে, তাই গুরুত্বপূর্ণ কাজ <strong>ডাউনলোড</strong> করে রাখো।</p><p>Code Practice-এ চালানো code একটি sandbox-এ কাজ করে। অন্য কোনো ওয়েবসাইটের সঙ্গে সংযুক্ত হয়ে ক্ষতিকর বা বেআইনি কাজ করার জন্য এটি ব্যবহার করা নিষিদ্ধ।</p></section>
        <section><h2>৫. content-এর নির্ভুলতা ও দায় অস্বীকার</h2><p>আমরা সহজ ও সঠিক content দিতে চেষ্টা করি, তবে ভুল, অসম্পূর্ণ বা পুরোনো তথ্য থাকতে পারে। Content যেমন আছে তেমনভাবে (“as is”) দেওয়া হয়, এর নির্ভুলতা বা কোনো নির্দিষ্ট উদ্দেশ্যের উপযোগিতার নিশ্চয়তা দেওয়া হয় না।</p><p><strong>HSC Preparation:</strong> এই অংশ নির্দিষ্ট ICT অধ্যায়ের সহায়ক প্রস্তুতি-উপকরণ। এটি সম্পূর্ণ সিলেবাস বা বোর্ডের প্রশ্ন নয়। পরীক্ষার আগে NCTB, শিক্ষা বোর্ড ও তোমার কলেজের সর্বশেষ নির্দেশনা যাচাই করে নাও।</p><p><strong>অন্যান্য ভাষার কোর্স:</strong> এগুলো ভিত্তি-স্তরের শেখার পথ; পূর্ণাঙ্গ language specification বা standard library documentation নয়। চূড়ান্ত তথ্যের জন্য সংশ্লিষ্ট ভাষার অফিসিয়াল documentation দেখো।</p></section>
        <section><h2>৬. দায়ের সীমাবদ্ধতা</h2><p>আইন যতটুকু অনুমতি দেয়, Code Atlas বা এর নির্মাতা ওয়েবসাইট ব্যবহার, অনুপলব্ধতা বা এখানকার তথ্য ও code ব্যবহার করে হওয়া কোনো প্রত্যক্ষ, পরোক্ষ বা আনুষঙ্গিক ক্ষতির জন্য দায়ী থাকবে না। এখানকার code নিজের project বা পরীক্ষার কাজে ব্যবহারের আগে নিজে পরীক্ষা করে নাও।</p></section>
        <section><h2>৭. তৃতীয় পক্ষের লিংক ও সেবা</h2><p>ওয়েবসাইটে বাইরের documentation, portfolio ও social media-র লিংক থাকতে পারে। এসব ওয়েবসাইটের content ও নীতির উপর আমাদের নিয়ন্ত্রণ নেই এবং এগুলোর জন্য আমরা দায়ী নই। ফন্টসহ কিছু সেবা তৃতীয় পক্ষ থেকে লোড হয়; বিস্তারিত জানতে <Link href="/privacy/">গোপনীয়তা নীতি</Link> দেখো।</p></section>
        <section><h2>৮. সেবা ও শর্তের পরিবর্তন</h2><p>আমরা যেকোনো সময় ওয়েবসাইটের content, feature বা এই শর্তাবলি পরিবর্তন, স্থগিত বা বন্ধ করতে পারি। পরিবর্তনের পর ওয়েবসাইট ব্যবহার চালিয়ে গেলে নতুন শর্ত মেনে নেওয়া হয়েছে বলে ধরা হবে। এই পেজের উপরের তারিখ দেখে সর্বশেষ সংস্করণ বুঝে নিতে পারো।</p></section>
        <section><h2>৯. প্রযোজ্য আইন</h2><p>এই শর্তাবলি বাংলাদেশের প্রচলিত আইন অনুযায়ী ব্যাখ্যা ও কার্যকর হবে।</p></section>
        <section><h2>১০. যোগাযোগ</h2><p>এই শর্তাবলি নিয়ে প্রশ্ন বা মতামত থাকলে ইমেইল করো: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} <Mark name="mail" size={13} /></a></p></section>
      </article></div></section>
    </>
  );
}
