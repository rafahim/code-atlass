import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { languages } from "@/data/languages";
import { courseChapters } from "@/data/curriculum";
import { tutorialCourses } from "@/data/language-tutorials";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  const core = [
    entry("/", 1, "weekly"),
    entry("/tutorials/", 0.9, "weekly"),
    entry("/courses/", 0.9, "weekly"),
    entry("/languages/", 0.9, "weekly"),
      entry("/practice/", 0.8, "monthly"),
    entry("/about/", 0.5, "yearly"),
    entry("/ra-fahim/", 0.5, "yearly"),
    entry("/privacy/", 0.3, "yearly"),
    entry("/terms/", 0.3, "yearly"),
  ];

  const languagePages = languages.map((language) => entry(`/languages/${language.slug}/`, 0.7));

  const tutorials = tutorialCourses.flatMap((course) => [
    entry(`/tutorials/${course.slug}/`, 0.8),
    ...["examples", "exercises", "quiz", "challenges", "reference"].map((part) => entry(`/tutorials/${course.slug}/${part}/`, 0.5)),
    ...course.lessons.map((lesson) => entry(`/tutorials/${course.slug}/${lesson.slug}/`, 0.6)),
  ]);

  const courses = courseChapters.flatMap((chapter) => [
    entry(`/courses/${chapter.slug}/`, 0.7),
    ...chapter.lessons.map((lesson) => entry(`/courses/${chapter.slug}/${lesson.slug}/`, 0.6)),
  ]);

  const htmlCourse = ["examples", "exercises", "quiz", "reference"].map((part) => entry(`/courses/html/${part}/`, 0.5));

  return [...core, ...languagePages, ...tutorials, ...courses, ...htmlCourse];
}
