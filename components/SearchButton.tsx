"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Mark } from "@/components/Mark";
import { assetPath } from "@/lib/site";
import type { SearchItem } from "@/lib/search-index";

const KIND_LABEL: Record<SearchItem["k"], string> = {
  language: "ভাষা",
  tutorial: "টিউটোরিয়াল",
  lesson: "পাঠ",
  course: "কোর্স",
  page: "পেজ",
};
const KIND_BONUS: Record<SearchItem["k"], number> = { language: 3, tutorial: 2, lesson: 0, course: 0, page: 1 };

let indexPromise: Promise<SearchItem[]> | null = null;
function loadIndex() {
  if (!indexPromise) {
    indexPromise = fetch(assetPath("/search-index.json"))
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<SearchItem[]>;
      })
      .catch((error) => {
        indexPromise = null; // allow a retry on the next open
        throw error;
      });
  }
  return indexPromise;
}

/** Normalise so different keyboards/fonts of the same Bangla word still match. */
const norm = (value: string) => value.normalize("NFC").replace(/[\u200c\u200d]/g, "").toLowerCase();

/** Bangla spellings people type -> the English terms the lessons actually use. */
const ALIAS_SOURCE: Record<string, string[]> = {
  পাইথন: ["python"], জাভাস্ক্রিপ্ট: ["javascript"], জাভাস্ক্রিপট: ["javascript"], জাভা: ["java"],
  এইচটিএমএল: ["html"], সিএসএস: ["css"], টাইপস্ক্রিপ্ট: ["typescript"], সিপিপি: ["c++", "cpp"],
  পিএইচপি: ["php"], রুবি: ["ruby"], রাস্ট: ["rust"], সুইফট: ["swift"], কটলিন: ["kotlin"],
  এসকিউএল: ["sql"], জুলিয়া: ["julia"], ডার্ট: ["dart"], লুয়া: ["lua"], স্কালা: ["scala"],
  বাশ: ["bash"], ডকার: ["docker"], গিট: ["git"], এপিআই: ["api"], জেসন: ["json"],
  ডাটাবেস: ["database"], ডেটাবেস: ["database"], ডাটা: ["data"], ডেটা: ["data"],
  ভ্যারিয়েবল: ["variable"], ভেরিয়েবল: ["variable"], লুপ: ["loop"], ফাংশন: ["function"],
  কন্ডিশন: ["condition"], শর্ত: ["condition"], অ্যারে: ["array"], এ্যারে: ["array"], স্ট্রিং: ["string"],
  ক্লাস: ["class"], অবজেক্ট: ["object"], অ্যালগরিদম: ["algorithm"], এলগরিদম: ["algorithm"],
  প্র্যাকটিস: ["practice"], প্রাকটিস: ["practice"], টিউটোরিয়াল: ["tutorial"], কুইজ: ["quiz"],
  ওয়েবসাইট: ["website", "web"], ওয়েব: ["web"], ফ্রন্টএন্ড: ["frontend"], ব্যাকএন্ড: ["backend"],
  টেস্টিং: ["testing", "test"], ডিবাগ: ["debug"], ইনপুট: ["input"], আউটপুট: ["output"],
  লিস্ট: ["list"], ডিকশনারি: ["dictionary"], এরর: ["error"], ফাইল: ["file"],
  কম্পিউটার: ["computer"], ইন্টারনেট: ["internet"], নেটওয়ার্ক: ["network"], সিকিউরিটি: ["security"],
};
const ALIASES: Array<[string, string[]]> = Object.entries(ALIAS_SOURCE).map(([key, value]) => [norm(key), value]);

/** The word as typed, plus English equivalents (also while the Bangla word is only half typed). */
function expand(token: string): string[] {
  const out = new Set([token]);
  for (const [key, english] of ALIASES) {
    if (key === token || (token.length >= 2 && key.startsWith(token))) english.forEach((word) => out.add(word));
  }
  return [...out];
}

function rank(items: SearchItem[], query: string): SearchItem[] {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const options = tokens.map(expand);
  const scored: Array<{ item: SearchItem; score: number }> = [];
  for (const item of items) {
    const title = norm(item.t);
    const parent = norm(item.p || "");
    const haystack = `${title} ${parent} ${norm(item.s || "")}`;
    let score = KIND_BONUS[item.k];
    let ok = true;
    for (const choices of options) {
      let best = 0;
      for (const token of choices) {
        if (!haystack.includes(token)) continue;
        const points = title.startsWith(token) ? 6 : title.includes(token) ? 4 : parent.includes(token) ? 2 : 1;
        if (points > best) best = points;
      }
      if (!best) { ok = false; break; }
      score += best;
    }
    if (ok) scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 14).map((entry) => entry.item);
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let alive = true;
    loadIndex().then((data) => { if (alive) setItems(data); }).catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth; // keeps the page from jumping sideways
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => { body.style.overflow = previousOverflow; body.style.paddingRight = previousPadding; };
  }, []);

  const results = useMemo(() => {
    if (!items) return [];
    if (!query.trim()) return items.filter((item) => item.k === "language").slice(0, 8);
    return rank(items, query);
  }, [items, query]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = useCallback((item: SearchItem) => {
    onClose();
    router.push(item.u);
  }, [onClose, router]);

  function onKeyDown(event: ReactKeyboardEvent) {
    if (event.key === "Tab") { event.preventDefault(); }
    else if (event.key === "Escape") { event.preventDefault(); onClose(); }
    else if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0))); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
    else if (event.key === "Enter" && results[active]) { event.preventDefault(); go(results[active]); }
  }

  const searching = query.trim().length > 0;
  return (
    <div className="search-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="search-dialog" role="dialog" aria-modal="true" aria-label="সাইটে খোঁজো" onKeyDown={onKeyDown}>
        <div className="search-input-row">
          <Mark name="search" size={19} />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ভাষা, পাঠ বা বিষয় খোঁজো… (যেমন: python, লুপ, function)"
            aria-label="সার্চ"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="search-esc" onClick={onClose} aria-label="বন্ধ করো">Esc</button>
        </div>
        <div className="search-body">
          {failed ? (
            <p className="search-empty">সার্চ ইনডেক্স লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করো।</p>
          ) : !items ? (
            <p className="search-empty">লোড হচ্ছে…</p>
          ) : results.length === 0 ? (
            <p className="search-empty">“{query}” এর জন্য কিছু পাওয়া যায়নি। অন্য শব্দ বা ইংরেজি নাম (যেমন: loop) দিয়ে চেষ্টা করো।</p>
          ) : (
            <>
              {!searching && <p className="search-hint">জনপ্রিয় ভাষা</p>}
              <ul ref={listRef} role="listbox" className="search-results">
                {results.map((item, index) => (
                  <li key={`${item.u}-${index}`} role="option" aria-selected={index === active} data-index={index}>
                    <button type="button" className={index === active ? "active" : ""} onMouseEnter={() => setActive(index)} onClick={() => go(item)}>
                      <span className="search-kind">{KIND_LABEL[item.k]}</span>
                      <span className="search-copy">
                        <strong>{item.t}</strong>
                        {(item.p || item.s) && <small>{[item.p, item.s].filter(Boolean).join(" · ")}</small>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> বাছাই</span><span><kbd>Enter</kbd> খোলো</span><span><kbd>Esc</kbd> বন্ধ</span></div>
      </div>
    </div>
  );
}

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = useCallback(() => { setOpen(false); buttonRef.current?.focus(); }, []);
  return (
    <>
      <button ref={buttonRef} type="button" className="header-icon-btn header-search-btn" onClick={() => setOpen(true)} aria-label="সাইটে খোঁজো (Ctrl+K)" title="খোঁজো (Ctrl+K বা /)">
        <Mark name="search" size={18} />
        <span className="header-search-label">খোঁজো</span>
        <kbd>Ctrl K</kbd>
      </button>
      {open && createPortal(<SearchDialog onClose={close} />, document.body)}
    </>
  );
}
