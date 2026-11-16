"use client";

import { useMemo, useState } from "react";
import { categories, languages } from "@/data/languages";
import { categoryLabels, localizeLanguage } from "@/data/bn";
import { LanguageCard } from "@/components/LanguageCard";
import { Mark } from "@/components/Mark";

export function LanguageBrowser() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All topics");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return languages.filter((language) => {
      const translated = localizeLanguage(language);
      const matchesCategory = activeCategory === "All topics" || language.category === activeCategory;
      const searchable = [language.name, translated.descriptionBn, translated.categoryBn, ...translated.useCasesBn].join(" ").toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [query, activeCategory]);

  return (
    <div className="browser-wrap">
      <div className="browser-tools">
        <label className="search-box"><Mark name="search" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="যেমন Python, JavaScript বা ওয়েব ডেভেলপমেন্ট..." aria-label="প্রোগ্রামিং ভাষা খুঁজুন" />{query && <button type="button" className="clear-search" onClick={() => setQuery("")}>মুছুন</button>}</label>
        <span className="result-count">{filtered.length}টি ভাষা</span>
      </div>
      <div className="filter-row" aria-label="Category দিয়ে বাছাই">
        {categories.map((category) => <button key={category} type="button" className={`filter-chip${activeCategory === category ? " active" : ""}`} onClick={() => setActiveCategory(category)}>{categoryLabels[category] ?? category}</button>)}
      </div>
      {filtered.length ? <div className="language-grid">{filtered.map((language) => <LanguageCard key={language.slug} language={language} />)}</div> : <div className="empty-state"><span className="empty-icon"><Mark name="search" size={24} /></span><h3>কোনো ভাষা পাওয়া যায়নি</h3><p>অন্য কোনো নাম লিখে দেখো অথবা category পরিবর্তন করো।</p><button className="button button-secondary" onClick={() => { setQuery(""); setActiveCategory("All topics"); }}>সব ভাষা দেখাও</button></div>}
    </div>
  );
}
