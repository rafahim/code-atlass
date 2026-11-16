"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import type { HtmlTeaching } from "@/data/html-teaching";


type LessonTerm = { term: string; meaning: string };
const sharedTerms: LessonTerm[] = [
  { term: "Tag", meaning: "HTML-এর angle bracket-এর মধ্যে লেখা নির্দেশ, যেমন <p>। এটি browser-কে বলে কোন ধরনের অংশ তৈরি করতে হবে।" },
  { term: "Element", meaning: "সাধারণত opening tag, content এবং closing tag মিলে একটি element হয়। যেমন <p>আমি পড়ি</p>।" },
  { term: "Attribute", meaning: "কোনো element-এর অতিরিক্ত তথ্য। যেমন link-এর href বলে দেয় কোথায় যেতে হবে।" },
];
const lessonTerms: Record<string, LessonTerm[]> = {
  "lesson-01": [{term:"HTML",meaning:"ওয়েবপেজের কাঠামো ও content চিহ্নিত করার markup language।"},{term:"Browser",meaning:"Chrome বা Firefox-এর মতো সফটওয়্যার, যা HTML পড়ে পেজ দেখায়।"},{term:"Document",meaning:"একটি সম্পূর্ণ HTML ফাইলকে document বলা হয়।"}],
  "html-editors": [{term:"Code editor",meaning:"Code লেখার সফটওয়্যার; যেমন VS Code বা Notepad।"},{term:"File extension",meaning:"File name-এর শেষের অংশ, যা file type বুঝতে সাহায্য করে; যেমন .html।"},{term:"Refresh",meaning:"Browser-এ page নতুন করে load করে saved পরিবর্তন দেখা।"}],
  "lesson-02": [{term:"Opening tag",meaning:"Element কোথা থেকে শুরু হয়েছে তা বোঝায়; যেমন <p>।"},{term:"Closing tag",meaning:"Element কোথায় শেষ তা বোঝায়; যেমন </p>।"},{term:"Void element",meaning:"যে element-এর আলাদা closing tag লাগে না; যেমন img, br ও meta।"}],
  "lesson-03": [{term:"Heading",meaning:"পেজ বা অংশের শিরোনাম; h1 থেকে h6 পর্যন্ত স্তর আছে।"},{term:"Paragraph",meaning:"একটি সম্পূর্ণ অনুচ্ছেদ; p element দিয়ে লেখা হয়।"},{term:"Semantic",meaning:"Element শুধু দেখতে কেমন তা নয়, content-এর অর্থ বা ভূমিকা বোঝায়।"}],
  "lesson-04": [{term:"Hyperlink",meaning:"ক্লিক করলে অন্য পেজ, ফাইল বা একই পেজের অংশে নিয়ে যায়।"},{term:"List",meaning:"একাধিক item-কে bullet বা ক্রমিক তালিকায় সাজায়।"},{term:"Table",meaning:"সারি ও কলামে সম্পর্কিত তথ্য দেখানোর কাঠামো।"}],
  "lesson-05": [{term:"Form",meaning:"ব্যবহারকারীর কাছ থেকে তথ্য নেওয়ার অংশ।"},{term:"Label",meaning:"কোন input-এ কী লিখতে হবে তা জানায়।"},{term:"Submit",meaning:"Form-এর তথ্য জমা দেওয়ার চেষ্টা; বাস্তবে server দরকার।"}],
  "lesson-06": [{term:"Metadata",meaning:"পেজ সম্পর্কে তথ্য; সাধারণত সরাসরি body-তে দেখা যায় না।"},{term:"Charset",meaning:"কোন অক্ষর-encoding ব্যবহার হচ্ছে তা জানায়। UTF-8 বাংলা দেখাতে সহায়ক।"},{term:"Viewport",meaning:"Mobile screen-এ পেজ কীভাবে মাপ নেবে তা browser-কে জানায়।"}],
  "lesson-07": [{term:"Syntax error",meaning:"কোডের লেখার নিয়ম ভাঙলে যে ত্রুটি হয়।"},{term:"Validation",meaning:"Code বা input নিয়ম মেনে হয়েছে কি না পরীক্ষা।"},{term:"Debugging",meaning:"ভুলের কারণ খুঁজে ঠিক করার প্রক্রিয়া।"}],
  "html-comments": [{term:"Comment",meaning:"Code-এর ভিতরে developer-এর note; browser page-এ সাধারণত দেখা যায় না।"},{term:"Source code",meaning:"Browser-কে দেখানোর নির্দেশসহ HTML ফাইলের লেখা।"}],
  "html-styles": [{term:"CSS",meaning:"HTML content-এর রং, ফন্ট, spacing ও layout সাজায়।"},{term:"Inline CSS",meaning:"একটি element-এর style attribute-এ লেখা CSS।"},{term:"External stylesheet",meaning:"আলাদা .css ফাইল, যা link element দিয়ে যুক্ত করা হয়।"}],
  "html-colors": [{term:"HEX",meaning:"# চিহ্নের পর ছয়টি hexadecimal digit দিয়ে রং প্রকাশের পদ্ধতি।"},{term:"RGB",meaning:"Red, Green ও Blue channel-এর মান দিয়ে রং তৈরি করা।"},{term:"Contrast",meaning:"Text ও background-এর রঙের পার্থক্য, যা লেখা পড়তে সাহায্য করে।"}],
  "html-formatting": [{term:"Semantic emphasis",meaning:"লেখার অর্থের গুরুত্ব বোঝাতে strong বা em ব্যবহার।"},{term:"Subscript",meaning:"লেখার baseline-এর নিচে ছোট করে লেখা; যেমন H₂O-তে 2।"},{term:"Superscript",meaning:"লেখার baseline-এর উপরে ছোট করে লেখা; যেমন x²-তে 2।"}],
  "html-quotations": [{term:"Inline quote",meaning:"বাক্যের ভেতরে ছোট উদ্ধৃতি; q element।"},{term:"Block quote",meaning:"আলাদা block হিসেবে বড় উদ্ধৃতি; blockquote element।"},{term:"Citation",meaning:"উদ্ধৃতির উৎস বা কাজের নাম উল্লেখ।"}],
  "html-links": [{term:"href",meaning:"Anchor link-এর গন্তব্য URL বা file path।"},{term:"Absolute URL",meaning:"https:// দিয়ে সম্পূর্ণ ওয়েব ঠিকানা।"},{term:"Relative path",meaning:"বর্তমান project folder-এর তুলনায় অন্য ফাইলের অবস্থান।"}],
  "html-images": [{term:"src",meaning:"ছবির ফাইল কোথায় আছে তা বলে।"},{term:"alt text",meaning:"ছবি না দেখা গেলে বা screen reader ব্যবহার করলে ছবির অর্থ জানায়।"},{term:"Responsive image",meaning:"যে ছবি ছোট screen-এও container-এর বাইরে যায় না।"}],
  "html-favicon": [{term:"Favicon",meaning:"Browser tab-এ website-এর পাশে দেখা ছোট icon।"},{term:"Icon file",meaning:"সাধারণত SVG, PNG বা ICO ফরম্যাটে রাখা ছোট ছবি।"}],
  "html-tables": [{term:"Row",meaning:"Table-এর আড়াআড়ি সারি; tr element।"},{term:"Column",meaning:"Table-এর লম্বালম্বি কলাম।"},{term:"Cell",meaning:"সারি ও কলামের মিলনস্থল; th বা td।"}],
  "html-lists": [{term:"Ordered list",meaning:"ক্রম বা সংখ্যা অনুযায়ী তালিকা; ol।"},{term:"Unordered list",meaning:"Bullet দিয়ে তালিকা; ul।"},{term:"List item",meaning:"তালিকার প্রতিটি item; li।"}],
  "html-block-inline": [{term:"Block element",meaning:"সাধারণত নতুন লাইনে শুরু হয় এবং উপলব্ধ প্রস্থ নেয়।"},{term:"Inline element",meaning:"লেখার লাইনের মধ্যে থাকে এবং content-এর মাপ অনুযায়ী জায়গা নেয়।"}],
  "html-classes": [{term:"Class",meaning:"একই style বা পরিচয়ের জন্য একাধিক element-এ ব্যবহার করা যায়।"},{term:"Selector",meaning:"CSS-এ কোন element-কে style করা হবে তা বেছে নেয়।"}],
  "html-id": [{term:"ID",meaning:"একটি নির্দিষ্ট element চিহ্নিত করার unique নাম।"},{term:"Anchor link",meaning:"#id ব্যবহার করে একই page-এর নির্দিষ্ট অংশে যাওয়ার link।"}],
  "html-iframes": [{term:"iframe",meaning:"একটি HTML page-এর ভিতরে আরেকটি page বা resource দেখানোর element।"},{term:"Embedding",meaning:"একটি resource-কে অন্য page-এর মধ্যে দেখানো।"}],
  "html-javascript": [{term:"JavaScript",meaning:"ওয়েবপেজে interaction ও logic যোগ করার programming language।"},{term:"DOM",meaning:"Browser-এর তৈরি document-এর object tree, যা JavaScript দিয়ে পরিবর্তন করা যায়।"}],
  "html-file-paths": [{term:"Path",meaning:"কোন file কোথায় আছে তার ঠিকানা।"},{term:"Relative path",meaning:"যে folder থেকে কাজ করছ, তার তুলনায় file-এর অবস্থান।"},{term:"Root folder",meaning:"Project-এর মূল directory, যার ভেতরে অন্য file/folder থাকে।"}],
  "html-head": [{term:"head",meaning:"পেজের title, metadata ও linked resources রাখে।"},{term:"meta",meaning:"Document সম্পর্কে metadata দেয়।"},{term:"link",meaning:"সাধারণত external stylesheet বা icon যুক্ত করে।"}],
  "html-page-title": [{term:"Page title",meaning:"Head-এর title element-এ লেখা পেজের নাম।"},{term:"H1",meaning:"Body-তে দেখা যায় এমন প্রধান content heading।"},{term:"Metadata",meaning:"পেজ সম্পর্কে তথ্য, যা সাধারণত page body-তে দেখা যায় না।"}],
  "html-layout": [{term:"Layout",meaning:"পেজের header, navigation, content ও footer কোথায় থাকবে তার বিন্যাস।"},{term:"Semantic layout",meaning:"অর্থপূর্ণ element দিয়ে page structure তৈরি।"}],
  "html-responsive": [{term:"Responsive design",meaning:"একই website-কে mobile, tablet ও desktop-এ মানিয়ে নেওয়া।"},{term:"Viewport",meaning:"ব্যবহারকারীর browser-এর দৃশ্যমান পর্দার অংশ।"},{term:"Media query",meaning:"Screen-এর বৈশিষ্ট্য অনুযায়ী CSS বদলানোর নিয়ম।"}],
  "html-computer-code": [{term:"code",meaning:"কম্পিউটার বা developer-এর জন্য লেখা নির্দেশনা।"},{term:"pre",meaning:"Spaces ও line breaks ধরে রেখে preformatted text দেখায়।"},{term:"kbd",meaning:"ব্যবহারকারীকে যে keyboard key চাপতে হবে তা বোঝায়।"}],
  "html-semantics": [{term:"Semantic element",meaning:"Element-এর নাম থেকেই content-এর ভূমিকা বোঝা যায়।"},{term:"main",meaning:"পেজের প্রধান content।"},{term:"article",meaning:"নিজে থেকে অর্থপূর্ণ বা স্বতন্ত্র content block।"}],
  "html-style-guide": [{term:"Indentation",meaning:"Code-এর ভেতরের অংশকে space দিয়ে একটু সরিয়ে দেখানো, যাতে nesting বোঝা যায়।"},{term:"Consistency",meaning:"একই ধরনের code একই নিয়মে লেখা।"}],
  "html-entities": [{term:"Character entity",meaning:"বিশেষ character দেখাতে ব্যবহৃত HTML notation; যেমন &amp;lt;।"},{term:"Reserved character",meaning:"HTML syntax-এ বিশেষ অর্থ আছে এমন character, যেমন < ও &।"}],
  "html-symbols-emojis": [{term:"Unicode",meaning:"বিভিন্ন ভাষা ও symbol-এর character code নির্ধারণের standard।"},{term:"Emoji",meaning:"Unicode-এর মাধ্যমে প্রকাশ করা pictographic character।"}],
  "html-charsets": [{term:"Character encoding",meaning:"Text-এর character কীভাবে byte-এ সংরক্ষিত হবে তা নির্ধারণ করে।"},{term:"UTF-8",meaning:"ওয়েবে বহুল ব্যবহৃত Unicode encoding; বাংলা সমর্থন করে।"}],
  "html-url-encode": [{term:"URL encoding",meaning:"URL-এর মধ্যে বিশেষ character নিরাপদভাবে লেখার পদ্ধতি।"},{term:"Percent encoding",meaning:"বিশেষ character-কে % এবং hexadecimal code দিয়ে প্রকাশ।"}],
  "html-forms": [{term:"Form control",meaning:"Input, textarea, select বা button-এর মতো field।"},{term:"Label",meaning:"Form control-এর উদ্দেশ্য বা নাম জানায়।"},{term:"Submission",meaning:"Form-এর তথ্য নির্দিষ্ট destination-এ পাঠানোর চেষ্টা।"}],
  "html-form-attributes": [{term:"action",meaning:"Form submit হলে কোথায় request যাবে তা জানায়।"},{term:"method",meaning:"কোন HTTP method দিয়ে form পাঠানো হবে তা নির্ধারণ করে।"},{term:"required",meaning:"Field পূরণ না করলে browser submission আটকে দেয়।"}],
  "html-input-types": [{term:"Input type",meaning:"একই input element-এর কাজ নির্ধারণ করে; text, email, number ইত্যাদি।"},{term:"Checkbox",meaning:"একাধিক স্বাধীন option নির্বাচন করতে দেয়।"},{term:"Radio",meaning:"একটি group থেকে একটি option বেছে নিতে দেয়।"}],
  "html-input-attributes": [{term:"min / max",meaning:"Number বা date-এর গ্রহণযোগ্য সীমা নির্ধারণ করে।"},{term:"maxlength",meaning:"Text-এ সর্বোচ্চ কত character লেখা যাবে তা সীমিত করে।"},{term:"pattern",meaning:"Input-এর text নির্দিষ্ট pattern মেনে চলে কি না যাচাই করে।"}],
  "html-canvas": [{term:"Canvas",meaning:"JavaScript দিয়ে pixel-based drawing করার area।"},{term:"2D context",meaning:"Canvas-এ line, shape ও text আঁকার drawing interface।"}],
  "html-svg": [{term:"SVG",meaning:"Vector graphic format; shape ও path দিয়ে ছবি তৈরি হয়।"},{term:"Vector",meaning:"গাণিতিক shape দিয়ে তৈরি graphic; zoom করলেও সাধারণত sharp থাকে।"}],
  "html-audio": [{term:"Audio",meaning:"ওয়েবপেজে sound বা music play করার media।"},{term:"Controls",meaning:"Play, pause ও volume-এর মতো user controls।"}],
  "html-video": [{term:"Video",meaning:"চলমান ছবি ও প্রয়োজনে sound-সহ media।"},{term:"Poster",meaning:"Video play হওয়ার আগে দেখা thumbnail image।"},{term:"Caption",meaning:"Video-র কথার subtitle বা সহায়ক text।"}],
  "html-object-embed": [{term:"Embed",meaning:"অন্য file বা resource পেজের মধ্যে দেখানো।"},{term:"Fallback",meaning:"মূল resource দেখা না গেলে ব্যবহারকারীকে বিকল্প দেওয়া।"}],
  "html-web-storage": [{term:"localStorage",meaning:"Browser-এ ছোট string data দীর্ঘ সময় রাখে।"},{term:"sessionStorage",meaning:"একটি browser tab/session-এর জন্য data রাখে।"},{term:"JSON",meaning:"Object বা array-কে text আকারে সংরক্ষণের সাধারণ format।"}],
  "html-web-apis": [{term:"API",meaning:"এক software-এর আরেক software-এর সুবিধা ব্যবহারের নির্ধারিত interface।"},{term:"Permission",meaning:"Location বা notification-এর মতো feature ব্যবহারের আগে user-এর অনুমতি।"}],
  "html-accessibility": [{term:"Accessibility",meaning:"বিভিন্ন সক্ষমতার মানুষ যেন website ব্যবহার করতে পারে সেই ব্যবস্থা।"},{term:"Screen reader",meaning:"পর্দার লেখা ও structure পড়ে শোনায় এমন সহায়ক software।"},{term:"Keyboard focus",meaning:"Tab দিয়ে কোন control বর্তমানে নির্বাচিত তা বোঝায়।"}],
};

const bn = (value: number) => String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

export function HtmlLessonGuide({ teaching, originalNotes, lessonSlug }: { teaching: HtmlTeaching; originalNotes: { type: string; text: string }[]; lessonSlug: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [tasksDone, setTasksDone] = useState<boolean[]>(() => teaching.exercises.map(() => false));
  const [hydrated, setHydrated] = useState(false);
  const completeCount = useMemo(() => tasksDone.filter(Boolean).length, [tasksDone]);
  const quiz = teaching.quiz[0];
  const vocabulary = lessonTerms[lessonSlug] ?? sharedTerms;
  const progressKey = `codeatlas-html-exercises-v2:${lessonSlug}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        const values = JSON.parse(saved);
        if (Array.isArray(values) && values.length === teaching.exercises.length) {
          setTasksDone(values.map((value) => value === true));
        }
      }
    } catch { /* Progress is optional when browser storage is unavailable. */ }
    setHydrated(true);
  }, [progressKey, teaching.exercises.length]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(progressKey, JSON.stringify(tasksDone)); } catch { /* Private mode or blocked storage. */ }
  }, [hydrated, progressKey, tasksDone]);

  return (
    <div className="html-guide">
      <nav className="html-guide-map" aria-label="এই পাঠের অংশ">
        <span>এই পাঠের ভেতরে</span>
        <a href="#html-understand">সহজ ব্যাখ্যা</a>
        <a href="#html-steps">ধাপে ধাপে</a>
        <a href="#html-example">Code example</a>
        <a href="#html-output">Output</a>
        <a href="#html-practice">অনুশীলন</a>
        <a href="#html-quiz">Quiz</a>
      </nav>

      <section className="html-guide-outcomes">
        <div className="html-guide-section-label"><span>এই পাঠ শেষে তুমি পারবে</span><small>{bn(teaching.goals.length)}টি শেখার লক্ষ্য</small></div>
        <ul>{teaching.goals.map((goal) => <li key={goal}><span aria-hidden="true">✓</span>{goal}</li>)}</ul>
      </section>

      <section className="html-guide-reading" id="html-understand">
        <div className="html-guide-heading"><span className="section-kicker">১ · একদম সহজ ভাষায় বুঝি</span><h2>বিষয়টি আসলে কী?</h2><p>আগে code মুখস্থ করার দরকার নেই। প্রথমে ধারণাটি বোঝো।</p></div>
        <p className="html-guide-explanation">{teaching.easyExplanation}</p>
        <div className="html-guide-why"><strong>এটি শেখা কেন দরকার?</strong><p>{teaching.whyLearn}</p></div>
        <div className="html-guide-analogy"><span aria-hidden="true">💡</span><div><strong>বাস্তব জীবনের উদাহরণ দিয়ে ভাবো</strong><p>{teaching.analogy}</p></div></div>
      </section>

      <section className="html-guide-vocabulary">
        <div className="html-guide-heading"><span className="section-kicker">শব্দগুলো সহজ করে বুঝি</span><h2>এই পাঠে যে শব্দগুলো আসবে</h2><p>নতুন শব্দ দেখলে ভয় পেও না। আগে বাংলা মানে বুঝে নাও, তারপর code-এ খুঁজে দেখো।</p></div>
        <div className="html-guide-vocabulary-grid">{vocabulary.map((item) => <article key={item.term}><strong>{item.term}</strong><p>{item.meaning}</p></article>)}</div>
      </section>

      <section className="html-guide-walkthrough" id="html-steps">
        <div className="html-guide-heading"><span className="section-kicker">২ · ধাপে ধাপে শেখা</span><h2>প্রতিটি অংশের কাজ বুঝে নাও</h2><p>ধাপগুলো এক এক করে পড়ো। কোনো শব্দ না বুঝলে code example-এর সঙ্গে মিলিয়ে দেখো।</p></div>
        <ol>{teaching.walkthrough.map((step, index) => <li key={`${index}-${step}`}><span>{bn(index + 1)}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="html-guide-example" id="html-example">
        <div className="html-guide-heading"><span className="section-kicker">৩ · বাস্তব Code Example</span><h2>এবার নিজের চোখে code দেখো</h2><p>প্রথমে code পড়ো। তারপর নিচের Preview-এর সঙ্গে মিলিয়ে দেখো।</p></div>
        <div className="html-guide-code-card">
          <div className="html-guide-code-top"><span><i /> উদাহরণ Code</span><span>HTML</span></div>
          <div className="html-guide-code-actions"><CopyCodeButton code={teaching.exampleCode} /></div>
          <pre><code>{teaching.exampleCode}</code></pre>
        </div>
      </section>

      <section className="html-guide-live-output" id="html-output">
        <div className="html-guide-heading"><span className="section-kicker">৪ · Browser Preview</span><h2>Code চালালে কী দেখাবে?</h2><p>এটি এই পাঠের উদাহরণের browser preview। নিচের Try It অংশে code বদলে নিজেও পরীক্ষা করতে পারবে।</p></div>
        <div className="html-guide-preview-shell"><div className="html-guide-preview-top"><span><i /> Browser preview</span><small>শুধু উদাহরণ</small></div><iframe title="এই HTML পাঠের উদাহরণ" sandbox="allow-scripts allow-forms" srcDoc={teaching.tryItHtml} loading="lazy" /></div>
        <div className="html-guide-output"><div className="html-guide-output-head"><span>●</span><strong>ফলাফলটি বুঝে নাও</strong></div><p>{teaching.expectedOutput}</p></div>
        <Link className="html-guide-try-link" href="#lesson-tryit-title">এই code নিজে edit করে দেখো <span>↓</span></Link>
      </section>

      <section className="html-guide-mistakes">
        <div className="html-guide-heading"><span className="section-kicker">৫ · ভুল থেকে শেখা</span><h2>শিক্ষার্থীরা সাধারণত যে ভুলগুলো করে</h2><p>Code কাজ না করলে আগে এই তালিকাটি মিলিয়ে দেখো।</p></div>
        <ul>{teaching.commonMistakes.map((mistake, index) => <li key={`${index}-${mistake}`}><span>!</span><p>{mistake}</p></li>)}</ul>
      </section>

      <section className="html-guide-practice" id="html-practice">
        <div className="html-guide-heading"><span className="section-kicker">৬ · এবার তুমি করো</span><h2>নিজে অনুশীলন করো</h2><p>একবারে একটি কাজ করো। কাজ শেষ হলে টিক দাও—এই তালিকা তোমার browser-এ save থাকবে।</p></div>
        <div className="html-guide-task-progress"><span style={{ width: `${teaching.exercises.length ? completeCount / teaching.exercises.length * 100 : 0}%` }} /></div>
        <div className="html-guide-task-count">{bn(completeCount)} / {bn(teaching.exercises.length)}টি কাজ সম্পন্ন</div>
        <div className="html-guide-tasks">{teaching.exercises.map((task, index) => <label key={`${index}-${task}`} className={tasksDone[index] ? "done" : ""}><input type="checkbox" checked={Boolean(tasksDone[index])} onChange={(event) => setTasksDone((prev) => prev.map((value, i) => i === index ? event.target.checked : value))} /><span>{task}</span></label>)}</div>
      </section>

      <section className="html-guide-quiz" id="html-quiz">
        <div className="html-guide-heading"><span className="section-kicker">৭ · নিজেকে যাচাই</span><h2>ছোট একটি প্রশ্নের উত্তর দাও</h2><p>আগে নিজে উত্তর ভাবো। তারপর যাচাই করো। ভুল হলে ব্যাখ্যা পড়ে আবার চেষ্টা করো।</p></div>
        <div className="html-guide-quiz-card">
          <strong>{quiz.question}</strong>
          <div className="html-guide-options">{quiz.options.map((option, index) => <label key={option} className={checked && index === quiz.answer ? "correct" : checked && selected === index ? "incorrect" : selected === index ? "selected" : ""}><input type="radio" name={`html-lesson-quiz-${lessonSlug}`} checked={selected === index} onChange={() => { setSelected(index); setChecked(false); }} /><span>{String.fromCharCode(0x0995 + index)}.</span>{option}</label>)}</div>
          <div className="html-guide-quiz-actions"><button type="button" disabled={selected === null} onClick={() => setChecked(true)}>উত্তর যাচাই করো</button><button type="button" className="secondary" onClick={() => { setSelected(null); setChecked(false); }}>আবার চেষ্টা</button></div>
          {checked && <div className={`html-guide-feedback ${selected === quiz.answer ? "right" : "wrong"}`}><strong>{selected === quiz.answer ? "সঠিক উত্তর! খুব ভালো।" : "এবারও শেখা হলো—আবার চেষ্টা করো।"}</strong><p>{quiz.explanation}</p></div>}
        </div>
      </section>

      {originalNotes.length > 0 && <details className="html-guide-source-notes"><summary>বিস্তারিত নোট ও অতিরিক্ত ব্যাখ্যা দেখো <span>+</span></summary><div>{originalNotes.map((block, index) => block.type === "code" ? <pre key={index}><code>{block.text}</code></pre> : <p key={index}>{block.text}</p>)}</div></details>}
    </div>
  );
}
