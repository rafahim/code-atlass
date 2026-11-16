"use client";

import { useEffect, useState } from "react";
type Practical = { number: number; group: string; title: string; steps: string[] };
const KEY = "codeatlas-hsc-practicals-v1";
const bn = (v: number) => String(v).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
function read(): Record<string, boolean> { try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; } }
export function HscPracticalList({ tasks }: { tasks: Practical[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => { setDone(read()); }, []);
  const count = Object.values(done).filter(Boolean).length;
  function toggle(id: string) { setDone((current) => { const next = {...current,[id]:!current[id]}; try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* optional local persistence */ } return next; }); }
  return <div className="hsc-practical-wrap"><div className="hsc-practical-progress"><strong>{bn(count)} / {bn(tasks.length)}টি Practical শেষ</strong><span>{bn(Math.round(count/tasks.length*100))}%</span><div><i style={{width:`${count/tasks.length*100}%`}} /></div></div><div className="hsc-practical-groups">{["HTML","C","Database"].map((group) => <section key={group}><div className="hsc-practical-group-title"><span>{group}</span><small>{bn(tasks.filter(t=>t.group===group).length)}টি Lab</small></div>{tasks.filter(t=>t.group===group).map((task) => { const id=`lab-${task.number}`; return <article className="hsc-practical-card" key={id}><div className="hsc-practical-card-head"><span>Lab {bn(task.number)}</span><h3>{task.title}</h3><label><input type="checkbox" checked={!!done[id]} onChange={()=>toggle(id)}/><b>{done[id] ? "সম্পন্ন" : "শেষ করেছি"}</b></label></div><ol>{task.steps.map((step,index)=><li key={index}>{step}</li>)}</ol></article>; })}</section>)}</div><p className="hsc-practical-foot">প্রতিটি কাজ নিজে করো। code-এ একটি পরিবর্তন করে ফলাফল কীভাবে বদলায় লিখে রাখো—শুধু copy করলে কাজ শেষ নয়।</p></div>;
}
