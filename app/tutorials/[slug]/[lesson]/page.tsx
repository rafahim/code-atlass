import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorialCourse, getTutorialLesson, allTutorialLessonParams } from "@/data/language-tutorials";
import { languages } from "@/data/languages";
import { getCourseLesson, courseChapters } from "@/data/curriculum";
import { getHtmlTeaching } from "@/data/html-teaching";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { TutorialCodeExample } from "@/components/TutorialCodeExample";
import { HtmlLessonGuide } from "@/components/HtmlLessonGuide";
import { LessonTryIt } from "@/components/LessonTryIt";
import { LanguageCodePlayground } from "@/components/LanguageCodePlayground";
import { LessonActivities } from "@/components/LessonActivities";
import { LessonProgress } from "@/components/LessonProgress";
import { Mark } from "@/components/Mark";

export const dynamicParams = false;
export function generateStaticParams() { return allTutorialLessonParams; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lesson: string }> }): Promise<Metadata> {
  const { slug, lesson } = await params;
  const result = getTutorialLesson(slug, lesson);
  return result ? { title: `${result.lesson.title} — ${result.course.name} Tutorial`, description: result.lesson.summary } : { title: "পাঠ পাওয়া যায়নি" };
}

function toBn(value: number) { return String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]); }
function buildTryIt(slug: string, title: string, code: string) {
  if (slug === "html") return { html: code || "<!doctype html>\n<html lang=\"bn\">\n<body>\n  <h1>আমার প্রথম পেজ</h1>\n  <p>আমি HTML শিখছি।</p>\n</body>\n</html>", css: "", js: "" };
  if (slug === "css") return { html: "<main><h1>আমার CSS পেজ</h1><p>এই লেখার রং ও আকার বদলাও।</p><button>একটি Button</button></main>", css: code || "body { font-family: sans-serif; }\nh1 { color: rebeccapurple; }", js: "" };
  return { html: "<main><h1>JavaScript অনুশীলন</h1><p id=\"message\">এখানে ফলাফল দেখা যাবে।</p><button id=\"run\">আমাকে চাপো</button></main>", css: "body { font-family: sans-serif; padding: 24px; } button { padding: 10px 16px; }", js: code || "document.querySelector('#run').addEventListener('click', () => {\n  document.querySelector('#message').textContent = 'দারুণ! JavaScript কাজ করছে।';\n  console.log('বাটনে চাপ দেওয়া হয়েছে');\n});" };
}

export default async function TutorialLessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson: lessonSlug } = await params;
  const result = getTutorialLesson(slug, lessonSlug);
  if (!result) notFound();
  const { course, lesson } = result;
  const index = course.lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = index > 0 ? course.lessons[index - 1] : undefined;
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : undefined;
  const htmlSource = slug === "html" ? getCourseLesson("html", lesson.slug) : undefined;
  const htmlTeaching = slug === "html" ? getHtmlTeaching(lesson.slug) : undefined;
  const codeBlocks = lesson.sections.map((section) => section.code).filter((code): code is string => Boolean(code));
  const tasks = lesson.exercises;
  const browserRunnable = ["html", "css", "javascript"].includes(slug);
  const languageInfo = languages.find((item) => item.slug === slug);
  const starterCode = codeBlocks[0] ?? languageInfo?.firstSnippet ?? "// এখানে নিজের code লেখো";
  const tryIt = buildTryIt(slug, lesson.title, starterCode);
  const lessonId = `${slug}:${lesson.slug}`;
  return <>
    <section className="atlas-lesson-hero"><div className="shell">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/tutorials/">পাঠসমূহ</Link><span>/</span><Link href={`/tutorials/${slug}/`}>{course.name}</Link><span>/</span><span>পাঠ {toBn(lesson.number)}</span></div>
      <span className="section-kicker">{course.name} · পাঠ {toBn(lesson.number)} / {toBn(course.lessons.length)}</span>
      <h1>{lesson.title}</h1><p>{lesson.summary}</p>
      <div className="atlas-lesson-meta"><span><Mark name="book" size={15}/> একদম শুরু থেকে</span><span><Mark name="clock" size={15}/> নিজের গতিতে</span><span><Mark name="check" size={15}/> অ্যাকাউন্ট লাগবে না</span></div>
    </div></section>
    <section className="section atlas-tutorial-main-section atlas-lesson-section"><div className="shell atlas-tutorial-grid-layout">
      <TutorialSidebar course={course} activeLesson={lesson.slug}/>
      <main className="atlas-tutorial-main atlas-lesson-main">
        <div className="atlas-intro-note"><Mark name="lightbulb" size={20}/><div><strong>শিক্ষকের পরামর্শ</strong><p>প্রথমে ব্যাখ্যা পড়ো, তারপর উদাহরণ নিজে টাইপ করো। চালানোর আগে ফলাফল অনুমান করো। ভুল হলে ত্রুটির বার্তা পড়ে কারণ খুঁজে বের করো।</p></div></div>
        {htmlTeaching && htmlSource ? <HtmlLessonGuide teaching={htmlTeaching} originalNotes={htmlSource.lesson.blocks} lessonSlug={lesson.slug}/> : <>
          <div className="atlas-lesson-outcomes"><span className="section-kicker">এই পাঠ শেষে তুমি পারবে</span><ul><li>মূল ধারণাটি নিজের ভাষায় ব্যাখ্যা করতে</li><li>দেওয়া code example পড়ে বুঝতে</li><li>নিজের একটি ছোট উদাহরণ তৈরি ও পরীক্ষা করতে</li></ul></div>
          {lesson.sections.map((section, sectionIndex) => <section className="atlas-lesson-content-block" key={`${lesson.slug}-${sectionIndex}`}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            {section.code && <TutorialCodeExample title={`উদাহরণ ${toBn(sectionIndex + 1)}`} code={section.code} output={section.output} language={course.name}/>}
            {section.lineNotes && <div className="atlas-line-notes"><strong>কোডটি ভেঙে বুঝি</strong><ol>{section.lineNotes.map((note, noteIndex) => <li key={noteIndex}>{note}</li>)}</ol></div>}
            {section.note && <aside className="atlas-teacher-tip"><Mark name="info" size={17}/><p>{section.note}</p></aside>}
          </section>)}
          {lesson.sections.length > 0 && <div className="atlas-common-mistakes"><span className="section-kicker">যে ভুলগুলো এড়াবে</span><h2>সাধারণ ভুল ও সমাধান</h2><ul>{["কোড না বুঝে কপি করে বসানো।", "ফলাফল আগে অনুমান না করা।", "ইনপুট যাচাই ও বিশেষ পরিস্থিতি পরীক্ষা করতে ভুলে যাওয়া।", "ত্রুটির বার্তা না পড়ে বারবার একই কোড চালানো।"].map((item) => <li key={item}>{item}</li>)}</ul></div>}
        </>}
        {browserRunnable && <LessonTryIt initialFiles={tryIt} lessonTitle={lesson.title}/>}
        {!browserRunnable && <LanguageCodePlayground language={course.name} slug={slug} lessonTitle={lesson.title} lessonSlug={lesson.slug} starterCode={starterCode} setup={course.setup}/>}
        <LessonActivities lessonId={`tutorial:${lessonId}`} tasks={tasks} questions={[{ number: lesson.number, question: lesson.quiz.question, answer: `${lesson.quiz.options[lesson.quiz.answer]} — ${lesson.quiz.explanation}` }]}/>
        <div className="atlas-lesson-quiz-mini"><span className="section-kicker">পাঠ শেষে যাচাই</span><h2>{lesson.quiz.question}</h2><p>এই পাঠের quiz ও ব্যাখ্যা আলাদা পাতায় পাওয়া যাবে।</p><Link href={`/tutorials/${slug}/quiz/`}>{course.name} কুইজ দাও ↗</Link></div>
        <div className="atlas-progress-card"><div><span className="section-kicker">অগ্রগতি সংরক্ষণ</span><h2>এই পাঠ শেষ করেছ?</h2><p>সম্পন্ন হিসেবে চিহ্নিত করলে এই ব্রাউজারে অগ্রগতি থাকবে।</p></div><LessonProgress lessonId={`tutorial:${lessonId}`}/></div>
        <div className="atlas-lesson-pagination"><Link href={previous ? `/tutorials/${slug}/${previous.slug}/` : `/tutorials/${slug}/`}><span>← আগের পাঠ</span><strong>{previous?.title ?? "কোর্স পরিচিতি"}</strong></Link><Link className="next" href={next ? `/tutorials/${slug}/${next.slug}/` : `/tutorials/${slug}/examples/`}><span>পরের পাঠ →</span><strong>{next?.title ?? "উদাহরণ দেখো"}</strong></Link></div>
      </main>
      <aside className="atlas-tutorial-right-rail"><div className="atlas-rail-card"><span className="section-kicker">এই পাঠের লক্ষ্য</span><h3>বোঝার পর প্রয়োগ করো</h3><ol><li>সংজ্ঞা নিজের ভাষায় বলো।</li><li>কোডের প্রতিটি লাইন বুঝে নাও。</li><li>নিজের input দিয়ে পরীক্ষা করো।</li></ol></div><div className="atlas-rail-card"><span className="section-kicker">আরও শেখো</span><h3>{course.name} সহায়িকা</h3><Link href={`/tutorials/${slug}/examples/`}>উদাহরণ ↗</Link><Link href={`/tutorials/${slug}/exercises/`}>অনুশীলন ↗</Link><Link href={`/tutorials/${slug}/reference/`}>রেফারেন্স ↗</Link></div></aside>
    </div></section>
  </>;
}
