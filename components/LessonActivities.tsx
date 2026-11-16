"use client";

import { useEffect, useState } from "react";

type ReviewQuestion = { number: number; question: string; answer: string };

export function LessonActivities({ lessonId, tasks, questions }: { lessonId: string; tasks: string[]; questions: ReviewQuestion[] }) {
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  const storageKey = `codeatlas-practice-note-v1:${lessonId}`;

  useEffect(() => {
    try { setAnswer(localStorage.getItem(storageKey) ?? ""); } catch { /* Optional local save. */ }
  }, [storageKey]);

  function saveAnswer() {
    try { localStorage.setItem(storageKey, answer); setSaved(true); window.setTimeout(() => setSaved(false), 1800); } catch { setSaved(false); }
  }

  function toggleAnswer(index: number) {
    setRevealed((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return (
    <div className="lesson-activities">
      <section className="lesson-exercise-card" aria-labelledby="lesson-exercise-title">
        <span className="section-kicker">অনুশীলন</span>
        <h2 id="lesson-exercise-title">এবার নিজে করে দেখো</h2>
        <p className="lesson-activity-intro">শুধু পড়লেই শেখা সম্পূর্ণ হয় না। নিচের কাজগুলো নিজের মতো করে করো। ভুল হলে আবার চেষ্টা করো।</p>
        <ol className="lesson-exercise-list">{tasks.map((task, index) => <li key={index}><b>{toBn(index + 1)}</b><span>{task}</span></li>)}</ol>
        <label className="lesson-answer-label" htmlFor="lesson-answer">তোমার উত্তর / code / শেখার নোট</label>
        <textarea id="lesson-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setSaved(false); }} placeholder="এখানে নিজের উত্তর বা code লিখে রাখো…" rows={5} />
        <div className="lesson-answer-actions"><small>তোমার লেখা এই browser-এ থাকবে।</small><button type="button" onClick={saveAnswer}> {saved ? "✓ সংরক্ষিত" : "উত্তর সংরক্ষণ"}</button></div>
      </section>
      {questions.length > 0 && <section className="lesson-qa-card" aria-labelledby="lesson-qa-title"><span className="section-kicker">দ্রুত যাচাই</span><h2 id="lesson-qa-title">নিজেকে প্রশ্ন করো</h2><p className="lesson-activity-intro">আগে উত্তরটা মনে মনে বলো। তারপর উত্তর দেখিয়ে নিজের বোঝা মিলিয়ে নাও।</p><div className="lesson-qa-list">{questions.map((item, index) => <article className="lesson-qa-item" key={`${item.number}-${index}`}><div><span>প্রশ্ন {toBn(item.number)}</span><strong>{item.question}</strong></div><button type="button" onClick={() => toggleAnswer(index)}>{revealed.includes(index) ? "উত্তর লুকাও" : "উত্তর দেখো"}</button>{revealed.includes(index) && <p>{item.answer}</p>}</article>)}</div></section>}
    </div>
  );
}

function toBn(value: number) { return String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]); }
