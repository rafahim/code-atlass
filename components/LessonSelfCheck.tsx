"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  "আমি এই পাঠের মূল ধারণাটি নিজের ভাষায় বুঝিয়ে বলতে পারি।",
  "উদাহরণ বা command না দেখে নিজে লিখে চালাতে পারি।",
  "একটি মান বা নিয়ম বদলে ফলাফল কেন বদলেছে তা ব্যাখ্যা করতে পারি।",
];

const STORAGE_KEY = "codeatlas-lesson-self-check-v1";

export function LessonSelfCheck({ lessonId }: { lessonId: string }) {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}:${lessonId}`);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setChecked(ITEMS.map((_, index) => parsed[index] === true));
      }
    } catch {
      // The self-check remains available even when local storage is disabled.
    }
  }, [lessonId]);

  function toggle(index: number) {
    setChecked((current) => {
      const updated = current.map((value, itemIndex) => itemIndex === index ? !value : value);
      try {
        localStorage.setItem(`${STORAGE_KEY}:${lessonId}`, JSON.stringify(updated));
      } catch {
        // Persistence is optional; keep the current in-memory state.
      }
      return updated;
    });
  }

  const completed = checked.filter(Boolean).length;

  return (
    <section className="lesson-self-check" aria-labelledby="lesson-self-check-title">
      <div className="lesson-self-check-heading">
        <div>
          <span className="section-kicker">নিজে যাচাই করো</span>
          <h2 id="lesson-self-check-title">এবার কি তুমি নিজে করতে পারবে?</h2>
          <p>শুধু পড়ে শেষ কোরো না। যেটা সত্যিই পারো, সেটিতেই টিক দাও। পরে আবার এসে পরিবর্তন করতে পারবে।</p>
        </div>
        <strong>{completed}/৩</strong>
      </div>
      <div className="lesson-self-check-track"><span style={{ width: `${(completed / ITEMS.length) * 100}%` }} /></div>
      <div className="lesson-self-check-items">
        {ITEMS.map((item, index) => (
          <label className={checked[index] ? "is-checked" : ""} key={item}>
            <input type="checkbox" checked={checked[index]} onChange={() => toggle(index)} />
            <span className="lesson-self-check-box" aria-hidden="true">{checked[index] ? "✓" : ""}</span>
            <span>{item}</span>
          </label>
        ))}
      </div>
      <p className="lesson-self-check-footnote">এই যাচাইয়ের অগ্রগতি শুধু এই browser-এ save হয়—কোনো account লাগে না।</p>
    </section>
  );
}
