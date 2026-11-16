"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Files = { html: string; css: string; js: string };
type LogItem = { level: "log" | "warn" | "error" | "info"; text: string };

function makeDocument(files: Files) {
  const css = files.css.replace(/<\/style/gi, "<\\/style");
  const js = files.js.replace(/<\/script/gi, "<\\/script");
  const bridge = `
    (() => {
      const send = (level, args) => {
        let text;
        try { text = args.map((item) => typeof item === 'string' ? item : JSON.stringify(item)).join(' '); }
        catch { text = args.map(String).join(' '); }
        parent.postMessage({ type: 'codeatlas-console', level, text }, '*');
      };
      ['log','info','warn','error'].forEach((level) => {
        const original = console[level].bind(console);
        console[level] = (...args) => { send(level, args); original(...args); };
      });
      window.addEventListener('error', (event) => send('error', [event.message || 'JavaScript error']));
      window.addEventListener('unhandledrejection', (event) => send('error', [event.reason?.message || event.reason || 'Unhandled promise rejection']));
      parent.postMessage({ type: 'codeatlas-console', level: 'info', text: 'Preview প্রস্তুত' }, '*');
    })();
  `;
  const headAssets = `<style>${css}</style><script>${bridge}</script>`;
  const userScript = `<script>${js}</script>`;
  if (/<html[\s>]/i.test(files.html)) {
    let html = files.html;
    if (/<\/head>/i.test(html)) html = html.replace(/<\/head>/i, `${headAssets}</head>`);
    else html = html.replace(/<body([^>]*)>/i, `<head>${headAssets}</head><body$1>`);
    if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, `${userScript}</body>`);
    else html += userScript;
    return html;
  }
  return `<!doctype html><html lang="bn"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeAtlas Preview</title>${headAssets}</head><body>${files.html}${userScript}</body></html>`;
}

export function LessonTryIt({ initialFiles, lessonTitle }: { initialFiles: Files; lessonTitle: string }) {
  const [files, setFiles] = useState<Files>(initialFiles);
  const [activeFile, setActiveFile] = useState<keyof Files>("html");
  const [srcDoc, setSrcDoc] = useState(() => makeDocument(initialFiles));
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [mobilePane, setMobilePane] = useState<"code" | "preview">("code");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const activeContent = files[activeFile];
  const lineCount = useMemo(() => Math.max(1, activeContent.split("\n").length), [activeContent]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;
      if (!event.data || event.data.type !== "codeatlas-console") return;
      setLogs((current) => [...current.slice(-49), { level: event.data.level, text: String(event.data.text ?? "") }]);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function updateCode(value: string) {
    setFiles((current) => ({ ...current, [activeFile]: value }));
  }

  function runCode() {
    setLogs([]);
    setSrcDoc(makeDocument(files));
    setMobilePane("preview");
  }

  function resetCode() {
    setFiles(initialFiles);
    setSrcDoc(makeDocument(initialFiles));
    setLogs([]);
    setActiveFile("html");
  }

  async function copyCode() {
    try { await navigator.clipboard.writeText(activeContent); } catch { /* Clipboard may be unavailable on file/preview origins. */ }
  }

  return (
    <section className="lesson-tryit" aria-labelledby="lesson-tryit-title">
      <div className="lesson-tryit-heading">
        <div><span className="section-kicker">নিজে চেষ্টা করো</span><h2 id="lesson-tryit-title">এবার code বদলে ফলাফল দেখো</h2><p>নিচের code-এ নিজের মতো পরিবর্তন করো। তারপর <strong>চালাও</strong> চাপলে পাশে ফলাফল দেখা যাবে।</p></div>
        <span className="lesson-tryit-badge">HTML · CSS · JS</span>
      </div>
      <div className="lesson-tryit-toolbar">
        <div className="lesson-tryit-files" role="tablist" aria-label="কোড ফাইল">
          {(["html", "css", "js"] as const).map((file) => <button type="button" key={file} role="tab" aria-selected={activeFile === file} className={activeFile === file ? "active" : ""} onClick={() => setActiveFile(file)}>{file === "html" ? "index.html" : file === "css" ? "style.css" : "script.js"}</button>)}
        </div>
        <div className="lesson-tryit-actions"><button type="button" onClick={copyCode}>কপি</button><button type="button" onClick={resetCode}>রিসেট</button><button type="button" className="run" onClick={runCode}>▶ চালাও</button></div>
      </div>
      <div className="lesson-tryit-mobile-tabs"><button type="button" className={mobilePane === "code" ? "active" : ""} onClick={() => setMobilePane("code")}>কোড লিখো</button><button type="button" className={mobilePane === "preview" ? "active" : ""} onClick={() => setMobilePane("preview")}>ফলাফল দেখো</button></div>
      <div className="lesson-tryit-workspace">
        <div className={`lesson-tryit-editor${mobilePane === "preview" ? " mobile-hidden" : ""}`}>
          <div className="lesson-tryit-editor-head"><span><i /> {activeFile === "html" ? "HTML Editor" : activeFile === "css" ? "CSS Editor" : "JavaScript Editor"}</span><small>{toBn(lineCount)} লাইন</small></div>
          <div className="lesson-tryit-code-wrap"><div className="lesson-tryit-gutter">{Array.from({ length: lineCount }, (_, index) => <span key={index}>{index + 1}</span>)}</div><textarea spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-label={`${activeFile} code editor`} value={activeContent} onChange={(event) => updateCode(event.target.value)} onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); const target = event.currentTarget; const start = target.selectionStart; const end = target.selectionEnd; const next = `${activeContent.slice(0, start)}  ${activeContent.slice(end)}`; updateCode(next); requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2; }); } if ((event.ctrlKey || event.metaKey) && event.key === "Enter") { event.preventDefault(); runCode(); } }} /></div>
          <div className="lesson-tryit-editor-foot"><span>Tab = ২টি space</span><span>Ctrl + Enter = চালাও</span></div>
        </div>
        <div className={`lesson-tryit-preview${mobilePane === "code" ? " mobile-hidden" : ""}`}>
          <div className="lesson-tryit-preview-head"><strong>ফলাফল</strong><div className="lesson-tryit-view-switch"><button type="button" className={view === "desktop" ? "active" : ""} onClick={() => setView("desktop")}>Desktop</button><button type="button" className={view === "mobile" ? "active" : ""} onClick={() => setView("mobile")}>Mobile</button></div></div>
          <div className="lesson-tryit-frame-wrap"><iframe ref={frameRef} key={srcDoc} title={`${lessonTitle} code output`} sandbox="allow-scripts allow-forms" srcDoc={srcDoc} className={view === "mobile" ? "mobile" : "desktop"} /></div>
          <div className="lesson-tryit-console"><div><strong>Console</strong><button type="button" onClick={() => setLogs([])}>পরিষ্কার</button></div>{logs.length === 0 ? <p>এখানে console.log() এবং error দেখা যাবে।</p> : logs.map((log, index) => <p className={log.level} key={`${index}-${log.text}`}>{log.level}: {log.text}</p>)}</div>
        </div>
      </div>
      <p className="lesson-tryit-footnote">এই অনুশীলন HTML, CSS ও JavaScript browser-এর sandbox-এর মধ্যে চালায়। অন্য programming language চালাতে আলাদা compiler বা runtime প্রয়োজন।</p>
    </section>
  );
}

function toBn(value: number) { return String(value).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]); }
