import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "HTML Reference — বাংলা HTML Tutorial", description: "প্রয়োজনীয় HTML tags ও attributes-এর বাংলা quick reference।" };

const tags = [
  ["html", "সম্পূর্ণ HTML document-এর root element"], ["head", "পেজের metadata ও title রাখে"], ["title", "Browser tab-এর পেজের নাম"], ["body", "Browser-এ দেখা যায় এমন মূল content"],
  ["h1–h6", "Heading বা শিরোনামের স্তর"], ["p", "Paragraph বা অনুচ্ছেদ"], ["br", "একই লেখায় line break"], ["hr", "বিষয় আলাদা করার thematic break"], ["strong", "গুরুত্বপূর্ণ text"], ["em", "জোর দিয়ে পড়ার text"],
  ["a", "Hyperlink তৈরি করে"], ["img", "ছবি দেখায়"], ["ul", "Unordered বা bullet list"], ["ol", "Ordered বা numbered list"], ["li", "List-এর item"], ["dl / dt / dd", "Description list, term ও description"],
  ["table", "Tabular data-এর table"], ["tr", "Table row"], ["th", "Table heading cell"], ["td", "Table data cell"], ["caption", "Table-এর শিরোনাম"],
  ["form", "ব্যবহারকারীর input group"], ["label", "Form field-এর নাম"], ["input", "এক লাইনের input field"], ["textarea", "একাধিক লাইনের text input"], ["select / option", "Dropdown field ও option"], ["button", "Clickable button"],
  ["header", "পেজ/section-এর পরিচিতি অংশ"], ["nav", "Navigation link-এর অংশ"], ["main", "পেজের প্রধান content"], ["section", "একটি বিষয়ভিত্তিক অংশ"], ["article", "স্বতন্ত্র content"], ["aside", "সহায়ক পাশের content"], ["footer", "শেষের তথ্য"],
  ["video", "Video player"], ["audio", "Audio player"], ["source", "Media file-এর source"], ["track", "Caption বা subtitle"], ["iframe", "অন্য page/resource embed"], ["canvas", "Script দিয়ে drawing area"], ["svg", "Vector graphic"],
];
const attrs = [["id", "একটি element-এর unique পরিচয়"], ["class", "এক বা একাধিক element-কে group করার নাম"], ["href", "Link-এর destination"], ["src", "ছবি/মিডিয়া/স্ক্রিপ্টের source path"], ["alt", "ছবির বিকল্প বর্ণনা"], ["title", "অতিরিক্ত তথ্য/tooltip বা document title context"], ["name", "Form field-এর submitted name"], ["value", "Input-এর value"], ["type", "Input বা resource-এর ধরন"], ["placeholder", "Input-এর hint"], ["required", "Field পূরণ বাধ্যতামূলক"], ["target", "Link কোথায় খুলবে"], ["width / height", "Element-এর প্রস্থ/উচ্চতা"], ["colspan / rowspan", "Table cell কত কলাম/সারি জুড়ে থাকবে"]];

export default function HtmlReferencePage() {
  return <main className="html-resource-page shell">
    <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/courses/html/">HTML Tutorial</Link><span>/</span><span>Reference</span></div>
    <header className="html-resource-hero"><span className="section-kicker">দ্রুত খুঁজে নাও</span><h1>HTML Reference</h1><p>কোন tag বা attribute কী কাজ করে ভুলে গেলে এখানে ফিরে এসো। বিস্তারিত শেখার জন্য প্রতিটি topic-এর পাঠ পড়বে।</p></header>
    <section className="html-reference-section"><div><span className="section-kicker">প্রধান HTML Elements</span><h2>HTML Tag তালিকা</h2></div><div className="html-reference-table"><div className="html-reference-row header"><strong>Tag / Element</strong><strong>কাজ</strong></div>{tags.map(([tag, description]) => <div className="html-reference-row" key={tag}><code>&lt;{tag}&gt;</code><span>{description}</span></div>)}</div></section>
    <section className="html-reference-section"><div><span className="section-kicker">Common Attributes</span><h2>গুরুত্বপূর্ণ Attribute</h2></div><div className="html-reference-table"><div className="html-reference-row header"><strong>Attribute</strong><strong>কাজ</strong></div>{attrs.map(([attr, description]) => <div className="html-reference-row" key={attr}><code>{attr}</code><span>{description}</span></div>)}</div></section>
    <div className="html-reference-cta"><strong>শুধু তালিকা দেখে HTML শেখা সম্পূর্ণ হয় না।</strong><p>প্রতিটি tag বাস্তবে ব্যবহার করতে সংশ্লিষ্ট lesson পড়ো, Try It editor-এ code চালাও এবং exercise করো।</p><Link href="/courses/html/">HTML-এর সব পাঠ দেখো ↗</Link></div>
  </main>;
}
