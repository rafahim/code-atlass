import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/Mark";
import { LessonProgress } from "@/components/LessonProgress";
import { LessonSelfCheck } from "@/components/LessonSelfCheck";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { CourseSidebar } from "@/components/CourseSidebar";
import { LessonTryIt } from "@/components/LessonTryIt";
import { LessonActivities } from "@/components/LessonActivities";
import { HtmlLessonGuide } from "@/components/HtmlLessonGuide";
import { getHtmlTeaching } from "@/data/html-teaching";
import { courseChapters, getCourseLesson, getLessonReviewQuestions, toBengaliNumber, stripChapterPrefix, stripLessonPrefix } from "@/data/curriculum";

export const dynamicParams = false;
export function generateStaticParams() {
  return courseChapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ slug: chapter.slug, lesson: lesson.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lesson: string }> }): Promise<Metadata> {
  const { slug, lesson } = await params;
  const result = getCourseLesson(slug, lesson);
  return result ? {
    title: `${result.lesson.title} | ${stripChapterPrefix(result.chapter.title)}`,
    description: `${stripChapterPrefix(result.chapter.title)}-এর ${result.lesson.title} পাঠটি সহজ বাংলায় উদাহরণ ও অনুশীলনসহ শেখো।`,
  } : { title: "পাঠ পাওয়া যায়নি" };
}

function codeLanguageLabel(chapterSlug: string) {
  const labels: Record<string, string> = {
    "computer-basics": "Command / PowerShell", "problem-solving": "Pseudocode / JavaScript", html: "HTML", css: "CSS",
    c: "C", cpp: "C++", javascript: "JavaScript", typescript: "TypeScript", python: "Python", sql: "SQL", sqlite: "SQL / SQLite",
    "git-github": "Git / Shell", "web-http-api": "HTTP / JSON", "debugging-testing-security": "Code / Command",
    "data-structures-algorithms": "Algorithm / Code", "real-world-projects": "Project Code",
  };
  return labels[chapterSlug] ?? "Code / Example";
}

function linkify(text: string) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.split(urlPattern).map((part, index) => part.match(urlPattern)
    ? <a key={index} href={part.replace(/[),.;]+$/, "")} target="_blank" rel="noreferrer">{part}</a>
    : part);
}

function buildTryItFiles(chapterSlug: string, codes: string[]) {
  const htmlStarter = `<!doctype html>\n<html lang="bn">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>আমার প্রথম উদাহরণ</title>\n</head>\n<body>\n  <main class="card">\n    <h1 id="title">আমার প্রথম ওয়েবপেজ</h1>\n    <p>আমি Code Atlas থেকে HTML, CSS ও JavaScript শিখছি।</p>\n    <button id="change">এখানে চাপ দাও</button>\n  </main>\n</body>\n</html>`;
  let html = htmlStarter;
  let css = `body {\n  font-family: Arial, sans-serif;\n  padding: 24px;\n  background: #f3f4f6;\n}\n.card {\n  max-width: 560px;\n  margin: 30px auto;\n  padding: 24px;\n  border-radius: 16px;\n  background: white;\n  box-shadow: 0 8px 24px #15223814;\n}\nh1 { color: #3157b7; }\nbutton { padding: 10px 16px; border: 0; border-radius: 8px; background: #3157b7; color: white; cursor: pointer; }`;
  let js = `const button = document.querySelector("#change");\nconst title = document.querySelector("#title");\n\nbutton?.addEventListener("click", () => {\n  title.textContent = "চমৎকার! তুমি নিজে code পরিবর্তন করেছ।";\n  console.log("Button-এ click হয়েছে");\n});`;

  if (chapterSlug === "html") {
    const candidate = codes.find((code) => /<!doctype\s+html|<html[\s>]/i.test(code));
    if (candidate) html = candidate;
  }
  if (chapterSlug === "css") {
    const styleSource = codes.map((code) => code.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1]).find(Boolean);
    const rawCss = codes.find((code) => /(^|\n)\s*([.#*]?[a-zA-Z][\w-]*(?:\s+[.#:a-zA-Z\[\]="'-]+)?)\s*\{[\s\S]*?:/.test(code) && !/<(?:html|body|div|p|a|link|style)\b/i.test(code));
    if (styleSource) css = styleSource.trim();
    else if (rawCss) css = rawCss;
  }
  if (chapterSlug === "javascript") {
    const candidate = codes.find((code) => /(console\.log|addEventListener|document\.|function\s|const\s|let\s|=>)/.test(code));
    if (candidate) {
      js = candidate
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<script[^>]*>/gi, "")
        .replace(/<\/script>/gi, "")
        .replace(/^\s*<script[^>]*src=[^>]+>\s*$/gim, "")
        .replace(/^\s*\/\/\s*app\.js\s*$/gim, "")
        .trim() || js;
    }
  }
  return { html, css, js };
}

function buildTasks(lessonTitle: string, blocks: { type: string; text: string }[]) {
  const specific = blocks
    .filter((block) => block.type === "text" || block.type === "note")
    .map((block) => block.text.trim())
    .filter((text) => /অনুশীলন|প্রজেক্ট\s*[:：\d১-৯]|নিজেকে যাচাই|প্রশ্নের উত্তর/i.test(text));
  if (/প্রজেক্ট|capstone|delivery checklist/i.test(lessonTitle)) {
    const projectBrief = blocks.find((block) => block.type === "text")?.text;
    return [
      ...(projectBrief ? [projectBrief] : []),
      "কাজ শুরুর আগে feature list, folder structure এবং কাজ শেষ হয়েছে কি না যাচাইয়ের checklist লিখে নাও।",
      "সব input-এর validation এবং অন্তত তিনটি ভুল/edge case পরীক্ষা করো।",
      "README-তে project চালানো, পরীক্ষা করা এবং ব্যবহার করার নিয়ম লিখে রাখো।",
    ].slice(0, 4);
  }
  if (specific.length) return specific.slice(0, 4);
  const cleanTitle = lessonTitle.replace(/^[0-9০-৯]+(?:\.[0-9০-৯]+)?\s*/, "");
  return [
    `“${cleanTitle}” বিষয়টি নিজের ভাষায় এমনভাবে বোঝাও, যেন তোমার কোনো বন্ধু প্রথমবার শুনছে।`,
    `এই ধারণাটি ব্যবহার করে নিজের একটি ছোট উদাহরণ তৈরি করো। code থাকলে নিজে টাইপ করে চালাও।`,
    "একটি value, condition বা ধাপ পরিবর্তন করো। কী বদলেছে এবং কেন বদলেছে—নিজের ভাষায় লিখে রাখো।",
  ];
}

export default async function CourseLessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson: lessonSlug } = await params;
  const result = getCourseLesson(slug, lessonSlug);
  if (!result) notFound();
  const { chapter, lesson } = result;
  const lessonIndex = chapter.lessons.findIndex((item) => item.slug === lesson.slug);
  const chapterIndex = courseChapters.findIndex((item) => item.slug === chapter.slug);
  const previous = lessonIndex > 0 ? chapter.lessons[lessonIndex - 1] : courseChapters[chapterIndex - 1]?.lessons.at(-1);
  const next = lessonIndex < chapter.lessons.length - 1 ? chapter.lessons[lessonIndex + 1] : courseChapters[chapterIndex + 1]?.lessons[0];
  const previousChapter = lessonIndex === 0 ? courseChapters[chapterIndex - 1] : undefined;
  const nextChapter = lessonIndex === chapter.lessons.length - 1 ? courseChapters[chapterIndex + 1] : undefined;
  const practiceAvailable = ["html", "css", "javascript"].includes(chapter.slug);
  const htmlTeaching = chapter.slug === "html" ? getHtmlTeaching(lesson.slug) : undefined;
  const codeBlocks = lesson.blocks.filter((block) => block.type === "code").map((block) => block.text);
  const tryItFiles = htmlTeaching
    ? { html: htmlTeaching.tryItHtml, css: "", js: "" }
    : buildTryItFiles(chapter.slug, codeBlocks);
  const reviewQuestions = getLessonReviewQuestions(chapter.slug, lesson.number, lesson.title, 2);
  const tasks = buildTasks(lesson.title, lesson.blocks);
  const lessonId = `${chapter.slug}:${lesson.slug}`;
  const cleanChapterTitle = stripChapterPrefix(chapter.title);

  return (
    <>
      <section className="lesson-hero tutorial-lesson-hero">
        <div className="shell">
          <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/courses/">সব কোর্স</Link><span>/</span><Link href={`/courses/${chapter.slug}/`}>{cleanChapterTitle}</Link><span>/</span><span>পাঠ {toBengaliNumber(lesson.number)}</span></div>
          <span className="section-kicker">{cleanChapterTitle} · একদম শুরু থেকে</span>
          <h1>{stripLessonPrefix(lesson.title)}</h1>
          <p>{chapter.description}</p>
          <div className="lesson-hero-meta"><span><Mark name="book" size={15} /> পাঠ {toBengaliNumber(lesson.number)} / {toBengaliNumber(chapter.lessons.length)}</span><span><Mark name="clock" size={15} /> নিজের গতিতে শেখো</span><span><Mark name="check" size={15} /> account লাগবে না</span></div>
        </div>
      </section>

      <section className="section lesson-content-section tutorial-content-section">
        <div className="shell tutorial-layout">
          <CourseSidebar activeChapter={chapter.slug} activeLesson={lesson.slug} />
          <main className="lesson-main tutorial-lesson-main">
            {htmlTeaching ? (
              <>
                <div className="tutorial-start-card"><div className="tutorial-start-icon"><Mark name="book" size={20} /></div><div><strong>একদম নতুন শিক্ষার্থীর জন্য</strong><p>এই পাঠে আগে সহজ ভাষায় ধারণা বোঝানো হবে, তারপর code ও browser output দেখানো হবে। শেষে নিজে code বদলে কাজটি অনুশীলন করবে।</p></div></div>
                <div className="lesson-reading-note"><Mark name="info" size={18} /><p>শিক্ষকের পরামর্শ: code কপি করার আগে নিজে টাইপ করো। Run করার আগে কী output আসবে অনুমান করো। ভুল হলে একটি করে line পরীক্ষা করো।</p></div>
                <HtmlLessonGuide teaching={htmlTeaching} originalNotes={lesson.blocks} lessonSlug={lesson.slug} />
              </>
            ) : (
              <>
                <div className="tutorial-start-card"><div className="tutorial-start-icon"><Mark name="book" size={20} /></div><div><strong>এই পাঠে কী শিখবে?</strong><p>প্রথমে ধারণাটি বোঝো, তারপর উদাহরণ দেখো। পাঠ শেষে নিজে একটি ছোট কাজ করে শেখা যাচাই করো। কোনো ধাপ না বুঝলে আবার পড়ে নিতে পারো।</p></div></div>
                <div className="lesson-reading-note"><Mark name="info" size={18} /><p>শিক্ষকের পরামর্শ: code কপি করার আগে নিজে টাইপ করো। চালানোর আগে output কেমন হবে অনুমান করো। ভুল হলে error message পড়ে কারণ খুঁজে বের করো—এভাবেই programming শেখা হয়।</p></div>
                <div className="tutorial-content-heading"><span className="section-kicker">পাঠের ব্যাখ্যা</span><h2>চলো, ধাপে ধাপে বুঝে নিই।</h2></div>
                <div className="tutorial-article-content">
                  {lesson.blocks.map((block, index) => {
                    if (block.type === "code") return <div className="lesson-code-block tutorial-code-block" key={index}><div className="lesson-code-head"><span><i /> উদাহরণ {toBengaliNumber(index + 1)}</span><div className="lesson-code-actions"><span className="lesson-code-language">{codeLanguageLabel(chapter.slug)}</span><CopyCodeButton code={block.text} /></div></div><pre><code>{block.text}</code></pre></div>;
                    if (block.type === "note") return <aside className="lesson-note-block tutorial-note-block" key={index}><span><Mark name="lightbulb" size={18} /></span><p>{linkify(block.text)}</p></aside>;
                    return <p className="lesson-text-block tutorial-text-block" key={index}>{linkify(block.text)}</p>;
                  })}
                </div>
                <section className="lesson-teacher-steps tutorial-teacher-steps"><span className="section-kicker">শিক্ষকের শেখার পদ্ধতি</span><h2>এবার এই চারটি ধাপ অনুসরণ করো।</h2><ol>{[
                  "পাঠটি একবার ধীরে পড়ো এবং নতুন শব্দগুলোর অর্থ বোঝো।",
                  "দেওয়া উদাহরণটি নিজে লিখে চালাও; output আগে অনুমান করো।",
                  "নিজের মতো করে একটি অংশ বদলাও এবং ফলাফল পর্যবেক্ষণ করো।",
                  "বই বা code না দেখে বন্ধুকে বিষয়টি বোঝানোর চেষ্টা করো।",
                ].map((step, index) => <li key={index}><b>{toBengaliNumber(index + 1)}</b><span>{step}</span></li>)}</ol></section>
              </>
            )}

            {practiceAvailable && <LessonTryIt initialFiles={tryItFiles} lessonTitle={lesson.title} />}

            <LessonActivities lessonId={lessonId} tasks={tasks} questions={reviewQuestions} />
            <LessonSelfCheck lessonId={lessonId} />

            {practiceAvailable ? <div className="lesson-practice-cta"><div><span className="section-kicker">আরও practice</span><h3>নিজের mini project তৈরি করো।</h3><p>Code Practice-এ গিয়ে HTML, CSS ও JavaScript একসঙ্গে ব্যবহার করে নতুন কিছু বানাও।</p></div><Link href="/practice/" className="button button-primary">Code Practice খোলো <Mark name="arrow" size={17} /></Link></div> : <div className="lesson-runtime-note"><Mark name="terminal" size={18} /><div><strong>নিজের কম্পিউটারে code চালাও</strong><p>এই ভাষার code চালাতে সংশ্লিষ্ট compiler, interpreter বা runtime প্রয়োজন। এই browser preview শুধু HTML, CSS ও JavaScript চালায়। তোমার পাঠের code copy করে উপযুক্ত development environment-এ পরীক্ষা করো।</p></div></div>}

            <div className="lesson-finish-card"><div><span className="section-kicker">অগ্রগতি সংরক্ষণ</span><h2>এই পাঠটি শেষ করেছ?</h2><p>সম্পন্ন হিসেবে চিহ্নিত করলে অগ্রগতি এই browser-এ save থাকবে।</p></div><LessonProgress lessonId={lessonId} /></div>
            <div className="lesson-next-nav"><Link href={previous ? `/courses/${previousChapter?.slug ?? chapter.slug}/${previous.slug}/` : `/courses/${chapter.slug}/`}><span>← আগের পাঠ</span><strong>{previous?.title ?? "অধ্যায়ের পরিচিতি"}</strong></Link><Link href={next ? `/courses/${nextChapter?.slug ?? chapter.slug}/${next.slug}/` : `/courses/${chapter.slug}/`} className="next"><span>পরের পাঠ →</span><strong>{next?.title ?? "অধ্যায় শেষ · সব পাঠ দেখো"}</strong></Link></div>
          </main>
          <aside className="tutorial-right-rail">
            <div className="tutorial-right-card tutorial-goal-card"><span className="section-kicker">আজকের লক্ষ্য</span><h3>বুঝে শেখো, মুখস্থ নয়।</h3><ul><li>ধারণাটি নিজের ভাষায় বোঝাও</li><li>উদাহরণ দেখে নিজে লিখো</li><li>একটি ছোট সমস্যা সমাধান করো</li></ul></div>
            <div className="tutorial-right-card"><span className="section-kicker">এই অধ্যায়</span><h3>{cleanChapterTitle}</h3><p>এই অধ্যায়ে মোট {toBengaliNumber(chapter.lessons.length)}টি পাঠ আছে। নিজের সুবিধামতো একটির পর একটি শেষ করো।</p><Link href={`/courses/${chapter.slug}/`}>সব পাঠের তালিকা <Mark name="arrow" size={14} /></Link></div>
            <div className="tutorial-right-card tutorial-help-card"><Mark name="lightbulb" size={20} /><strong>কোথাও আটকে গেলে?</strong><p>একই উদাহরণ ছোট করে লেখো, একবারে একটি পরিবর্তন করো এবং error message পড়ো। সাহায্য চাওয়ার আগে কী চেষ্টা করেছ লিখে রাখো।</p></div>
          </aside>
        </div>
      </section>
    </>
  );
}
