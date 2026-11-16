"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "codeatlas-completed-lessons-v1";
const CHANGE_EVENT = "codeatlas-progress-changed";

function readCompleted(): string[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function LessonProgress({ lessonId }: { lessonId: string }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(readCompleted().includes(lessonId));
  }, [lessonId]);

  function toggle() {
    const completed = readCompleted();
    const updated = complete ? completed.filter((item) => item !== lessonId) : [...completed, lessonId];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setComplete(!complete);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // Progress is optional. The lesson remains readable when storage is unavailable.
    }
  }

  return (
    <button type="button" className={`lesson-complete-button${complete ? " is-complete" : ""}`} onClick={toggle}>
      <span className="lesson-complete-check">{complete ? "✓" : ""}</span>
      {complete ? "এই পাঠ শেষ হয়েছে" : "এই পাঠ শেষ করেছি"}
    </button>
  );
}

export function ChapterProgress({ chapterSlug, total }: { chapterSlug: string; total: number }) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const update = () => {
      const prefix = `${chapterSlug}:`;
      setCompleted(readCompleted().filter((item) => item.startsWith(prefix)).length);
    };
    update();
    window.addEventListener(CHANGE_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CHANGE_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, [chapterSlug]);

  const percentage = total ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  return (
    <div className="chapter-progress" aria-label={`এই অধ্যায়ের ${completed}টি পাঠ সম্পন্ন`}>
      <div className="chapter-progress-label"><span>তোমার অগ্রগতি</span><strong>{completed}/{total} পাঠ</strong></div>
      <div className="chapter-progress-track"><span style={{ width: `${percentage}%` }} /></div>
    </div>
  );
}
