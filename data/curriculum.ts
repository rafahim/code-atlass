import rawCurriculum from "./curriculum.json";
import reviewData from "./review-questions.json";

export type CourseBlock = {
  type: "text" | "code" | "note";
  text: string;
};

export type CourseLesson = {
  slug: string;
  number: number;
  title: string;
  blocks: CourseBlock[];
  teacherSteps: string[];
};

export type CourseChapter = {
  slug: string;
  number: number;
  title: string;
  description: string;
  intro: CourseBlock[];
  lessons: CourseLesson[];
};

type CurriculumData = {
  title: string;
  subtitle: string;
  edition: string;
  sourceNote: string;
  intro: CourseBlock[];
  howTo: CourseBlock[];
  chapters: CourseChapter[];
};

export const curriculum = rawCurriculum as unknown as CurriculumData;
export const courseChapters = curriculum.chapters;
export const totalLessons = courseChapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);

export function getCourseChapter(slug: string) {
  return courseChapters.find((chapter) => chapter.slug === slug);
}

export function getCourseLesson(chapterSlug: string, lessonSlug: string) {
  const chapter = getCourseChapter(chapterSlug);
  const lesson = chapter?.lessons.find((item) => item.slug === lessonSlug);
  return chapter && lesson ? { chapter, lesson } : undefined;
}

export function stripChapterPrefix(title: string) {
  return title.replace(/^অধ্যায়\s*[0-9০-৯]+\.\s*/, "");
}

export function stripLessonPrefix(title: string) {
  return title.replace(/^[0-9০-৯]+(?:\.[0-9০-৯]+)?\s*/, "");
}

export function toBengaliNumber(value: number | string) {
  return String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

export const languageChapterMap: Record<string, string> = {
  html: "html",
  css: "css",
  c: "c",
  cpp: "cpp",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  sql: "sql",
  sqlite: "sqlite",
};

export const extensionLanguageSlugs = ["java", "c-sharp", "php", "go", "rust", "bash", "powershell"];

type ReviewQuestion = { group: string; number: number; question: string; answer: string };
type ReviewData = { chapterMappings: Record<string, string[]>; questions: ReviewQuestion[] };
const reviewQuestions = reviewData as ReviewData;

export function getLessonReviewQuestions(chapterSlug: string, lessonNumber: number, lessonTitle: string, limit = 2) {
  const group = Object.entries(reviewQuestions.chapterMappings).find(([, chapters]) => chapters.includes(chapterSlug))?.[0];
  if (!group) return [];
  const questions = reviewQuestions.questions.filter((item) => item.group === group);
  if (!questions.length) return [];
  const stopWords = new Set(["html", "css", "javascript", "typescript", "python", "sqlite", "sql", "কী", "কেন", "ও", "এর", "এবং", "the", "for", "এ", "একটি"]);
  const tokens = (value: string) => (value.toLowerCase().match(/[a-z][a-z0-9+#.-]*|[\u0985-\u09B9\u09DC-\u09DF\u09F0-\u09FF]+/g) ?? []).filter((token) => token.length > 1 && !stopWords.has(token));
  const lessonTokens = [...new Set(tokens(lessonTitle))];
  const ranked = questions.map((item) => {
    const content = new Set(tokens(`${item.question} ${item.answer}`));
    const score = lessonTokens.reduce((sum, token) => sum + (content.has(token) ? 1 : 0), 0);
    return { item, score };
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score || a.item.number - b.item.number);
  if (!ranked.length) return [];
  const start = (lessonNumber - 1) % Math.max(1, ranked.length);
  const selected = ranked.slice(start, start + limit);
  if (selected.length < limit) selected.push(...ranked.slice(0, limit - selected.length));
  return selected.map(({ item }) => ({ number: item.number, question: item.question, answer: item.answer }));
}
