"use client";

import { useEffect, useState } from "react";

export type ExerciseItem = { id: string; lesson: string; task: string; level: string; href: string };

export function TutorialExerciseBoard({ exercises, courseName }: { exercises: ExerciseItem[]; courseName: string }) {
  const key = `codeatlas-tutorial-exercises-v1:${courseName.toLowerCase()}`;
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(key); setDone(raw ? JSON.parse(raw) : []); } catch { setDone([]); }
    setLoaded(true);
  }, [key]);
  function toggle(id: string) {
    setDone((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Keep this page usable without storage. */ }
      return next;
    });
  }
  const percentage = exercises.length ? Math.round(done.filter((id) => exercises.some((item) => item.id === id)).length / exercises.length * 100) : 0;
  return <div className="atlas-exercise-board">
    <div className="atlas-exercise-progress"><div><strong>{loaded ? `${done.filter((id) => exercises.some((item) => item.id === id)).length} / ${exercises.length}টি কাজ সম্পন্ন` : "অগ্রগতি পড়া হচ্ছে…"}</strong><span>এই ব্রাউজারে অগ্রগতি সংরক্ষিত থাকবে</span></div><div className="atlas-quiz-track"><i style={{ width: `${percentage}%` }} /></div></div>
    {exercises.map((item, index) => <article className={`atlas-exercise-item ${done.includes(item.id) ? "is-done" : ""}`} key={item.id}>
      <label><input type="checkbox" checked={done.includes(item.id)} onChange={() => toggle(item.id)} /><span className="atlas-exercise-check">{done.includes(item.id) ? "✓" : index + 1}</span><span className="atlas-exercise-copy"><small>{item.lesson} · {item.level}</small><strong>{item.task}</strong></span></label>
      <a href={item.href}>পাঠটি দেখো ↗</a>
    </article>)}
  </div>;
}
