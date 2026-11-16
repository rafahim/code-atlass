"use client";

import { useMemo, useState } from "react";

type Option = { label: string; text: string };
type Question = { id: string; chapter: number; number: number; question: string; options: Option[]; answer: string };

const labels: Record<number, string> = { 4: "অধ্যায় ৪ · ওয়েব ডিজাইন ও HTML", 5: "অধ্যায় ৫ · প্রোগ্রামিং ভাষা", 6: "অধ্যায় ৬ · DBMS", 0: "মডেল টেস্টের MCQ অংশ" };
const toBn = (value: number) => String(value).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export function HscQuiz({ chapterQuestions, modelQuestions }: { chapterQuestions: Question[]; modelQuestions: Question[] }) {
  const [activeSet, setActiveSet] = useState("4");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const questions = useMemo(() => activeSet === "0" ? modelQuestions : chapterQuestions.filter((q) => q.chapter === Number(activeSet)), [activeSet, chapterQuestions, modelQuestions]);
  const pageSize = 10;
  const pageCount = Math.ceil(questions.length / pageSize);
  const visible = questions.slice(page * pageSize, page * pageSize + pageSize);
  const answered = questions.filter((q) => answers[q.id]).length;
  const currentAnswered = visible.filter((q) => answers[q.id]).length;
  const currentCorrect = visible.filter((q) => answers[q.id] === q.answer).length;

  function selectSet(value: string) { setActiveSet(value); setPage(0); setAnswers({}); setSubmitted(false); }
  function choose(id: string, label: string) { setAnswers((current) => ({ ...current, [id]: label })); setSubmitted(false); }
  function reset() { setAnswers({}); setSubmitted(false); setPage(0); }

  return (
    <section className="hsc-quiz" aria-labelledby="hsc-quiz-title">
      <div className="hsc-quiz-heading"><div><span className="section-kicker">নিজেকে যাচাই করো</span><h2 id="hsc-quiz-title">MCQ অনুশীলন</h2><p>প্রথমে নিজে উত্তর বেছে নাও। তারপর ফলাফল দেখে কোন বিষয় আবার পড়তে হবে ঠিক করো।</p></div><div className="hsc-quiz-score"><strong>{toBn(answered)} / {toBn(questions.length)}</strong><span>উত্তর দিয়েছ</span></div></div>
      <div className="hsc-quiz-tabs" role="tablist" aria-label="অধ্যায় নির্বাচন">
        {[4,5,6,0].map((ch) => <button type="button" role="tab" aria-selected={activeSet === String(ch)} className={activeSet === String(ch) ? "active" : ""} key={ch} onClick={() => selectSet(String(ch))}>{ch === 0 ? "মডেল টেস্ট MCQ" : `অধ্যায় ${toBn(ch)}`}</button>)}
      </div>
      <div className="hsc-quiz-meta"><strong>{labels[Number(activeSet)]}</strong><span>পৃষ্ঠা {toBn(page + 1)} / {toBn(Math.max(1, pageCount))}</span></div>
      <div className="hsc-quiz-list">
        {visible.map((q, index) => (
          <article className={`hsc-question${submitted ? (answers[q.id] === q.answer ? " correct" : " incorrect") : ""}`} key={q.id}>
            <div className="hsc-question-title"><span>{toBn(q.number)}.</span><strong>{q.question}</strong></div>
            <div className="hsc-options">
              {q.options.map((option) => {
                const selected = answers[q.id] === option.label;
                const right = submitted && option.label === q.answer;
                return <button type="button" key={option.label} className={`${selected ? "selected" : ""}${right ? " right-answer" : ""}`} onClick={() => !submitted && choose(q.id, option.label)} disabled={submitted}>
                  <b>{option.label}</b><span>{option.text}</span>{right && <i>সঠিক উত্তর</i>}
                </button>;
              })}
            </div>
            {submitted && answers[q.id] !== q.answer && <p className="hsc-answer-note">সঠিক উত্তর: <strong>{q.answer}</strong> — {q.options.find((o) => o.label === q.answer)?.text}</p>}
          </article>
        ))}
      </div>
      <div className="hsc-quiz-bottom">
        <div className="hsc-quiz-paging"><button type="button" onClick={() => { setPage((p) => Math.max(0, p - 1)); setSubmitted(false); }} disabled={page === 0}>← আগের ১০টি</button><span>{toBn(Math.min(questions.length, (page + 1) * pageSize))} / {toBn(questions.length)}</span><button type="button" onClick={() => { setPage((p) => Math.min(pageCount - 1, p + 1)); setSubmitted(false); }} disabled={page >= pageCount - 1}>পরের ১০টি →</button></div>
        <div className="hsc-quiz-actions">{submitted && <div className="hsc-quiz-result"><strong>{toBn(currentCorrect)} / {toBn(visible.length)}</strong><span>এই পাতায় সঠিক · {Math.round((currentCorrect / Math.max(1, visible.length)) * 100)}%</span></div>}<button type="button" className="hsc-quiz-reset" onClick={reset}>আবার শুরু</button><button type="button" className="hsc-quiz-submit" onClick={() => setSubmitted(true)} disabled={currentAnswered === 0}>উত্তর জমা দাও</button></div>
        {submitted && <p className="hsc-quiz-feedback">{currentCorrect === visible.length ? "অসাধারণ! এই পাতার সব উত্তর সঠিক হয়েছে।" : currentCorrect >= Math.ceil(visible.length * .7) ? "ভালো করেছ। ভুল হওয়া বিষয়গুলো আবার পড়ে নাও।" : "চিন্তা কোরো না। ভুল হওয়া বিষয়গুলো বুঝে আবার চেষ্টা করো।"}</p>}
      </div>
    </section>
  );
}
