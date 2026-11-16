"use client";

import { useMemo, useState } from "react";
import type { TutorialLesson } from "@/data/language-tutorials";

function bn(value: number) { return String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]); }

export function TutorialQuizBoard({ lessons, courseName }: { lessons: TutorialLesson[]; courseName: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => lessons.reduce((sum, lesson) => sum + (answers[lesson.slug] === lesson.quiz.answer ? 1 : 0), 0), [answers, lessons]);
  const answered = Object.keys(answers).length;
  return <div className="atlas-quiz-board">
    <div className="atlas-quiz-progress"><div><strong>{bn(answered)} / {bn(lessons.length)}টি প্রশ্নের উত্তর</strong><span>{submitted ? `ফলাফল: ${bn(score)} / ${bn(lessons.length)}` : "সব প্রশ্নের উত্তর দিয়ে ফলাফল দেখো"}</span></div><div className="atlas-quiz-track"><i style={{ width: `${lessons.length ? answered / lessons.length * 100 : 0}%` }} /></div></div>
    {lessons.map((lesson, index) => <article className="atlas-quiz-question" key={lesson.slug}>
      <div className="atlas-quiz-question-kicker">প্রশ্ন {bn(index + 1)} · {lesson.title}</div>
      <h2>{lesson.quiz.question}</h2>
      <div className="atlas-quiz-options">
        {lesson.quiz.options.map((option, optionIndex) => {
          const chosen = answers[lesson.slug] === optionIndex;
          const correct = optionIndex === lesson.quiz.answer;
          const state = submitted && correct ? "correct" : submitted && chosen ? "wrong" : chosen ? "selected" : "";
          return <label className={state} key={`${lesson.slug}-${optionIndex}`}>
            <input type="radio" name={lesson.slug} checked={chosen} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [lesson.slug]: optionIndex }))} />
            <span className="atlas-option-letter">{["ক", "খ", "গ", "ঘ"][optionIndex]}.</span>{option}
          </label>;
        })}
      </div>
      {submitted && <div className={`atlas-quiz-explanation ${answers[lesson.slug] === lesson.quiz.answer ? "good" : "needs-work"}`}><strong>{answers[lesson.slug] === lesson.quiz.answer ? "সঠিক উত্তর!" : `সঠিক উত্তর: ${lesson.quiz.options[lesson.quiz.answer]}`}</strong><p>{lesson.quiz.explanation}</p></div>}
    </article>)}
    <div className="atlas-quiz-submit"><div><strong>{submitted ? `তোমার ফল ${bn(score)} / ${bn(lessons.length)}` : `${courseName} কুইজ`}</strong><small>{submitted ? "ভুল উত্তরগুলো আবার পড়ো, তারপর নতুন করে পরীক্ষা দাও।" : "উত্তর জমা দেওয়ার আগে প্রতিটি প্রশ্ন একবার দেখে নাও।"}</small></div><button type="button" disabled={!submitted && answered !== lessons.length} onClick={() => { if (submitted) { setAnswers({}); setSubmitted(false); } else setSubmitted(true); }}>{submitted ? "আবার পরীক্ষা দাও" : "উত্তর যাচাই করো"}</button></div>
  </div>;
}
