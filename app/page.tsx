import Link from "next/link";
import { languages } from "@/data/languages";
import { LanguageCard } from "@/components/LanguageCard";
import { Mark } from "@/components/Mark";

const featured = ["python", "javascript", "html", "css", "java", "cpp"].map((slug) => languages.find((language) => language.slug === slug)!).filter((language) => language !== undefined);
const paths = [
  { number: "০১", title: "ওয়েবসাইট তৈরি শেখো", text: "HTML, CSS ও JavaScript দিয়ে নিজের প্রথম ওয়েবসাইট তৈরি করো।", tags: ["HTML", "CSS", "JavaScript"], tone: "path-violet" },
  { number: "০২", title: "Programming-এর ভিত্তি গড়ো", text: "Variable, condition, loop ও function-এর মতো মূল ধারণা সহজভাবে শেখো।", tags: ["Python", "Java", "C"], tone: "path-mint" },
  { number: "০৩", title: "Data নিয়ে কাজ করো", text: "Database, query এবং data analysis-এর প্রাথমিক ধারণা তৈরি করো।", tags: ["SQL", "R", "Julia"], tone: "path-peach" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot" /> সবার জন্য Programming শেখার জায়গা</div>
            <h1>কোড শেখো।<br /><span>নিজের স্বপ্ন গড়ো।</span></h1>
            <p className="hero-description">একদম শুরু থেকে Programming শেখার সহজ পথ। পছন্দের Language বেছে নাও, ধাপে ধাপে শেখো, আর নিজের হাতে project তৈরি করো।</p>
            <div className="hero-actions"><Link href="/languages/" className="button button-primary">Language খুঁজে নাও <Mark name="arrow" size={18} /></Link><Link href="/practice/" className="button button-ghost"><Mark name="terminal" size={17} /> কোড লিখে দেখো</Link></div>
            <div className="hero-trust"><span><Mark name="check" size={15} /> একদম Beginner-friendly</span><span><Mark name="check" size={15} /> বিনামূল্যে শেখা</span><span><Mark name="check" size={15} /> Account লাগবে না</span></div>
          </div>
          <div className="hero-visual" aria-label="Code editor-এর নমুনা">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="code-window">
              <div className="code-window-bar"><div className="window-dots"><i /><i /><i /></div><span>hello_world.py</span><span className="window-status">● READY</span></div>
              <div className="code-window-body"><div className="line-numbers">01<br />02<br />03<br />04<br />05<br />06</div><pre><span className="code-muted"># তোমার প্রথম program</span>{"\n"}<span className="code-purple">def</span> <span className="code-blue">start</span>():{"\n"}  <span className="code-blue">name</span> = <span className="code-green">"future developer"</span>{"\n"}  <span className="code-purple">print</span>(<span className="code-green">"Hello, "</span> + name){"\n\n"}<span className="code-yellow">start</span>()</pre></div>
              <div className="code-window-footer"><span><i className="footer-dot" /> Output</span><span>Hello, future developer <b>↗</b></span></div>
            </div>
            <div className="float-card float-card-top"><span className="float-icon violet-icon"><Mark name="spark" size={18} /></span><span><strong>যেকোনো জায়গা থেকে শুরু</strong><small>নিজের পছন্দের Language বেছে নাও</small></span></div>
            <div className="float-card float-card-bottom"><span className="float-icon mint-icon"><Mark name="layers" size={18} /></span><span><strong>ধাপে ধাপে এগিয়ে যাও</strong><small>সহজ Roadmap অনুসরণ করো</small></span><span className="mini-check"><Mark name="check" size={13} /></span></div>
          </div>
        </div>
        <div className="hero-bottom-rule shell"><span>শেখো নিজের গতিতে</span><span>০১ / শুরু হোক শেখার যাত্রা</span></div>
      </section>

      <section className="stats-strip"><div className="shell stats-grid"><div><strong>৩০+</strong><span>Programming Language</span></div><div><strong>৭</strong><span>শেখার Category</span></div><div><strong>০</strong><span>Account খোলার ঝামেলা</span></div><div className="stats-aside">একটু কৌতূহলই<br /><em>বড় কিছু তৈরির শুরু।</em></div></div></section>

      <section className="master-course-promo"><div className="shell master-course-promo-inner"><div className="master-course-promo-mark"><Mark name="book" size={29} /></div><div className="master-course-promo-copy"><span className="section-kicker">বাংলা Programming Master Course</span><h2>শূন্য থেকে <span>সফটওয়্যার ডেভেলপার।</span></h2><p>১৯টি অধ্যায় ও ১৩৭টি পাঠে কম্পিউটার, Programming, Web, Database, Git, API, Testing এবং বাস্তব project শেখো—একদম শুরু থেকে।</p></div><Link href="/courses/" className="button button-primary">সম্পূর্ণ কোর্স শুরু করো <Mark name="arrow" size={18} /></Link></div></section>

      <section className="hsc-home-promo"><div className="shell hsc-home-promo-inner"><div className="hsc-home-promo-mark"><Mark name="book" size={29}/></div><div className="hsc-home-promo-copy"><span className="section-kicker">একাদশ–দ্বাদশ শ্রেণি · ICT</span><h2>বোর্ড পরীক্ষার প্রস্তুতি।<span> বুঝে পড়ো, নিজে অনুশীলন করো।</span></h2><p>HSC ICT-এর ৪র্থ, ৫ম ও ৬ষ্ঠ অধ্যায়ের বাংলা পাঠ, ৯০টি MCQ, Practical Lab, সৃজনশীল প্রশ্ন ও ২১ দিনের পড়ার পরিকল্পনা।</p></div><Link href="/hsc-preparation/" className="button button-primary">HSC Preparation খোলো <Mark name="arrow" size={18}/></Link></div></section>

      <section className="section section-languages" id="languages"><div className="shell"><div className="section-heading-row"><div><span className="section-kicker">শুরু করার জায়গা</span><h2>তোমার পছন্দের <span>Language বেছে নাও।</span></h2><p>প্রতিটি বড় project শুরু হয় ছোট একটি পদক্ষেপ থেকে। নিজের লক্ষ্য অনুযায়ী Language বেছে নাও।</p></div><Link href="/languages/" className="text-link">সব Language দেখো <Mark name="arrow" size={17} /></Link></div><div className="language-grid featured-grid">{featured.map((language) => <LanguageCard key={language.slug} language={language} compact />)}</div><div className="center-action"><Link href="/languages/" className="button button-secondary">সব ৩০টি Language দেখো <Mark name="arrow" size={17} /></Link></div></div></section>

      <section className="section paths-section" id="learning-paths"><div className="shell"><div className="section-heading-row section-heading-light"><div><span className="section-kicker">তোমার শেখার দিকনির্দেশনা</span><h2>একটি পথ বেছে নাও।<br /><span>শুরু করো আজই।</span></h2></div><p>আজই সব জানতে হবে না। একটি বিষয় দিয়ে শুরু করো, ভিত্তি মজবুত করো, তারপর নিজের project তৈরি করো।</p></div><div className="paths-grid">{paths.map((path) => <article className={`path-card ${path.tone}`} key={path.number}><div className="path-top"><span>{path.number} / শেখার পথ</span><Mark name="arrow" size={18} /></div><h3>{path.title}</h3><p>{path.text}</p><div className="path-tags">{path.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>

      <section className="section how-section"><div className="shell how-grid"><div className="how-intro"><span className="section-kicker">শেখা হবে সহজভাবে</span><h2>কম দ্বিধা।<br /><span>বেশি Practice।</span></h2><p>Programming-এর জগৎ বড় মনে হতে পারে। তাই আমরা বিষয়গুলোকে সহজ ধাপে সাজাচ্ছি, যেন তুমি বুঝে বুঝে এগোতে পারো।</p><Link href="/about/" className="text-link">CodeAtlas সম্পর্কে জানো <Mark name="arrow" size={17} /></Link></div><div className="steps-list"><article className="step-item"><span className="step-number">০১</span><div><h3>একটি Language বেছে নাও</h3><p>Category ঘুরে দেখো এবং কী তৈরি করতে চাও তা অনুযায়ী বেছে নাও।</p></div><span className="step-icon"><Mark name="code" size={20} /></span></article><article className="step-item"><span className="step-number">০২</span><div><h3>Roadmap অনুসরণ করো</h3><p>একটি বিষয় থেকে পরের বিষয়ে যাও, ধাপে ধাপে ভিত্তি তৈরি করো।</p></div><span className="step-icon"><Mark name="layers" size={20} /></span></article><article className="step-item"><span className="step-number">০৩</span><div><h3>নিজে Code লিখে দেখো</h3><p>Code Practice page-এ HTML, CSS ও JavaScript লিখে সঙ্গে সঙ্গে ফলাফল দেখো।</p></div><span className="step-icon"><Mark name="terminal" size={20} /></span></article></div></div></section>

      <section className="practice-promo"><div className="shell practice-promo-inner"><div><span className="section-kicker">শুধু পড়লেই হবে না</span><h2>নিজের হাতে Code লেখো।<br /><span>সঙ্গে সঙ্গে ফলাফল দেখো।</span></h2><p>HTML, CSS ও JavaScript একসঙ্গে লিখে Live Preview দেখো। ছবি বা ভিডিওও নিজের device থেকে যোগ করতে পারবে।</p><Link href="/practice/" className="button button-primary">Code Practice শুরু করো <Mark name="arrow" size={18} /></Link></div><div className="practice-promo-art"><div className="promo-mini-window"><div><i /><i /><i /><span>index.html</span></div><pre><b>&lt;h1&gt;</b> Hello World! <b>&lt;/h1&gt;</b>{"\n"}<em>body</em> {'{'} color: #6654df; {'}'}</pre><footer>● Live Preview <span>আপডেট হয়েছে</span></footer></div></div></div></section>

      <section className="closing-section"><div className="shell closing-inner"><div className="closing-spark"><Mark name="spark" size={24} /></div><span className="section-kicker">তোমার প্রথম line-এর অপেক্ষায়</span><h2>কৌতূহল নিয়ে শুরু করো।<br /><span>শিখতে থাকো, তৈরি করতে থাকো।</span></h2><p>কোনো account নয়, কোনো চাপ নয়। শুধু শেখা শুরু করো।</p><Link href="/languages/" className="button button-primary">প্রথম Language বেছে নাও <Mark name="arrow" size={18} /></Link><div className="closing-orb closing-orb-one" /><div className="closing-orb closing-orb-two" /></div></section>
    </>
  );
}
