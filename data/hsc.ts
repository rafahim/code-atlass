import source from "./hsc-source.json";
import exam from "./hsc-exam.json";
import mcqSource from "./hsc-mcqs.json";

type RawLesson = { chapter: number; number: number; slug: string; title: string; content: string };
type RawMcq = { chapter: number; number: number; question: string; options: { label: string; text: string }[]; answer: string };
type RawPractical = { number: number; group: string; title: string; steps: string[] };
type RawPlan = { day: number; topic: string; task: string };
type RawResource = { title: string; pages: string };

const lessons = (source as { lessons: RawLesson[] }).lessons;
const chapterDetails = [
  {
    number: 4,
    slug: "chapter-4",
    title: "ওয়েব ডিজাইন পরিচিতি ও HTML",
    shortTitle: "ওয়েব ডিজাইন ও HTML",
    description: "ইন্টারনেট, WWW, ওয়েবসাইটের কাঠামো, HTML, CSS, Form এবং ওয়েবসাইট প্রকাশনা।",
    outcome: "একটি পূর্ণ HTML পেজ তৈরি করতে এবং ওয়েবসাইট প্রকাশের ধাপ ব্যাখ্যা করতে পারবে।",
    pages: "৩–১১",
    topics: ["Internet ও WWW", "Domain, DNS ও Hosting", "Website structure ও Wireframe", "HTML Tag, Element ও Attribute", "Link, Image, List ও Table", "CSS, Semantic HTML ও Form", "Website Publishing"],
  },
  {
    number: 5,
    slug: "chapter-5",
    title: "প্রোগ্রামিং ভাষা",
    shortTitle: "প্রোগ্রামিং ভাষা",
    description: "Computer Organization, Programming Language Generation, Translator, Algorithm, Flowchart ও C Programming।",
    outcome: "সমস্যা বিশ্লেষণ করে Algorithm, Flowchart এবং C Program লিখতে পারবে।",
    pages: "১২–২০",
    topics: ["Computer Organization ও CPU", "Programming Language Generation", "Assembler, Compiler ও Interpreter", "Algorithm, Flowchart ও Pseudocode", "Program Design ও Debugging", "C Program Structure", "Data Type, Variable ও Operator", "Condition ও Loop", "Array, Function ও Library Function"],
  },
  {
    number: 6,
    slug: "chapter-6",
    title: "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
    shortTitle: "ডেটাবেজ ও DBMS",
    description: "Database, Table, Field, Record, Key, Relationship, SQL, SQLite, Sorting, Indexing ও Data Security।",
    outcome: "সম্পর্কযুক্ত টেবিল তৈরি, SQL দিয়ে CRUD এবং Data Security-এর ধারণা প্রয়োগ করতে পারবে।",
    pages: "২১–২৮",
    topics: ["Data, Information ও Database", "Table, Field, Record ও Data Type", "DBMS-এর কাজ ও সুবিধা", "Primary, Composite ও Foreign Key", "Relationship ও ERD", "SQL ও Command Classification", "SQLite", "Sorting, Searching ও Indexing", "Data Security, Encryption ও Backup"],
  },
];

export const hscChapters = chapterDetails.map((chapter) => ({
  ...chapter,
  lessons: lessons.filter((lesson) => lesson.chapter === chapter.number).sort((a, b) => a.number - b.number),
}));

export const hscLessons = lessons;
export const hscMcqs = (mcqSource as RawMcq[]).map((item) => ({ ...item, id: `ch${item.chapter}-${item.number}` }));
export const hscModelTest = (exam as { modelTest: RawMcq[] }).modelTest.map((item) => ({ ...item, id: `model-${item.number}` }));
export const hscStudyPlan = (exam as { studyPlan: RawPlan[] }).studyPlan;
export const hscPracticals = (exam as { practicals: RawPractical[] }).practicals;
export const hscResources = (exam as { resources: RawResource[] }).resources;

export const hscScopeNote = "এই প্রস্তুতি-সেকশনটি তোমার দেওয়া HSC_Preparation_Bangla.pdf-এর ICT ৪র্থ, ৫ম ও ৬ষ্ঠ অধ্যায়কে ভিত্তি করে সাজানো। এটি পুরো HSC ICT বই বা সব বিষয়ের পূর্ণ সিলেবাস নয়। বোর্ড, শিক্ষাবর্ষ ও কলেজভেদে সিলেবাস, প্রশ্নের ধরন এবং নম্বর বণ্টন বদলাতে পারে; পরীক্ষার আগে শিক্ষা বোর্ড/NCTB-এর সর্বশেষ নির্দেশনা ও নিজের কলেজের সিলেবাস মিলিয়ে নেবে।";

export function getHscChapter(slug: string) {
  return hscChapters.find((chapter) => chapter.slug === slug);
}

export function getHscLesson(chapterSlug: string, lessonSlug: string) {
  const chapter = getHscChapter(chapterSlug);
  const lesson = chapter?.lessons.find((item) => item.slug === lessonSlug);
  return chapter && lesson ? { chapter, lesson } : undefined;
}

export function bnNumber(value: number | string) {
  return String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

export function hscPdfPage(page: number) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}/downloads/HSC_Preparation_Bangla.pdf#page=${page}`;
}
