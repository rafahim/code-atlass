"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  language: string;
  slug: string;
  lessonTitle: string;
  lessonSlug: string;
  starterCode: string;
  setup: string;
};

const extensions: Record<string, string> = {
  python: "py", javascript: "js", html: "html", css: "css", typescript: "ts", java: "java",
  c: "c", cpp: "cpp", "c-sharp": "cs", go: "go", rust: "rs", php: "php", ruby: "rb",
  swift: "swift", kotlin: "kt", dart: "dart", sql: "sql", r: "R", julia: "jl", bash: "sh",
  powershell: "ps1", lua: "lua", perl: "pl", scala: "scala", haskell: "hs", elixir: "ex",
  assembly: "asm", "objective-c": "m", ocaml: "ml", fortran: "f90",
};

export function LanguageCodePlayground({ language, slug, lessonTitle, lessonSlug, starterCode, setup }: Props) {
  const storageKey = `codeatlas:playground:${slug}:${lessonSlug}`;
  const [code, setCode] = useState(starterCode);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("এই ব্রাউজারে খসড়া সংরক্ষিত থাকবে");
  const lineCount = useMemo(() => Math.max(1, code.split("\n").length), [code]);
  const extension = extensions[slug] ?? "txt";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setCode(saved);
        setStatus("আগের খসড়া পাওয়া গেছে");
      }
    } catch {
      setStatus("এই ব্রাউজারে সংরক্ষিত খসড়া পাওয়া যাচ্ছে না");
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, code);
      setStatus("খসড়া এই ডিভাইসে সংরক্ষিত");
    } catch {
      setStatus("ব্রাউজারের সংরক্ষণস্থান পূর্ণ বা বন্ধ থাকতে পারে");
    }
  }, [code, loaded, storageKey]);

  function reset() {
    setCode(starterCode);
    setStatus("মূল উদাহরণ ফিরিয়ে আনা হয়েছে");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("কোড কপি হয়েছে");
    } catch {
      setStatus("কোড নির্বাচন করে Ctrl+C চাপো");
    }
  }

  function download() {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}-${lessonSlug}.${extension}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatus("কোড ফাইল ডাউনলোড শুরু হয়েছে");
  }

  return (
    <section className="atlas-language-playground" aria-labelledby="language-playground-title">
      <div className="atlas-language-playground-heading">
        <span className="section-kicker">নিজে চেষ্টা করো · {language}</span>
        <h2 id="language-playground-title">এবার নিজে কোড লেখো</h2>
        <p>উদাহরণটি বদলে নিজের সমাধান লেখো। তোমার খসড়া এই ব্রাউজারে সংরক্ষিত থাকবে—অ্যাকাউন্ট লাগবে না।</p>
      </div>
      <div className="atlas-language-playground-toolbar">
        <span className="atlas-language-file-label">{slug}.{extension}</span>
        <div className="atlas-language-playground-actions">
          <button type="button" onClick={copy}>কপি</button>
          <button type="button" onClick={reset}>মূল কোড</button>
          <button type="button" className="primary" onClick={download}>ফাইল ডাউনলোড</button>
        </div>
      </div>
      <div className="atlas-language-code-editor">
        <div className="atlas-language-line-numbers" aria-hidden="true">{Array.from({ length: lineCount }, (_, index) => <span key={index}>{index + 1}</span>)}</div>
        <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-label={`${language} code editor`} />
      </div>
      <div className="atlas-language-playground-footer">
        <span>{status}</span><span>{lineCount} লাইন · {code.length} অক্ষর</span>
      </div>
      <div className="atlas-runtime-note atlas-language-runtime-note">
        <strong>এই কোড নিজের কম্পিউটারে কীভাবে চালাবে?</strong>
        <p>{setup}</p>
        <p>CodeAtlas-এর ব্রাউজারে এই ভাষার compiler বা runtime চালু নেই। এখানে কোড সম্পাদনা, কপি, খসড়া সংরক্ষণ ও ফাইল ডাউনলোড করা যাবে। বাস্তব ফলাফল দেখতে উপরের নির্দেশনা অনুযায়ী নিজের কম্পিউটারে প্রয়োজনীয় compiler বা runtime দিয়ে চালাতে হবে।</p>
      </div>
    </section>
  );
}
