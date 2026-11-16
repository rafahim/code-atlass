import type { Language } from "@/data/languages";

export const categoryLabels: Record<string, string> = {
  "All topics": "সবগুলো",
  "Web development": "ওয়েব ডেভেলপমেন্ট",
  "General purpose": "সাধারণ প্রোগ্রামিং",
  "Systems & performance": "সিস্টেম ও পারফরম্যান্স",
  "Mobile development": "মোবাইল অ্যাপ ডেভেলপমেন্ট",
  "Data & databases": "ডেটা ও ডেটাবেজ",
  "Scripting & automation": "স্ক্রিপ্টিং ও অটোমেশন",
  "Functional programming": "ফাংশনাল প্রোগ্রামিং",
};

const content: Record<string, { description: string; tagline: string; level: string; useCases: string[] }> = {
  python: { description: "সহজ সিনট্যাক্সের শক্তিশালী ভাষা। Automation, Data Science, AI এবং Backend তৈরিতে ব্যবহার হয়।", tagline: "সহজভাবে শুরু করো, দারুণ কিছু তৈরি করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Automation", "Data Science", "AI ও Machine Learning", "Backend Development"] },
  javascript: { description: "ওয়েবসাইটকে ইন্টার‌্যাকটিভ করে। সাধারণ ওয়েব পেজ থেকে Full-stack অ্যাপ—সবখানেই ব্যবহার হয়।", tagline: "ওয়েবকে জীবন্ত করে তোলো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Interactive Website", "Web App", "Node.js Server", "Browser Game"] },
  html: { description: "প্রতিটি ওয়েব পেজের মূল কাঠামো তৈরি করে। অর্থবহ element দিয়ে কনটেন্ট সাজানো শেখো।", tagline: "ওয়েবসাইটের ভিত্তি তৈরি করো।", level: "শুরু করার জন্য আদর্শ", useCases: ["Web Page Structure", "Form", "Accessible Content", "Email Template"] },
  css: { description: "রং, layout, typography, animation ও responsive design দিয়ে ওয়েবসাইটের চেহারা তৈরি করো।", tagline: "সাধারণ কাঠামোকে সুন্দর অভিজ্ঞতায় বদলে দাও।", level: "নতুনদের জন্য উপযোগী", useCases: ["Web Design", "Responsive Layout", "Animation", "Design System"] },
  typescript: { description: "JavaScript-এ নির্ভরযোগ্য type যোগ করে বড় application সহজে রক্ষণাবেক্ষণ করতে সাহায্য করে।", tagline: "আরও আত্মবিশ্বাসের সঙ্গে JavaScript লেখো।", level: "JavaScript জানা থাকলে সুবিধা হবে", useCases: ["Large Web App", "Frontend Framework", "API", "Shared Codebase"] },
  java: { description: "Enterprise software, Android এবং Backend system তৈরিতে বহুল ব্যবহৃত একটি object-oriented ভাষা।", tagline: "নির্ভরযোগ্য সফটওয়্যারের ভিত্তি শেখো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Enterprise App", "Backend Service", "Android", "Big Data Tool"] },
  c: { description: "Memory, data এবং Operating System-এর মতো কম্পিউটারের ভেতরের কাজ বোঝার জন্য গুরুত্বপূর্ণ ভাষা।", tagline: "কম্পিউটারের ভেতরের কাজ বুঝে নাও।", level: "নতুনদের জন্য উপযোগী", useCases: ["Embedded System", "Operating System", "Device Driver", "High-performance Tool"] },
  cpp: { description: "Game, system software, simulation এবং দ্রুতগতির application তৈরিতে ব্যবহৃত শক্তিশালী ভাষা।", tagline: "শক্তিশালী নিয়ন্ত্রণের সঙ্গে দ্রুত সফটওয়্যার তৈরি করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Game Engine", "System Software", "Competitive Programming", "Simulation"] },
  "c-sharp": { description: ".NET application, Unity game, desktop tool এবং web service তৈরির আধুনিক ভাষা।", tagline: "বিভিন্ন platform-এর জন্য application তৈরি করো।", level: "নতুনদের জন্য উপযোগী", useCases: [".NET Application", "Unity Game", "Web API", "Desktop Software"] },
  go: { description: "সহজ syntax-এর compiled ভাষা। নির্ভরযোগ্য tool, network service এবং cloud system তৈরিতে জনপ্রিয়।", tagline: "সহজ code দিয়ে কার্যকর service তৈরি করো।", level: "প্রাথমিক ধারণা থাকলে সুবিধা হবে", useCases: ["Cloud Service", "Command-line Tool", "Networking", "Backend System"] },
  rust: { description: "গতি, নির্ভরযোগ্যতা ও memory safety-কে গুরুত্ব দিয়ে system software তৈরির ভাষা।", tagline: "নিরাপত্তা বজায় রেখে দ্রুত সফটওয়্যার তৈরি করো।", level: "কিছু programming ধারণা প্রয়োজন", useCases: ["Systems Programming", "WebAssembly", "Command-line Tool", "Reliable Service"] },
  php: { description: "Server-side-এ চলে এবং website, content platform ও web application তৈরি করতে ব্যবহৃত হয়।", tagline: "ডাইনামিক ওয়েবসাইট তৈরি করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Dynamic Website", "WordPress", "API", "E-commerce"] },
  ruby: { description: "পড়তে সহজ syntax-এর জন্য পরিচিত। Web application, automation এবং দ্রুত prototype তৈরিতে কাজে লাগে।", tagline: "পরিষ্কার code দিয়ে কাজ এগিয়ে নাও।", level: "নতুনদের জন্য উপযোগী", useCases: ["Web App", "Automation", "Scripting", "Prototyping"] },
  swift: { description: "iPhone, iPad, Mac এবং Apple platform-এর application তৈরির আধুনিক ভাষা।", tagline: "Apple ecosystem-এর জন্য তৈরি করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["iOS App", "macOS Software", "Apple Platform", "Server-side Swift"] },
  kotlin: { description: "Android development এবং multiplatform project-এর জন্য সংক্ষিপ্ত ও আধুনিক ভাষা।", tagline: "আধুনিক Android app তৈরি করা শেখো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Android App", "Backend Service", "Multiplatform App", "JVM Project"] },
  dart: { description: "Flutter-এর সঙ্গে ব্যবহার করে একই codebase থেকে একাধিক platform-এর app তৈরি করা যায়।", tagline: "এক codebase থেকে একাধিক platform।", level: "নতুনদের জন্য উপযোগী", useCases: ["Flutter App", "Mobile Interface", "Web App", "Desktop App"] },
  sql: { description: "Relational database থেকে তথ্য খুঁজে বের করা, সাজানো ও পরিচালনা করার ভাষা।", tagline: "ডেটাকে প্রশ্ন করো, উত্তর বের করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Data Analysis", "Application Database", "Reporting", "Data Engineering"] },
  r: { description: "Statistics, data analysis এবং visualization-এর জন্য তৈরি programming language ও environment।", tagline: "ডেটা বিশ্লেষণ করে ফলাফল বোঝাও।", level: "নতুনদের জন্য উপযোগী", useCases: ["Statistics", "Data Visualization", "Research", "Reporting"] },
  julia: { description: "Scientific computing, numerical calculation ও গবেষণার জন্য দ্রুতগতির ভাষা।", tagline: "বৈজ্ঞানিক হিসাব করো আরও কার্যকরভাবে।", level: "কিছু প্রাথমিক ধারণা প্রয়োজন", useCases: ["Numerical Computing", "Scientific Research", "Optimization", "Data Science"] },
  bash: { description: "Terminal-এর command ও shell script দিয়ে দৈনন্দিন কাজ স্বয়ংক্রিয় করো।", tagline: "বারবার করা কাজগুলো স্বয়ংক্রিয় করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Linux ও macOS", "DevOps", "Automation", "System Administration"] },
  powershell: { description: "Windows-সহ বিভিন্ন platform-এ system পরিচালনা ও workflow automation-এর shell।", tagline: "সহজ script দিয়ে system পরিচালনা করো।", level: "নতুনদের জন্য উপযোগী", useCases: ["Windows Administration", "Cloud Automation", "DevOps", "IT Operations"] },
  lua: { description: "হালকা ও দ্রুত scripting language, যা game, tool এবং application-এর ভেতরে ব্যবহৃত হয়।", tagline: "ছোট ভাষা, অনেক সম্ভাবনা।", level: "নতুনদের জন্য উপযোগী", useCases: ["Game Scripting", "Embedded Script", "Configuration", "Automation"] },
  perl: { description: "Text processing, system script এবং automation-এর জন্য নমনীয় একটি programming language।", tagline: "জটিল text থেকে দরকারি তথ্য বের করো।", level: "কিছু প্রাথমিক ধারণা প্রয়োজন", useCases: ["Text Processing", "System Script", "Log Analysis", "Automation"] },
  scala: { description: "Object-oriented ও functional programming একসঙ্গে ব্যবহার করে scalable application তৈরি করা যায়।", tagline: "Functional ধারণার সঙ্গে শক্তিশালী application।", level: "কিছু programming ধারণা প্রয়োজন", useCases: ["Data Platform", "Backend System", "Functional Programming", "Distributed System"] },
  haskell: { description: "Type system ও function composition-এর মাধ্যমে functional programming শেখার শক্তিশালী ভাষা।", tagline: "Function দিয়ে চিন্তা করতে শেখো।", level: "কিছু programming ধারণা প্রয়োজন", useCases: ["Functional Programming", "Language Research", "Compiler", "Reliable System"] },
  elixir: { description: "একসঙ্গে অনেক কাজ সামলাতে পারে এমন fault-tolerant ও real-time application তৈরির ভাষা।", tagline: "সাড়া দিতে পারে এমন নির্ভরযোগ্য system তৈরি করো।", level: "কিছু programming ধারণা প্রয়োজন", useCases: ["Real-time App", "Distributed System", "Web Service", "Messaging"] },
  assembly: { description: "Instruction, register ও memory বুঝে কম্পিউটারের একেবারে নিচের স্তরের কাজ শেখো।", tagline: "সফটওয়্যার কীভাবে hardware-এর সঙ্গে কথা বলে দেখো।", level: "উন্নত ভিত্তি প্রয়োজন", useCases: ["Computer Architecture", "Embedded System", "Reverse Engineering", "Low-level Optimization"] },
  "objective-c": { description: "Apple software-এর ইতিহাসে গুরুত্বপূর্ণ C-ভিত্তিক ভাষা, যা পুরোনো project-এ এখনো ব্যবহৃত হয়।", tagline: "Apple software-এর গুরুত্বপূর্ণ ভিত্তি বুঝে নাও।", level: "C-এর ধারণা থাকলে সুবিধা হবে", useCases: ["Legacy iOS App", "macOS Software", "Apple Framework", "Existing App Maintenance"] },
  ocaml: { description: "শক্তিশালী type system ও pattern matching-সহ ব্যবহারিক functional programming language।", tagline: "Type ও function দিয়ে পরিষ্কার সমাধান তৈরি করো।", level: "কিছু programming ধারণা প্রয়োজন", useCases: ["Compiler", "Developer Tool", "Formal Method", "Functional App"] },
  fortran: { description: "Scientific computing, numerical model এবং উচ্চক্ষমতার গণনায় ব্যবহৃত পুরোনো কিন্তু কার্যকর compiled ভাষা।", tagline: "বৈজ্ঞানিক হিসাবের জন্য শক্তিশালী code লেখো।", level: "কিছু programming ধারণা প্রয়োজন", useCases: ["Scientific Computing", "Weather Model", "High-performance Computing", "Numerical Simulation"] },
};

const roadmapBn = [
  "পরিচিতি, প্রয়োজনীয় tool ও প্রথম program",
  "Variable, value এবং data type",
  "শর্ত (Condition) ও loop",
  "Function এবং reusable code",
  "Array, object ও collection",
  "ভুল (Error), file এবং package",
  "গঠন, module ও উন্নত ধারণা",
  "ছোট একটি বাস্তব project তৈরি",
];

export function localizeLanguage(language: Language) {
  const translated = content[language.slug];
  return {
    ...language,
    categoryBn: categoryLabels[language.category] ?? language.category,
    descriptionBn: translated?.description ?? "এই programming language-এর পরিচিতি ও ব্যবহার সম্পর্কে জানো।",
    taglineBn: translated?.tagline ?? "ধাপে ধাপে programming শেখা শুরু করো।",
    levelBn: translated?.level ?? "শেখা শুরু করা যাবে",
    useCasesBn: translated?.useCases ?? language.useCases,
    roadmapBn: roadmapBn,
  };
}
