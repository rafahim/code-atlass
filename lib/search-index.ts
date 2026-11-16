import { languages } from "@/data/languages";
import { tutorialCourses } from "@/data/language-tutorials";
import { courseChapters, stripChapterPrefix, stripLessonPrefix } from "@/data/curriculum";

/** k: language | tutorial | lesson | course | page */
export type SearchItem = { t: string; u: string; k: "language" | "tutorial" | "lesson" | "course" | "page"; p?: string; s?: string };

const clip = (text: string, max = 90) => {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
};

const pages: SearchItem[] = [
  { t: "সব প্রোগ্রামিং পাঠ", u: "/tutorials/", k: "page", s: "tutorials পাঠ সব ভাষা" },
  { t: "সম্পূর্ণ বাংলা কোর্স", u: "/courses/", k: "page", s: "courses কোর্স" },
  { t: "সব Language", u: "/languages/", k: "page", s: "languages ভাষা" },
  { t: "কোড প্র্যাকটিস", u: "/practice/", k: "page", s: "practice code editor run" },
  { t: "আমাদের সম্পর্কে", u: "/about/", k: "page", s: "about" },
  { t: "ডেভেলপার", u: "/ra-fahim/", k: "page", s: "developer ra-fahim RA Fahim" },
];

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [...pages];

  for (const language of languages) {
    items.push({ t: language.name, u: `/languages/${language.slug}/`, k: "language", p: language.category, s: clip(language.description) });
  }

  for (const course of tutorialCourses) {
    items.push({ t: `${course.name} Tutorial`, u: `/tutorials/${course.slug}/`, k: "tutorial", p: course.category, s: clip(course.description) });
    for (const lesson of course.lessons) {
      items.push({ t: lesson.title, u: `/tutorials/${course.slug}/${lesson.slug}/`, k: "lesson", p: course.name });
    }
  }

  for (const chapter of courseChapters) {
    const chapterTitle = stripChapterPrefix(chapter.title);
    items.push({ t: chapterTitle, u: `/courses/${chapter.slug}/`, k: "course", p: "কোর্স অধ্যায়", s: clip(chapter.description) });
    for (const lesson of chapter.lessons) {
      items.push({ t: stripLessonPrefix(lesson.title), u: `/courses/${chapter.slug}/${lesson.slug}/`, k: "course", p: chapterTitle });
    }
  }

  return items;
}
