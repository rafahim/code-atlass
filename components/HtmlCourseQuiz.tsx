"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = { id: string; title: string; href: string; question: string; options: string[]; answer: number; explanation: string };
const bn = (value:number) => String(value).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export function HtmlCourseQuiz({ items }: { items: Item[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => items.reduce((sum, item) => sum + (answers[item.id] === item.answer ? 1 : 0), 0), [answers, items]);
  return <div className="html-quiz-page-content">
    <div className="html-quiz-summary"><div><strong>{bn(items.length)}টি প্রশ্ন</strong><span>সব HTML পাঠ থেকে</span></div><div><strong>{bn(Object.keys(answers).length)} / {bn(items.length)}</strong><span>উত্তর দেওয়া হয়েছে</span></div>{submitted && <div><strong>{bn(score)} / {bn(items.length)}</strong><span>সঠিক উত্তর</span></div>}</div>
    <div className="html-quiz-list">{items.map((item, index) => {
      const chosen = answers[item.id];
      const correct = chosen === item.answer;
      return <article className="html-quiz-card" key={item.id}>
        <div className="html-quiz-card-top"><span>প্রশ্ন {bn(index + 1)}</span><Link href={item.href}>পাঠটি আবার পড়ো ↗</Link></div>
        <h2>{item.question}</h2>
        <div className="html-quiz-options">{item.options.map((option, optionIndex) => <label key={option} className={submitted && optionIndex === item.answer ? "correct" : submitted && chosen === optionIndex && !correct ? "wrong" : chosen === optionIndex ? "selected" : ""}><input type="radio" name={item.id} checked={chosen === optionIndex} disabled={submitted} onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: optionIndex }))}/><span>{String.fromCharCode(0x0995 + optionIndex)}.</span>{option}</label>)}</div>
        {submitted && <div className={`html-quiz-explanation ${correct ? "good" : "bad"}`}><strong>{correct ? "সঠিক উত্তর" : `সঠিক উত্তর: ${item.options[item.answer]}`}</strong><p>{item.explanation}</p></div>}
      </article>;
    })}</div>
    <div className="html-quiz-submit"><div><strong>{submitted ? `তোমার ফল: ${bn(score)} / ${bn(items.length)}` : "সব প্রশ্নের উত্তর দেওয়া হলে ফলাফল দেখো"}</strong><small>{submitted ? "ফলাফল ও ব্যাখ্যা দেখে ভুলগুলো আবার শিখে নাও।" : `সব ${bn(items.length)}টি প্রশ্নের উত্তর দিলে পরীক্ষা জমা দিতে পারবে।`}</small></div><button type="button" disabled={!submitted && Object.keys(answers).length < items.length} onClick={() => { if (submitted) { setAnswers({}); setSubmitted(false); } else setSubmitted(true); }}>{submitted ? "আবার পরীক্ষা দাও" : "উত্তর যাচাই করো"}</button></div>
  </div>;
}
