"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Mark } from "@/components/Mark";

type SourceFile = "html" | "css" | "js";
type DeviceMode = "desktop" | "tablet" | "mobile";
type OutputTab = "preview" | "console";
type ConsoleLevel = "log" | "info" | "warn" | "error";
type MediaItem = { id: string; name: string; src: string; kind: "image" | "video"; size: number };
type ConsoleItem = { id: number; level: ConsoleLevel; text: string; time: string };

const starterHtml = `<!doctype html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>আমার প্রথম ওয়েবসাইট</title>
</head>
<body>
  <main class="card">
    <span class="tag">আমার প্রথম project</span>
    <h1>স্বাগতম! 👋</h1>
    <p>এই লেখা পরিবর্তন করো, তারপর তোমার website-এর preview দেখো।</p>
    <button id="helloBtn">এখানে ক্লিক করো</button>
    <p id="message" aria-live="polite"></p>
  </main>
</body>
</html>`;

const starterCss = `* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #eef0ff, #e6fbf4);
  color: #19213a;
}
.card {
  width: min(100%, 520px);
  padding: 36px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 20px 60px #25305a18;
  text-align: center;
}
.tag { color: #6654dd; font-weight: 700; }
h1 { font-size: clamp(32px, 7vw, 48px); margin: 12px 0; }
p { line-height: 1.7; color: #64708a; }
button {
  border: 0; border-radius: 12px; padding: 13px 20px;
  background: #6554df; color: white; font-weight: 700; cursor: pointer;
}`;

const starterJs = `const button = document.querySelector("#helloBtn");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = "দারুণ! তোমার JavaScript কাজ করছে 🎉";
  console.log("Button clicked successfully!");
});`;

const storageKey = "codeatlas-practice-v2";

function escapeCode(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function highlightSource(source: string, file: SourceFile) {
  const tokens: { value: string; kind: "string" | "comment" }[] = [];
  const stash = (value: string, kind: "string" | "comment") => {
    const marker = `\u0001${String.fromCharCode(256 + tokens.length)}\u0001`;
    tokens.push({ value, kind });
    return marker;
  };
  let code = source;

  if (file === "html") {
    code = code.replace(/<!--[^]*?-->/g, (value) => stash(value, "comment"));
    code = code.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, (value) => stash(value, "string"));
    code = escapeCode(code).replace(/(&lt;\/?)([a-zA-Z][\w:-]*)([^]*?)(\/?&gt;)/g, (_whole, open: string, tag: string, attrs: string, close: string) => {
      const highlightedAttrs = attrs.replace(/([\w:-]+)(\s*=)/g, '<span class="syntax-attribute">$1</span><span class="syntax-punctuation">$2</span>');
      return `<span class="syntax-punctuation">${open}</span><span class="syntax-tag">${tag}</span>${highlightedAttrs}<span class="syntax-punctuation">${close}</span>`;
    });
  } else {
    code = code.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g, (value) => stash(value, "string"));
    code = code.replace(file === "css" ? /\/\*[\s\S]*?\*\//g : /\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/g, (value) => stash(value, "comment"));
    code = escapeCode(code);
    if (file === "css") {
      code = code.replace(/(^|[}\n])([^{}\n]+)(\s*\{)/g, (_whole, start: string, selector: string, brace: string) => `${start}<span class="syntax-selector">${selector}</span>${brace}`);
      code = code.replace(/(^|\s)([a-zA-Z-]+)(\s*:)/g, (_whole, before: string, property: string, colon: string) => `${before}<span class="syntax-property">${property}</span><span class="syntax-punctuation">${colon}</span>`);
    } else {
      code = code.replace(/\b(const|let|var|function|return|if|else|for|while|new|class|async|await|import|export|from|default|try|catch|throw|typeof|instanceof|true|false|null|undefined|this|of|in)\b/g, '<span class="syntax-keyword">$1</span>');
      code = code.replace(/\b(console|document|window|Math|JSON|Array|Object|Promise)\b/g, '<span class="syntax-global">$1</span>');
      code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="syntax-number">$1</span>');
    }
  }

  return code.replace(/\u0001([^\u0001])\u0001/g, (_marker, key: string) => {
    const token = tokens[key.charCodeAt(0) - 256];
    return token ? `<span class="${token.kind === "string" ? "syntax-string" : "syntax-comment"}">${escapeCode(token.value)}</span>` : "";
  });
}

const assetDbName = "codeatlas-practice-assets";
const assetStoreName = "assets";

function escapeAttribute(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] ?? char));
}

function makeAssetMarkup(item: MediaItem) {
  const name = escapeAttribute(item.name);
  return item.kind === "image"
    ? `<img src="${item.src}" alt="${name}" style="max-width:100%;height:auto" />`
    : `<video src="${item.src}" controls playsinline style="max-width:100%;height:auto"></video>`;
}

function buildDocument(sourceHtml: string, css: string, js: string, media: MediaItem[], instrumentConsole: boolean) {
  let body = sourceHtml.trim();
  for (const item of media) body = body.replaceAll(`<!-- asset:${item.id} -->`, makeAssetMarkup(item));

  const isFullDocument = /<html\b/i.test(body);
  let output = isFullDocument
    ? body
    : `<!doctype html><html lang="bn"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${body}</body></html>`;

  const styleTag = `<style data-codeatlas-style>\n${css.replace(/<\/style/gi, "<\\/style")}\n</style>`;
  if (/<head\b[^>]*>/i.test(output)) {
    if (/<\/head>/i.test(output)) output = output.replace(/<\/head>/i, `${styleTag}</head>`);
    else output = output.replace(/<head\b[^>]*>/i, (match) => `${match}${styleTag}`);
  } else if (/<html\b[^>]*>/i.test(output)) {
    output = output.replace(/<html\b[^>]*>/i, (match) => `${match}<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${styleTag}</head>`);
  }

  let scriptTag = "";
  if (instrumentConsole) {
    const safeJs = JSON.stringify(js).replace(/</g, "\\u003c");
    const bootstrap = `(function(){
      const send=(level,args)=>{let text=args.map((value)=>{try{if(value instanceof Error)return value.name+": "+value.message;return typeof value==="string"?value:JSON.stringify(value)??String(value)}catch(_){return String(value)}}).join(" ");parent.postMessage({channel:"codeatlas-preview",type:"console",level,text},"*")};
      ["log","info","warn","error"].forEach((level)=>{const original=console[level].bind(console);console[level]=(...args)=>{original(...args);send(level,args)}});
      window.addEventListener("error",(event)=>send("error",[event.message||"JavaScript error",event.filename?event.filename+":"+event.lineno:""]));
      window.addEventListener("unhandledrejection",(event)=>send("error",["Unhandled promise rejection",event.reason]));
      try{(new Function(${safeJs}))()}catch(error){send("error",[error&&error.stack?error.stack:error&&error.message?error.message:String(error)])}
    })();`;
    scriptTag = `<script>${bootstrap.replace(/<\/script/gi, "<\\/script")}<\/script>`;
  } else {
    scriptTag = `<script>${js.replace(/<\/script/gi, "<\\/script")}<\/script>`;
  }

  if (/<\/body>/i.test(output)) output = output.replace(/<\/body>/i, `${scriptTag}</body>`);
  else if (/<\/html>/i.test(output)) output = output.replace(/<\/html>/i, `${scriptTag}</html>`);
  else output += scriptTag;
  return output;
}

function openAssetDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") { reject(new Error("এই browser-এ local asset storage পাওয়া যাচ্ছে না।")); return; }
    const request = indexedDB.open(assetDbName, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(assetStoreName)) database.createObjectStore(assetStoreName, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Local storage খোলা যায়নি।"));
  });
}

async function readSavedAssets(): Promise<MediaItem[]> {
  const database = await openAssetDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction(assetStoreName, "readonly").objectStore(assetStoreName).getAll();
    request.onsuccess = () => { database.close(); resolve((request.result as MediaItem[]) ?? []); };
    request.onerror = () => { database.close(); reject(request.error ?? new Error("Asset পড়া যায়নি।")); };
  });
}

async function saveAssets(items: MediaItem[]) {
  const database = await openAssetDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(assetStoreName, "readwrite");
    const store = transaction.objectStore(assetStoreName);
    store.clear();
    items.forEach((item) => store.put(item));
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Asset save করা যায়নি।")); };
    transaction.onabort = () => { database.close(); reject(transaction.error ?? new Error("Asset save বাতিল হয়েছে।")); };
  });
}

function formatTime() {
  return new Intl.DateTimeFormat("bn-BD", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
}

export function CodePractice() {
  const [html, setHtml] = useState(starterHtml);
  const [css, setCss] = useState(starterCss);
  const [js, setJs] = useState(starterJs);
  const [activeFile, setActiveFile] = useState<SourceFile>("html");
  const [mobilePanel, setMobilePanel] = useState<"editor" | "preview">("editor");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [outputTab, setOutputTab] = useState<OutputTab>("preview");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [consoleItems, setConsoleItems] = useState<ConsoleItem[]>([]);
  const [autoRun, setAutoRun] = useState(true);
  const [draftReady, setDraftReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState("সংরক্ষণ হচ্ছে…");
  const [runStatus, setRunStatus] = useState("প্রিভিউ প্রস্তুত");
  const [appliedDocument, setAppliedDocument] = useState("");
  const [runVersion, setRunVersion] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleIdRef = useRef(0);

  const source = activeFile === "html" ? html : activeFile === "css" ? css : js;
  const setSource = activeFile === "html" ? setHtml : activeFile === "css" ? setCss : setJs;
  const lineCount = useMemo(() => source.split("\n").length, [source]);
  const highlightedSource = useMemo(() => highlightSource(source, activeFile), [source, activeFile]);
  const documentHtml = useMemo(() => buildDocument(html, css, js, media, true), [html, css, js, media]);

  const addConsoleItem = useCallback((level: ConsoleLevel, text: string) => {
    setConsoleItems((previous) => [...previous, { id: ++consoleIdRef.current, level, text, time: formatTime() }].slice(-150));
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function restore() {
      try {
        const saved = localStorage.getItem(storageKey) ?? localStorage.getItem("codeatlas-practice-v1");
        if (saved) {
          const parsed = JSON.parse(saved) as { html?: string; css?: string; js?: string };
          if (typeof parsed.html === "string") setHtml(parsed.html);
          if (typeof parsed.css === "string") setCss(parsed.css);
          if (typeof parsed.js === "string") setJs(parsed.js);
        }
      } catch { /* Local draft may be unavailable or invalid. */ }
      try {
        const assets = await readSavedAssets();
        if (!cancelled) setMedia(assets);
      } catch { /* IndexedDB may be blocked; the editor remains usable. */ }
      if (!cancelled) setDraftReady(true);
    }
    void restore();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    setSaveStatus("সংরক্ষণ হচ্ছে…");
    const timeout = window.setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ html, css, js }));
        setSaveStatus("এই device-এ সংরক্ষিত");
      } catch {
        setSaveStatus("স্বয়ংক্রিয় save সম্ভব হয়নি");
      }
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [html, css, js, draftReady]);

  useEffect(() => {
    if (!draftReady) return;
    const timeout = window.setTimeout(() => {
      void saveAssets(media).catch(() => setSaveStatus("ছবি/ভিডিও সংরক্ষণ করা যায়নি"));
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [media, draftReady]);

  useEffect(() => {
    if (!draftReady) return;
    setIsDirty(true);
    if (!autoRun) { setRunStatus("পরিবর্তন হয়েছে · চালাও বোতাম চাপো"); return; }
    const timeout = window.setTimeout(() => {
      setAppliedDocument(documentHtml);
      setRunVersion((value) => value + 1);
      setIsDirty(false);
      setRunStatus("সরাসরি ফলাফল আপডেট হয়েছে");
      setConsoleItems([]);
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [documentHtml, autoRun, draftReady]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.channel !== "codeatlas-preview" || event.data?.type !== "console") return;
      const level = (event.data.level as ConsoleLevel) || "log";
      addConsoleItem(["log", "info", "warn", "error"].includes(level) ? level : "log", String(event.data.text ?? ""));
      if (level === "error") setRunStatus("কোডে সমস্যা পাওয়া গেছে");
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [addConsoleItem]);

  function runCode() {
    setConsoleItems([]);
    setAppliedDocument(documentHtml);
    setRunVersion((value) => value + 1);
    setIsDirty(false);
    setRunStatus("কোড চালানো হচ্ছে…");
    setOutputTab("preview");
    setMobilePanel("preview");
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runCode();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const target = event.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      if (event.shiftKey) {
        const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
        if (value.slice(lineStart, lineStart + 2) === "  ") {
          const next = value.slice(0, lineStart) + value.slice(lineStart + 2);
          setSource(next);
          requestAnimationFrame(() => { target.selectionStart = Math.max(lineStart, start - 2); target.selectionEnd = Math.max(lineStart, end - 2); });
        }
      } else {
        const next = value.slice(0, start) + "  " + value.slice(end);
        setSource(next);
        requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2; });
      }
    }
  }

  function changeFile(file: SourceFile) {
    setActiveFile(file);
    if (file === "html") setRunStatus("index.html সম্পাদনা করছ");
    if (file === "css") setRunStatus("style.css সম্পাদনা করছ");
    if (file === "js") setRunStatus("script.js সম্পাদনা করছ");
  }

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const selected = Array.from(files).filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));
    if (!selected.length) { setRunStatus("শুধু Image বা Video file যোগ করা যাবে"); return; }
    const tooLarge = selected.find((file) => file.size > 20 * 1024 * 1024);
    const tooMany = selected.reduce((sum, file) => sum + file.size, 0) > 35 * 1024 * 1024;
    if (tooLarge || tooMany) { setRunStatus("একটি file ২০ MB-এর কম এবং একবারে মোট ৩৫ MB-এর মধ্যে রাখো"); return; }

    const toDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("ফাইলটি পড়া যায়নি।"));
      reader.readAsDataURL(file);
    });

    try {
      const next: MediaItem[] = [];
      for (const [index, file] of selected.entries()) {
        next.push({
          id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          src: await toDataUrl(file),
          kind: file.type.startsWith("video/") ? "video" : "image",
          size: file.size,
        });
      }
      setMedia((previous) => [...previous, ...next]);
      setActiveFile("html");
      const snippets = next.map((item) => `<!-- asset:${item.id} -->`).join("\n");
      const textarea = editorRef.current;
      const bodyEnd = html.toLowerCase().lastIndexOf("</body>");
      const hasEditorFocus = typeof document !== "undefined" && document.activeElement === textarea;
      const cursor = activeFile === "html" && textarea && hasEditorFocus ? textarea.selectionStart : bodyEnd >= 0 ? bodyEnd : html.length;
      const insertion = `${snippets}\n`;
      setHtml((previous) => `${previous.slice(0, Math.min(cursor, previous.length))}${insertion}${previous.slice(Math.min(cursor, previous.length))}`);
      setRunStatus(`${next.length}টি local asset যোগ হয়েছে`);
      requestAnimationFrame(() => {
        if (textarea) { textarea.focus(); textarea.selectionStart = textarea.selectionEnd = cursor + insertion.length; }
      });
    } catch (fileError) {
      setRunStatus(fileError instanceof Error ? fileError.message : "ফাইল যোগ করা যায়নি");
    }
  }

  function removeMedia(item: MediaItem) {
    setMedia((previous) => previous.filter((entry) => entry.id !== item.id));
    setHtml((previous) => previous.replaceAll(`<!-- asset:${item.id} -->`, ""));
  }

  function insertAsset(item: MediaItem) {
    const snippet = `<!-- asset:${item.id} -->`;
    const target = editorRef.current;
    const bodyEnd = html.toLowerCase().lastIndexOf("</body>");
    const hasEditorFocus = typeof document !== "undefined" && document.activeElement === target;
    const cursor = activeFile === "html" && target && hasEditorFocus ? target.selectionStart : bodyEnd >= 0 ? bodyEnd : html.length;
    setActiveFile("html");
    setHtml((previous) => `${previous.slice(0, Math.min(cursor, previous.length))}${snippet}${previous.slice(Math.min(cursor, previous.length))}`);
    setMobilePanel("editor");
    requestAnimationFrame(() => { if (target) { target.focus(); target.selectionStart = target.selectionEnd = cursor + snippet.length; } });
  }

  function resetCode() {
    if (typeof window !== "undefined" && !window.confirm("তোমার বর্তমান code ও local media মুছে starter project ফিরিয়ে আনবে?")) return;
    setHtml(starterHtml);
    setCss(starterCss);
    setJs(starterJs);
    setActiveFile("html");
    setMedia([]);
    setConsoleItems([]);
    setRunStatus("Starter project ফিরিয়ে আনা হয়েছে");
    setIsDirty(true);
  }

  async function copyCurrentFile() {
    try {
      await navigator.clipboard.writeText(source);
      setRunStatus("Code copy হয়েছে");
    } catch {
      setRunStatus("এই browser-এ clipboard permission পাওয়া যায়নি");
    }
  }

  function downloadProject() {
    const exported = buildDocument(html, css, js, media, false);
    const blob = new Blob([exported], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "my-website.html";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    setRunStatus("সম্পূর্ণ ওয়েবসাইট HTML ফাইল হিসেবে ডাউনলোড হয়েছে");
  }

  const fileItems: { id: SourceFile; name: string; label: string; dot: string }[] = [
    { id: "html", name: "index.html", label: "HTML", dot: "html" },
    { id: "css", name: "style.css", label: "CSS", dot: "css" },
    { id: "js", name: "script.js", label: "JS", dot: "js" },
  ];

  return (
    <div className="practice-app">
      <div className="practice-topbar">
        <div className="practice-project-title">
          <span className="practice-project-icon"><Mark name="code" size={17} /></span>
          <div><strong>আমার প্রথম ওয়েবসাইট</strong><small><span className="practice-live-dot" /> {saveStatus}</small></div>
        </div>
        <div className="practice-actions">
          <button className="practice-tool-btn" type="button" onClick={copyCurrentFile} title="বর্তমান ফাইল কপি করো"><Mark name="copy" size={15} /><span>কপি</span></button>
          <button className="practice-tool-btn" type="button" onClick={resetCode} title="Starter code ফিরিয়ে আনো"><Mark name="refresh" size={15} /><span>রিসেট</span></button>
          <button className="practice-download-btn" type="button" onClick={downloadProject}><Mark name="download" size={15} /><span>ডাউনলোড</span></button>
          <button className="practice-run-btn" type="button" onClick={runCode}><Mark name="play" size={15} /> চালাও</button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple hidden onChange={(event) => { void addFiles(event.target.files); event.currentTarget.value = ""; }} />
      <div className="practice-mobile-switch">
        <button className={mobilePanel === "editor" ? "active" : ""} onClick={() => setMobilePanel("editor")} type="button"><Mark name="code" size={15} /> কোড লিখুন</button>
        <button className={mobilePanel === "preview" ? "active" : ""} onClick={() => setMobilePanel("preview")} type="button"><Mark name="eye" size={15} /> ফলাফল দেখুন</button>
      </div>

      <div className="practice-ide-layout">
        <aside className={`practice-file-explorer${mobilePanel === "preview" ? " mobile-hidden" : ""}`}>
          <div className="practice-explorer-head"><span>প্রজেক্ট</span><button type="button" onClick={() => fileInputRef.current?.click()} title="ছবি বা ভিডিও যোগ করো"><Mark name="plus" size={16} /></button></div>
          <div className="practice-folder-label"><Mark name="folder" size={14} /> আমার-ওয়েবসাইট</div>
          <div className="practice-file-list">
            {fileItems.map((file) => (
              <button key={file.id} type="button" className={activeFile === file.id ? "active" : ""} onClick={() => changeFile(file.id)}>
                <span className={`practice-file-icon ${file.dot}`}>{file.label === "JavaScript" ? "JS" : file.label}</span>{file.name}
              </button>
            ))}
          </div>
          <div className="practice-assets-head"><span>লোকাল মিডিয়া</span><button type="button" onClick={() => fileInputRef.current?.click()} title="ছবি বা ভিডিও যোগ করো"><Mark name="plus" size={15} /></button></div>
          {media.length ? <div className="practice-asset-list">{media.map((item) => (
            <div className="practice-asset-row" key={item.id}>
              <span className="practice-asset-type"><Mark name={item.kind === "image" ? "image" : "video"} size={13} /></span>
              <button type="button" className="practice-asset-insert" onClick={() => insertAsset(item)} title="HTML-এ বসাও">{item.name}</button>
              <button type="button" className="practice-asset-remove" onClick={() => removeMedia(item)} aria-label={`${item.name} বাদ দাও`}>×</button>
            </div>
          ))}</div> : <p className="practice-no-assets">এখনো কোনো ছবি বা ভিডিও যোগ করোনি।</p>}
          <button className="practice-add-asset" type="button" onClick={() => fileInputRef.current?.click()}><Mark name="upload" size={14} /> ছবি / ভিডিও যোগ করো</button>
          <div className="practice-explorer-note"><Mark name="shield" size={14} /><span>ফাইলগুলো তোমার ব্রাউজারেই সংরক্ষিত থাকে। সার্ভারে আপলোড হয় না।</span></div>
        </aside>

        <section className={`practice-editor-panel${mobilePanel === "preview" ? " mobile-hidden" : ""}`}>
          <div className="practice-editor-heading">
            <div><span className="practice-editor-eyebrow">এডিটর</span><strong>{fileItems.find((file) => file.id === activeFile)?.name}</strong></div>
            <div className="practice-editor-head-actions"><span>{activeFile.toUpperCase()}</span><button type="button" onClick={() => fileInputRef.current?.click()} title="ছবি বা ভিডিও যোগ করো" aria-label="ছবি বা ভিডিও যোগ করো"><Mark name="upload" size={14} /></button><button type="button" onClick={copyCurrentFile} aria-label="কোড কপি করো"><Mark name="copy" size={14} /></button></div>
          </div>
          <div className="practice-mobile-files">{fileItems.map((file) => <button key={file.id} type="button" className={activeFile === file.id ? "active" : ""} onClick={() => changeFile(file.id)}>{file.name}</button>)}</div>
          {media.length > 0 && <div className="practice-mobile-assets">{media.map((item) => <div key={item.id}><span>{item.kind === "image" ? "ছবি" : "ভিডিও"}: {item.name}</span><button type="button" onClick={() => insertAsset(item)}>HTML-এ বসাও</button><button type="button" onClick={() => removeMedia(item)} aria-label={`${item.name} বাদ দাও`}>×</button></div>)}</div>}
          <div className="practice-code-hint">{activeFile === "html" ? "HTML দিয়ে ওয়েবপেজের কাঠামো তৈরি করো।" : activeFile === "css" ? "CSS দিয়ে রং, আকার ও layout সাজাও।" : "JavaScript দিয়ে ওয়েবপেজে কাজের সুবিধা যোগ করো।"}</div>
          <div className="practice-code-area">
            <div className="practice-line-gutter" ref={gutterRef} aria-hidden="true"><div>{Array.from({ length: lineCount }, (_, index) => <span key={index}>{index + 1}</span>)}</div></div>
            <div className="practice-editor-surface">
              <pre ref={highlightRef} className="practice-highlight-layer" aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlightedSource + "\n" }} />
            <textarea
              ref={editorRef}
              className="practice-code-input"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              wrap="off"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              onKeyDown={handleEditorKeyDown}
              onScroll={(event) => { if (gutterRef.current) gutterRef.current.scrollTop = event.currentTarget.scrollTop; if (highlightRef.current) { highlightRef.current.scrollTop = event.currentTarget.scrollTop; highlightRef.current.scrollLeft = event.currentTarget.scrollLeft; } }}
              aria-label={`${activeFile} code editor`}
              autoFocus={false}
            />
            </div>
          </div>
          <div className="practice-editor-status"><span>{lineCount} লাইন</span><span>{source.length.toLocaleString("en-US")} অক্ষর</span><span>{activeFile === "js" ? "JavaScript" : activeFile.toUpperCase()}</span></div>
          <div className="practice-editor-footer"><label className="practice-auto-run"><input type="checkbox" checked={autoRun} onChange={(event) => setAutoRun(event.target.checked)} /><span className="practice-switch-ui" /> স্বয়ংক্রিয় চালানো</label><span>{isDirty && !autoRun ? "পরিবর্তন এখনো চালানো হয়নি" : "Ctrl + Enter চাপলে কোড চলবে"}</span></div>
        </section>

        <section className={`practice-preview-panel${mobilePanel === "editor" ? " mobile-hidden" : ""}`}>
          <div className="practice-preview-heading">
            <div><span className="practice-editor-eyebrow">সরাসরি ফলাফল</span><strong>ওয়েবসাইটের প্রিভিউ</strong></div>
            <div className="practice-device-switch" aria-label="Preview device size">
              <button className={deviceMode === "desktop" ? "active" : ""} type="button" onClick={() => setDeviceMode("desktop")} title="Desktop preview"><Mark name="monitor" size={15} /></button>
              <button className={deviceMode === "tablet" ? "active" : ""} type="button" onClick={() => setDeviceMode("tablet")} title="Tablet preview"><Mark name="tablet" size={15} /></button>
              <button className={deviceMode === "mobile" ? "active" : ""} type="button" onClick={() => setDeviceMode("mobile")} title="Mobile preview"><Mark name="smartphone" size={15} /></button>
            </div>
          </div>
          <div className="practice-output-tabs"><button type="button" className={outputTab === "preview" ? "active" : ""} onClick={() => setOutputTab("preview")}><Mark name="eye" size={14} /> প্রিভিউ</button><button type="button" className={outputTab === "console" ? "active" : ""} onClick={() => setOutputTab("console")}><Mark name="terminal" size={14} /> কনসোল <span>{consoleItems.filter((item) => item.level === "error").length || ""}</span></button><span className="practice-output-state"><i className={runStatus.includes("সমস্যা") ? "error" : ""} />{runStatus}</span></div>
          <div className={`practice-preview-stage${outputTab === "console" ? " console-active" : ""}`}>
            <div className={`practice-preview-frame ${deviceMode}`}>
              {appliedDocument ? <iframe ref={iframeRef} key={runVersion} title="Website live preview" sandbox="allow-scripts" srcDoc={appliedDocument} onLoad={() => setRunStatus((current) => current.includes("সমস্যা") ? current : "প্রিভিউ চলছে")} /> : <div className="practice-preview-loading">তোমার website তৈরি হচ্ছে…</div>}
            </div>
            {outputTab === "console" && <div className="practice-console-overlay">
              <div className="practice-console-toolbar"><strong>কনসোল আউটপুট</strong><button type="button" onClick={() => setConsoleItems([])}>পরিষ্কার করো</button></div>
              <div className="practice-console-list" aria-live="polite">
                {consoleItems.length ? consoleItems.map((item) => <div key={item.id} className={`practice-console-line ${item.level}`}><span className="practice-console-level">{item.level}</span><span className="practice-console-text">{item.text}</span><time>{item.time}</time></div>) : <p>এখনো কোনো ফলাফল নেই। JavaScript-এ console.log() লিখে চালাও।</p>}
              </div>
            </div>}
          </div>
          <div className="practice-preview-footer"><span><i /> {runStatus}</span><button type="button" onClick={runCode}><Mark name="refresh" size={14} /> আবার চালাও</button></div>
        </section>
      </div>
      <div className="practice-bottom-bar"><span><Mark name="shield" size={14} /> নিরাপদ প্রিভিউ</span><p>HTML, CSS ও JavaScript browser-এর sandbox-এ চলে। অন্য language চালাতে আলাদা runtime লাগবে।</p><button type="button" onClick={downloadProject}><Mark name="download" size={14} /> ওয়েবসাইট ডাউনলোড</button></div>
    </div>
  );
}
