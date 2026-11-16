import Link from "next/link";
import type { CSSProperties } from "react";
import type { Language } from "@/data/languages";
import { localizeLanguage } from "@/data/bn";
import { Mark } from "@/components/Mark";

export function LanguageCard({ language, compact = false }: { language: Language; compact?: boolean }) {
  const item = localizeLanguage(language);
  return (
    <Link href={`/languages/${language.slug}/`} className={`language-card${compact ? " language-card-compact" : ""}`}>
      <div className="language-card-top">
        <span className="language-symbol" style={{ "--language-color": language.color } as CSSProperties}>{language.short}</span>
        <span className="card-arrow"><Mark name="arrow" size={17} /></span>
      </div>
      <div className="language-card-copy">
        <span className="eyebrow">{item.categoryBn}</span>
        <h3>{language.name}</h3>
        <p>{item.descriptionBn}</p>
      </div>
      <div className="language-card-bottom"><span>{item.levelBn}</span><span className="card-link">বিস্তারিত <Mark name="arrow" size={14} /></span></div>
    </Link>
  );
}
