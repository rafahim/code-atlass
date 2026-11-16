"use client";

import { useEffect, useState } from "react";
type PlanItem = { day: number; topic: string; task: string };
const KEY = "codeatlas-hsc-ict-21day-v1";
const bn = (v: number) => String(v).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
function read(): number[] { try { const raw = localStorage.getItem(KEY); const data = raw ? JSON.parse(raw) : []; return Array.isArray(data) ? data.filter((x) => Number.isInteger(x)) : []; } catch { return []; } }
export function HscStudyPlan({ items }: { items: PlanItem[] }) {
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => { setDone(read()); }, []);
  function toggle(day: number) { setDone((current) => { const next = current.includes(day) ? current.filter((n) => n !== day) : [...current, day]; try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* optional local persistence */ } return next; }); }
  const percent = Math.round((done.length / items.length) * 100);
  return <div className="hsc-plan-wrap"><div className="hsc-plan-progress"><div><span>তোমার প্রস্তুতির অগ্রগতি</span><strong>{bn(done.length)} / {bn(items.length)} দিন · {bn(percent)}%</strong></div><div className="hsc-plan-track"><span style={{width:`${percent}%`}} /></div><p>প্রতিদিনের কাজ শেষ হলে টিক দাও। এই অগ্রগতি শুধু এই browser-এ সংরক্ষিত থাকবে।</p></div><div className="hsc-plan-list">{items.map((item) => <label className={done.includes(item.day) ? "done" : ""} key={item.day}><input type="checkbox" checked={done.includes(item.day)} onChange={() => toggle(item.day)} /><span className="hsc-plan-day">{bn(item.day)}</span><span className="hsc-plan-copy"><strong>{item.topic}</strong><small>{item.task}</small></span><span className="hsc-plan-check">{done.includes(item.day) ? "✓" : ""}</span></label>)}</div></div>;
}
