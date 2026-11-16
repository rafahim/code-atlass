export type HtmlQuiz = { question: string; options: string[]; answer: number; explanation: string };
export type HtmlTeaching = {
  goals: string[]; easyExplanation: string; whyLearn: string; analogy: string;
  walkthrough: string[]; exampleCode: string; expectedOutput: string;
  commonMistakes: string[]; exercises: string[]; quiz: HtmlQuiz[]; tryItHtml: string;
};
const page = (body: string, title = "HTML অনুশীলন") => `<!doctype html><html lang="bn"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#f5f7fb;color:#243047;font:16px/1.7 Arial,sans-serif}main{max-width:760px;margin:auto;background:white;padding:24px;border-radius:14px;box-shadow:0 8px 28px #15223812}h1,h2{color:#245b49}img{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:8px;text-align:left}button{padding:9px 14px;border:0;border-radius:8px;background:#16845d;color:white}input,textarea{max-width:100%;padding:9px;border:1px solid #cbd5e1;border-radius:7px}@media(max-width:520px){body{padding:9px}main{padding:15px}}</style></head><body><main>${body}</main></body></html>`;
const q = (question:string, options:string[], answer:number, explanation:string):HtmlQuiz[] => [{question,options,answer,explanation}];
const mk = (v: Omit<HtmlTeaching,"tryItHtml"> & {preview:string}) => ({...v,tryItHtml:page(v.preview)});
const lessons: Record<string,HtmlTeaching> = {
"lesson-01": mk({
 goals:["HTML কী এবং কেন ব্যবহার হয় বুঝবে","একটি পূর্ণ HTML5 ফাইল লিখতে পারবে","head ও body-এর পার্থক্য বলতে পারবে"],
 easyExplanation:"HTML-এর পূর্ণরূপ HyperText Markup Language। এটি browser-কে বলে দেয় কোন অংশটি শিরোনাম, অনুচ্ছেদ, ছবি বা link। HTML পেজের কাঠামো তৈরি করে; CSS সাজায়, JavaScript কাজ করায়। `index.html` নামে ফাইল তৈরি করে নিচের কাঠামো লিখো।",
 whyLearn:"ওয়েবসাইটের প্রতিটি পেজের ভিত্তি HTML। কাঠামো না বুঝলে পরে CSS ও JavaScript শেখা কঠিন হবে।",
 analogy:"বাড়ির নকশা যেমন বলে কোথায় ঘর, দরজা ও জানালা থাকবে, HTML তেমনি পেজের অংশগুলো নির্ধারণ করে।",
 walkthrough:["`<!doctype html>` browser-কে HTML5 document জানায়।","`<html lang=\"bn\">` পুরো document-এর root; `bn` জানায় পেজের ভাষা বাংলা।","`head`-এ page title ও metadata থাকে।","`meta charset=\"UTF-8\"` বাংলা অক্ষর ঠিকভাবে দেখাতে সাহায্য করে।","`meta viewport` mobile screen-এর সঙ্গে পেজের width মেলাতে সাহায্য করে।","`title` browser tab-এ দেখা যায়।","`body`-এর content ব্যবহারকারী পেজে দেখে।"],
 exampleCode:`<!doctype html>\n<html lang="bn">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>আমার প্রথম পেজ</title>\n</head>\n<body>\n  <h1>আমার প্রথম ওয়েবসাইট</h1>\n  <p>আমি HTML শেখা শুরু করেছি।</p>\n</body>\n</html>`,
 expectedOutput:"পেজে বড় শিরোনাম ‘আমার প্রথম ওয়েবসাইট’ এবং তার নিচে একটি অনুচ্ছেদ দেখা যাবে। Browser tab-এ ‘আমার প্রথম পেজ’ লেখা থাকবে।",
 commonMistakes:["দৃশ্যমান লেখা ভুল করে head-এর মধ্যে রাখা।","বাংলা অক্ষর বিকৃত হলে UTF-8 বাদ গেছে কি না দেখা।","Mobile-এ অস্বাভাবিক width হলে viewport meta পরীক্ষা করা।","Opening tag-এর closing tag ভুলে যাওয়া।"],
 exercises:["নিজের নাম দিয়ে h1 এবং পরিচয় দিয়ে দুটি p লেখো।","title বদলে browser tab-এর পরিবর্তন দেখো।","lang=bn-কে lang=en করলে অর্থ কী হয় লিখো।"],
 quiz:q("HTML-এর প্রধান কাজ কী?",["ওয়েবপেজের কাঠামো তৈরি","Database চালানো","Computer বন্ধ করা","শুধু রং বদলানো"],0,"HTML কাঠামো ও অর্থপূর্ণ content element তৈরি করে; CSS সাজায়।"),
 preview:"<h1>আমার প্রথম ওয়েবসাইট</h1><p>আমি HTML শেখা শুরু করেছি।</p>"
}),
"lesson-02": mk({
 goals:["Tag, Element ও Attribute আলাদা করতে পারবে","Opening ও closing tag বুঝবে","একটি element-এ attribute যোগ করতে পারবে"],
 easyExplanation:"Tag হলো angle bracket-এর মধ্যে লেখা চিহ্ন, যেমন `<p>`। Opening tag, content ও closing tag মিলে Element হয়: `<p>আমি পড়ি</p>`। Attribute element-কে অতিরিক্ত তথ্য দেয়; যেমন link-এর গন্তব্য `href`-এ লেখা হয়।",
 whyLearn:"ওয়েবপেজের প্রায় সব অংশ tag ও attribute দিয়ে তৈরি। এই তিনটি ধারণা পরিষ্কার হলে নতুন HTML element শেখা সহজ হবে।",
 analogy:"একটি বাক্সের গায়ে নাম ও ঠিকানার label লাগানোর মতো—বাক্সটি element, label-এর তথ্য attribute।",
 walkthrough:["`<p>` paragraph-এর opening tag।","`আমি পড়ি` হলো content।","`</p>` closing tag; slash দিয়ে বন্ধ বোঝায়।","`href` attribute link-এর destination দেয়।","`img`, `br`, `meta` হলো void element—এদের আলাদা closing tag লাগে না।"],
 exampleCode:`<p>আমি HTML শিখছি।</p>\n<a href="https://example.com">Example ওয়েবসাইট</a>\n<img src="photo.jpg" alt="একটি পাহাড়ের ছবি">`,
 expectedOutput:"একটি অনুচ্ছেদ, clickable link এবং photo.jpg পাওয়া গেলে ছবি দেখা যাবে। ছবি না এলে alt text বিকল্প বর্ণনা দেয়।",
 commonMistakes:["একটি tag খুলে বন্ধ না করা।","Attribute value quote-এর মধ্যে না রাখা।","ভুল image path লেখা।","Void element-এ অপ্রয়োজনীয় closing tag যোগ করা।"],
 exercises:["একটি external link তৈরি করো।","একটি image-এ src, alt ও width দাও।","Tag, Element ও Attribute-এর নিজস্ব উদাহরণ লেখো।"],
 quiz:q("href কী?",["HTML attribute","Browser","CSS color","Closing tag"],0,"href anchor element-এর গন্তব্য URL বা path নির্ধারণ করে।"),
 preview:"<p>আমি HTML শিখছি।</p><p><a href=\"https://example.com\">Example ওয়েবসাইট</a></p><img src=\"https://picsum.photos/360/150\" alt=\"নমুনা ছবি\">"
}),
"lesson-03": mk({
 goals:["h1–h6-এর স্তর বুঝবে","p ও br-এর পার্থক্য বলতে পারবে","Semantic element-এর প্রয়োজন বুঝবে"],
 easyExplanation:"Heading হলো পেজের শিরোনাম। `h1` সবচেয়ে গুরুত্বপূর্ণ, `h2` তার অধীন উপশিরোনাম। `p` একটি paragraph তৈরি করে। `br` শুধু line break দেয়; নতুন ভাব বা আলাদা অনুচ্ছেদ হলে নতুন p ব্যবহার করো।",
 whyLearn:"সঠিক heading structure পাঠক, screen reader এবং search engine-কে পেজের বিষয় বুঝতে সাহায্য করে।",
 analogy:"বইয়ের নাম, অধ্যায়ের নাম ও উপ-অধ্যায়ের মতো heading-এর স্তর সাজানো থাকে।",
 walkthrough:["প্রধান বিষয়ের জন্য h1 ব্যবহার করো।","প্রধান অংশের জন্য h2, তার ভেতরের বিষয় h3।","সাধারণ লেখার জন্য p ব্যবহার করো।","একই paragraph-এর মধ্যে line break দরকার হলে br।","header, main, section-এর মতো semantic element অংশের ভূমিকা জানায়।"],
 exampleCode:`<header>\n  <h1>আমার কলেজ</h1>\n  <p>জ্ঞান ও সাফল্যের পথে</p>\n</header>\n<main>\n  <section><h2>আমাদের সম্পর্কে</h2>\n    <p>আমাদের কলেজে অনেক শিক্ষার্থী পড়ে।</p>\n  </section>\n</main>`,
 expectedOutput:"‘আমার কলেজ’ বড় heading, নিচে পরিচিতি এবং পরে ‘আমাদের সম্পর্কে’ উপশিরোনাম দেখা যাবে।",
 commonMistakes:["শুধু বড় font পেতে heading ব্যবহার করা।","প্রতিটি লাইনের শেষে br দিয়ে paragraph নষ্ট করা।","Heading level এলোমেলো করা।"],
 exercises:["নিজের স্কুল নিয়ে h1, দুটি h2 ও তিনটি p লেখো।","একবার br ও একবার p ব্যবহার করে ফল তুলনা করো।"],
 quiz:q("প্রধান heading কোনটি?",["h1","h4","p","title"],0,"h1 পেজের প্রধান content heading বোঝায়; title browser tab-এর নাম।"),
 preview:"<header><h1>আমার কলেজ</h1><p>জ্ঞান ও সাফল্যের পথে</p></header><main><section><h2>আমাদের সম্পর্কে</h2><p>আমাদের কলেজে অনেক শিক্ষার্থী পড়ে।</p></section></main>"
}),
"lesson-04": mk({
 goals:["Link, Image, List ও Table-এর ব্যবহার বুঝবে","তথ্যকে list বা table-এ সাজাতে পারবে","একাধিক element মিলিয়ে একটি পেজ বানাতে পারবে"],
 easyExplanation:"Link অন্য পেজে নেয়, image ছবি দেখায়, list একাধিক বিষয় সাজায়, আর table সারি-কলামে সম্পর্কিত তথ্য দেখায়। একই পেজে এগুলো একসঙ্গে ব্যবহার করেই বাস্তব ওয়েবসাইট বানানো হয়।",
 whyLearn:"School notice, class routine, portfolio ও online catalog-এ এই চারটি উপাদান প্রায়ই লাগে।",
 analogy:"নোটিশ বোর্ডে link হলো দরজা, image হলো ছবি, list হলো করণীয় এবং table হলো রুটিন।",
 walkthrough:["a-এর href-এ গন্তব্য লেখো।","img-এর src-এ path ও alt-এ বর্ণনা দাও।","ক্রম জরুরি না হলে ul, ধাপ হলে ol।","প্রতিটি list item li দিয়ে লেখো।","Table-এর জন্য table, row-এর জন্য tr, heading cell th ও data cell td ব্যবহার করো।"],
 exampleCode:`<h2>কোর্স</h2><ul><li>HTML</li><li>CSS</li></ul>\n<h2>রুটিন</h2><table>\n<tr><th>দিন</th><th>বিষয়</th></tr>\n<tr><td>রবিবার</td><td>ICT</td></tr>\n</table>`,
 expectedOutput:"কোর্সের দুটি bullet item এবং দিন-বিষয় দিয়ে একটি দুই-কলামের টেবিল দেখা যাবে।",
 commonMistakes:["ul/ol-এর মধ্যে li না রাখা।","Table-এর row-তে cell সংখ্যা না মেলানো।","Layout সাজাতে table ব্যবহার করা।","Image alt বাদ দেওয়া।"],
 exercises:["তিনটি প্রিয় বিষয় দিয়ে ul বানাও।","তিন দিনের class routine table করো।","একটি link ও image যোগ করো।"],
 quiz:q("ক্রমিক তালিকার element কোনটি?",["ol","ul","table","img"],0,"ol ordered list; প্রতিটি item li দিয়ে লেখা হয়।"),
 preview:"<h2>আমাদের কোর্স</h2><ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul><h2>সাপ্তাহিক রুটিন</h2><table><tr><th>দিন</th><th>বিষয়</th></tr><tr><td>রবিবার</td><td>HTML</td></tr><tr><td>মঙ্গলবার</td><td>CSS</td></tr></table>"
}),
"lesson-05": mk({
 goals:["Form কী বুঝবে","label, input ও button ব্যবহার করতে পারবে","required ও input type-এর কাজ বুঝবে"],
 easyExplanation:"Form হলো তথ্য নেওয়ার জায়গা—যেমন নাম, ইমেইল বা মতামত। form হলো পুরো অংশ, label ঘরের নাম, input-এ ব্যবহারকারী লিখে, আর submit button তথ্য পাঠানোর চেষ্টা করে। শুধু HTML দিয়ে তথ্য database-এ সংরক্ষণ হয় না; server প্রয়োজন।",
 whyLearn:"Admission, contact, login, search ও feedback form-এর ভিত্তি HTML form।",
 analogy:"কাগজের আবেদনপত্রে নামের ঘর ও জমা দেওয়ার বোতামের মতো।",
 walkthrough:["form দিয়ে form শুরু করো।","প্রতিটি input-এর জন্য label লেখো।","label-এর for এবং input-এর id একই রাখো।","Email-এর জন্য type=email ব্যবহার করো।","required দিলে খালি ঘর submit করা যাবে না।","বাস্তবে server-side validation ও security লাগবে।"],
 exampleCode:`<form>\n<label for="name">নাম</label>\n<input id="name" name="name" required>\n<label for="email">ইমেইল</label>\n<input id="email" name="email" type="email" required>\n<button type="submit">জমা দাও</button>\n</form>`,
 expectedOutput:"নাম ও ইমেইলের input এবং জমা দেওয়ার button দেখা যাবে। required field খালি রাখলে browser সতর্ক করবে।",
 commonMistakes:["label-এর for ও input id না মেলা।","একই id একাধিক field-এ ব্যবহার।","Input-এ name বাদ দেওয়া।","HTML validation-কে server security মনে করা।"],
 exercises:["নাম, ইমেইল ও বয়সের form বানাও।","Textarea যোগ করে মতামত নাও।","required সরিয়ে আচরণ পরীক্ষা করো।"],
 quiz:q("label-এর for কোনটির সঙ্গে মেলে?",["input-এর id","input-এর name","form-এর action","button-এর class"],0,"Label-এর for সংশ্লিষ্ট input-এর id-এর সঙ্গে মেলাতে হয়।"),
 preview:"<h2>যোগাযোগ ফর্ম</h2><form><p><label for=\"name\">তোমার নাম</label><br><input id=\"name\" name=\"name\" required></p><p><label for=\"email\">ইমেইল</label><br><input id=\"email\" name=\"email\" type=\"email\" required></p><button type=\"submit\">জমা দাও</button></form>"
}),
"lesson-06": mk({
 goals:["head-এর কাজ বুঝবে","title, description, charset লিখতে পারবে","accessibility ও SEO-এর প্রাথমিক নিয়ম জানবে"],
 easyExplanation:"head অংশে browser-কে দেওয়া তথ্য থাকে—title, character set, viewport ও stylesheet link। body-তে ব্যবহারকারীর দেখা content থাকে। SEO পেজকে search-এ বুঝতে সাহায্য করে; accessibility বিভিন্ন মানুষকে পেজ ব্যবহার করতে দেয়।",
 whyLearn:"সঠিক title browser tab-এ পরিচয় দেয়, viewport mobile layout-এ সাহায্য করে এবং label/alt keyboard ও screen-reader ব্যবহারকারীদের সুবিধা দেয়।",
 analogy:"বইয়ের প্রচ্ছদে নাম-পরিচয় থাকে; ভেতরে মূল লেখা। head পরিচিতির তথ্য, body মূল content।",
 walkthrough:["প্রতিটি পেজে আলাদা অর্থপূর্ণ title রাখো।","UTF-8 charset বাংলা text ঠিক রাখে।","Viewport mobile screen-এর সঙ্গে পেজের width মেলায়।","Description পেজের সারাংশ দেয়।","Image-এ alt ও form input-এ label দাও।","Keyboard দিয়ে link ও form চালিয়ে দেখো।"],
 exampleCode:`<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>HTML শেখার পাঠ</title>\n<meta name="description" content="সহজ বাংলায় HTML শেখো।">\n</head>`,
 expectedOutput:"Metadata সরাসরি পেজের content হিসেবে দেখা যায় না; browser tab ও পেজের পরিচয় নিয়ন্ত্রণ করে।",
 commonMistakes:["সব পেজে একই title।","Viewport বাদ দেওয়া।","Image-এ alt না দেওয়া।","Placeholder-কে label মনে করা।"],
 exercises:["Portfolio পেজের title ও description লেখো।","একটি ছবির alt text লেখো।","Tab key দিয়ে link ও input পরীক্ষা করো।"],
 quiz:q("title কোথায় লেখা হয়?",["head","footer","table","nav"],0,"Title document metadata, তাই head element-এর মধ্যে থাকে।"),
 preview:"<h1>HTML শেখার পাঠ</h1><p>এই content body-তে আছে। Title ও metadata browser tab-এ কাজ করে।"
}),
"lesson-07": mk({
 goals:["HTML-এর সাধারণ ভুল ধরতে পারবে","Validator ও DevTools-এর কাজ জানবে","নিজের code পরীক্ষা করার checklist বানাতে পারবে"],
 easyExplanation:"Code লিখলেই কাজ শেষ নয়। Tag বন্ধ হয়েছে কি না, nesting ঠিক কি না, image path সঠিক কি না, link কাজ করে কি না—এসব পরীক্ষা করতে হয়। ভুল খুঁজে ঠিক করাই debugging।",
 whyLearn:"ছোট syntax mistake-ও layout নষ্ট করতে পারে। নিয়মিত পরীক্ষা করলে ভুল দ্রুত ধরা পড়ে।",
 analogy:"পরীক্ষার খাতা জমা দেওয়ার আগে যেমন বানান ও হিসাব মিলিয়ে দেখো, HTML-ও browser ও validator দিয়ে পরীক্ষা করতে হয়।",
 walkthrough:["File save করে browser refresh করো।","DevTools-এর Elements panel-এ structure দেখো।","Console-এ error বা warning পড়ো।","সব link ও image পরীক্ষা করো।","Mobile width-এ horizontal scroll আছে কি না দেখো।","প্রয়োজনে HTML validator ব্যবহার করো।"],
 exampleCode:`<!-- ভুল: closing tag নেই -->\n<p>আমি HTML শিখছি।\n\n<!-- ঠিক -->\n<p>আমি HTML শিখছি।</p>`,
 expectedOutput:"সঠিক example-এ paragraph element পরিষ্কারভাবে শুরু ও শেষ হয়েছে। Browser ভুল সামলে নিতে পারে, কিন্তু malformed code রেখে দেওয়া উচিত নয়।",
 commonMistakes:["একবারে অনেক পরিবর্তন করা।","Error না পড়ে অনুমান করা।","File save না করে refresh করা।","শুধু desktop-এ পরীক্ষা করা।"],
 exercises:["একটি closing tag বাদ দিয়ে output দেখো, পরে ঠিক করো।","একটি broken image path ঠিক করো।","নিজের ৬ ধাপের testing checklist লেখো।"],
 quiz:q("HTML ভুল পরীক্ষা করতে কোনটি কাজে লাগে?",["Validator ও DevTools","Music player","Paint","Calculator only"],0,"Validator markup পরীক্ষা করে; DevTools rendered structure ও console দেখায়।"),
 preview:"<h1>Code পরীক্ষা</h1><p>এই পেজে tag সঠিকভাবে বন্ধ করা হয়েছে।</p><img src=\"missing.jpg\" alt=\"ইচ্ছাকৃতভাবে অনুপস্থিত ছবি\"><p>ভুল path ঠিক করে দেখো।"
})
};

Object.assign(lessons, {
"html-comments": mk({
 goals:["HTML comment লিখতে পারবে","Comment ও visible text-এর পার্থক্য বুঝবে","কখন comment ব্যবহার করা উচিত জানবে"],
 easyExplanation:"Comment হলো code-এর ভেতরের নোট। Browser এটিকে পেজের সাধারণ content হিসেবে দেখায় না। তুমি বা অন্য developer পরে code পড়লে কেন একটি section লেখা হয়েছে তা বুঝতে comment ব্যবহার করতে পারো। তবে comment page source-এ থাকে—password বা secret কখনো comment-এ রেখো না।",
 whyLearn:"বড় HTML file-এ section চিহ্নিত করা, code-এর সাময়িক অংশ বন্ধ রাখা এবং future change-এর reminder রাখতে comment কাজে লাগে।",
 analogy:"খাতার পাশে নিজের জন্য লেখা ছোট reminder-এর মতো; মূল উত্তর নয়, কিন্তু পরে বুঝতে সাহায্য করে।",
 walkthrough:["`<!--` দিয়ে comment শুরু হয়।","Comment-এর লেখা শুরু ও শেষ চিহ্নের মাঝখানে থাকে।","`-->` দিয়ে comment শেষ হয়।","Comment browser-এ দেখা যায় না, কিন্তু View Source-এ দেখা যায়।","একটি comment-এর মধ্যে আরেকটি comment nested করো না।"],
 exampleCode:`<!-- Header section শুরু -->\n<header><h1>আমার কলেজ</h1></header>\n\n<!-- Notice section শুরু -->\n<section>\n  <h2>নোটিশ</h2>\n  <p>পরীক্ষার রুটিন প্রকাশিত হয়েছে।</p>\n</section>`,
 expectedOutput:"পেজে ‘আমার কলেজ’ ও ‘নোটিশ’ দেখা যাবে; comment-এর লেখা দেখা যাবে না।",
 commonMistakes:["`<!--` বা `-->` বাদ দেওয়া।","Comment-এ password বা API key রাখা।","Comment-কে নিরাপদে তথ্য লুকানোর পদ্ধতি মনে করা।"],
 exercises:["Header, main ও footer-এর আগে comment লেখো।","একটি paragraph comment করে browser-এ কী থাকে দেখো।"],
 quiz:q("HTML comment-এর সঠিক শুরু কোনটি?",["<!--","//","/*","##"],0,"HTML comment `<!--` দিয়ে শুরু এবং `-->` দিয়ে শেষ হয়।"),
 preview:"<h1>আমার কলেজ</h1><!-- এই নোট browser-এ দেখা যাবে না --><p>আমি HTML comment শিখছি।</p>"
}),
"html-styles": mk({
 goals:["HTML ও CSS-এর কাজ আলাদা করতে পারবে","Inline, internal ও external CSS চিনবে","একটি stylesheet যুক্ত করতে পারবে"],
 easyExplanation:"HTML বলে পেজে কী আছে—heading, paragraph, image। CSS বলে সেগুলো দেখতে কেমন—রং, font, spacing ও layout। CSS ছাড়া HTML কাজ করে; CSS যোগ করলে পেজের presentation নিয়ন্ত্রণ করা যায়।",
 whyLearn:"একই design বহু page-এ ব্যবহার, mobile layout এবং readable website তৈরির জন্য CSS প্রয়োজন।",
 analogy:"HTML হলো ঘরের দেয়াল-দরজা; CSS হলো রং, পর্দা, আলো ও আসবাবের সাজ।",
 walkthrough:["Inline CSS element-এর style attribute-এ লেখা হয়—ছোট test ছাড়া এড়িয়ে চলা ভালো।","Internal CSS একই HTML file-এর style element-এ থাকে।","External CSS আলাদা .css file-এ থাকে।","Head-এর মধ্যে link rel=stylesheet দিয়ে CSS যুক্ত করো।","বড় project-এ external CSS পরিবর্তন ও reuse করা সহজ।"],
 exampleCode:`<!-- index.html -->\n<link rel="stylesheet" href="style.css">\n<h1 class="welcome">স্বাগতম</h1>\n<p>আমি CSS শিখছি।</p>\n\n/* style.css */\n.welcome { color: #16734f; }\np { line-height: 1.7; }`,
 expectedOutput:"Heading সবুজ হবে; paragraph-এর line spacing বাড়বে। CSS আলাদা file-এ রাখলে একাধিক page একই style ব্যবহার করতে পারবে।",
 commonMistakes:["CSS file-এর path ভুল দেওয়া।","HTML style attribute-এ CSS selector লেখা।","External stylesheet link head-এর মধ্যে না রাখা।"],
 exercises:["style.css বানিয়ে heading-এর রং বদলাও।","একই style inline ও external CSS দিয়ে করে পার্থক্য লেখো।"],
 quiz:q("CSS-এর প্রধান কাজ কী?",["ওয়েবপেজের presentation সাজানো","Database তৈরি","IP address দেওয়া","HTML file compile"],0,"CSS রং, typography, spacing, layout ও responsive presentation নিয়ন্ত্রণ করে।"),
 preview:"<h1 style=\"color:#16734f\">স্বাগতম</h1><p style=\"line-height:1.8\">আমি HTML ও CSS শিখছি।</p><button>আরও জানো</button>"
}),
"html-formatting": mk({
 goals:["strong ও em-এর অর্থ বুঝবে","Semantic emphasis ও visual style আলাদা করবে","sub, sup, mark ও del ব্যবহার করতে পারবে"],
 easyExplanation:"কিছু HTML element লেখাকে bold, italic, highlight, ছোট বা উপরে/নিচে দেখাতে পারে। কিন্তু tag-এর অর্থও গুরুত্বপূর্ণ: `strong` গুরুত্ব বোঝায়, `em` জোর দেয়, `mark` highlight করে, `sub` নিচে এবং `sup` উপরে লেখে।",
 whyLearn:"সঠিক formatting পাঠককে গুরুত্বপূর্ণ তথ্য চিনতে এবং assistive technology-কে লেখার অর্থ বুঝতে সাহায্য করে।",
 analogy:"খাতায় সতর্কতার কথা bold করা, marker দিয়ে দাগ দেওয়া বা গণিতের power উপরে লেখা—HTML formatting একই কাজ করে।",
 walkthrough:["গুরুত্বপূর্ণ content-এর জন্য strong ব্যবহার করো।","বাক্যের কোনো শব্দে emphasis দিতে em ব্যবহার করো।","দৃষ্টিগত bold/italic দরকার হলে b/i আছে, তবে অর্থ অনুযায়ী tag বেছে নাও।","H₂O-এর 2-এর জন্য sub এবং x²-এর 2-এর জন্য sup।","পুরোনো/নতুন text তুলনায় del ও ins ব্যবহার করা যায়।"],
 exampleCode:`<p><strong>সতর্কতা:</strong> পাসওয়ার্ড কাউকে দেবে না।</p>\n<p>এখানে <em>বিশেষ জোর</em> দেওয়া হয়েছে।</p>\n<p>পানির সংকেত H<sub>2</sub>O। বর্গ x<sup>2</sup>।</p>\n<p>পুরোনো দাম <del>৫০০</del>, নতুন দাম <ins>৪০০</ins>।`,
 expectedOutput:"‘সতর্কতা’ bold, ‘বিশেষ জোর’ italic, H₂O-তে 2 নিচে এবং x²-এ 2 উপরে দেখা যাবে।",
 commonMistakes:["শুধু font বড় করতে heading tag ব্যবহার।","সব bold লেখার জন্য strong ব্যবহার।","sub ও sup গুলিয়ে ফেলা।"],
 exercises:["একটি সতর্কতা strong দিয়ে লেখো।","H2O ও x2-কে sub/sup দিয়ে সাজাও।","একটি পুরোনো-নতুন মূল্য del/ins দিয়ে দেখাও।"],
 quiz:q("অর্থগতভাবে গুরুত্বপূর্ণ লেখা কোন tag বোঝায়?",["strong","div","br","span"],0,"strong content-এর গুরুত্ব বোঝায়; শুধু visual bold-এর জন্য b আছে।"),
 preview:"<p><strong>সতর্কতা:</strong> নিরাপদ password ব্যবহার করো।</p><p>এখানে <em>বিশেষ জোর</em> দেওয়া হয়েছে।</p><p>পানি: H<sub>2</sub>O</p><p>বর্গ: x<sup>2</sup></p><p>নতুন মূল্য <del>৫০০ টাকা</del> <ins>৪০০ টাকা</ins></p>"
}),
"html-quotations": mk({
 goals:["q ও blockquote-এর ব্যবহার বুঝবে","উদ্ধৃতির উৎস cite দিয়ে চিহ্নিত করতে পারবে","উদ্ধৃতি ও নিজের লেখা আলাদা করতে পারবে"],
 easyExplanation:"অন্য কারও কথা উদ্ধৃত করলে HTML-এ quotation element ব্যবহার করা যায়। একই লাইনের ছোট quote-এর জন্য `q`; আলাদা বড় quote-এর জন্য `blockquote`; কোনো বই বা কাজের নাম বোঝাতে `cite` ব্যবহার হয়। Source reference-ও সত্যি ও নির্ভুল হতে হবে।",
 whyLearn:"পাঠক বুঝতে পারে কোন কথাটি তোমার নিজের, আর কোনটি অন্য উৎস থেকে উদ্ধৃত।",
 analogy:"রচনায় quote mark দিয়ে অন্যের কথা আলাদা করার মতো HTML quotation element দিয়ে quotation-এর অর্থ জানায়।",
 walkthrough:["ছোট inline quotation q দিয়ে লেখো।","বড় আলাদা উদ্ধৃতি blockquote দিয়ে লেখো।","cite element-এ বই বা কাজের নাম দিতে পারো।","blockquote-এর cite attribute source URL দিতে পারে; দৃশ্যমান source credit-ও দাও।"],
 exampleCode:`<p>শিক্ষক বললেন, <q>প্রতিদিন অনুশীলন করো।</q></p>\n<blockquote cite="https://example.com/learning">\n  শেখার সবচেয়ে ভালো উপায় হলো নিজে চেষ্টা করা।\n</blockquote>\n<p>— <cite>শেখার নোট</cite></p>`,
 expectedOutput:"ছোট quote একই লাইনে থাকবে; বড় quote আলাদা block হিসেবে দেখা যাবে। Browser quotation mark বা indentation style দিতে পারে।",
 commonMistakes:["শুধু indent পাওয়ার জন্য blockquote ব্যবহার।","উদ্ধৃতির উৎস উল্লেখ না করা।","cite-এ quote-এর body লিখে ফেলা; cite সাধারণত কাজের নাম বোঝায়।"],
 exercises:["একটি ছোট q quotation তৈরি করো।","একটি blockquote-এ বই থেকে ছোট উদ্ধৃতি লেখো এবং বইয়ের নাম cite করো।"],
 quiz:q("বড় আলাদা উদ্ধৃতির জন্য কোন element?",["blockquote","q","mark","code"],0,"blockquote হলো block-level quotation; q inline quotation।"),
 preview:"<p>শিক্ষক বলেন, <q>প্রশ্ন করতে ভয় পেও না।</q></p><blockquote>বোঝার জন্য পড়ো, শুধু নম্বরের জন্য নয়।</blockquote><p><cite>শ্রেণিকক্ষের নোট</cite></p>"
}),
"html-links": mk({
 goals:["a tag দিয়ে link বানাতে পারবে","Absolute ও relative URL আলাদা করতে পারবে","Page-এর নির্দিষ্ট section-এ যেতে link তৈরি করবে"],
 easyExplanation:"Hyperlink হলো click করে অন্য পেজ, file, email বা একই পেজের নির্দিষ্ট অংশে যাওয়ার সংযোগ। Link তৈরি হয় `a` tag দিয়ে এবং গন্তব্য `href` attribute-এ লেখা হয়। পূর্ণ URL হলো absolute link; নিজের project-এর অন্য file-এর path relative link।",
 whyLearn:"Navigation ছাড়া website-এর page-গুলো একে অন্যের সঙ্গে সংযুক্ত হয় না। Link ওয়েবের মূল ধারণাগুলোর একটি।",
 analogy:"বইয়ের সূচিতে অধ্যায়ের পাশে পৃষ্ঠা নম্বর থাকে; link click করলে সেই গন্তব্যে যাওয়া যায়।",
 walkthrough:["a element দিয়ে link শুরু করো।","href-এ পূর্ণ URL দিলে external link।","about.html-এর মতো path দিলে একই project-এর page।","#contact দিলে id=contact অংশে jump হয়।","নতুন tab-এর জন্য target=_blank দিলে rel=noopener noreferrer-ও দাও।","Email link-এর জন্য mailto: ব্যবহার করা যায়।"],
 exampleCode:`<a href="https://example.com">Example সাইট</a>\n<a href="about.html">আমাদের সম্পর্কে</a>\n<a href="#contact">যোগাযোগে যাও</a>\n<section id="contact"><h2>যোগাযোগ</h2></section>`,
 expectedOutput:"প্রথম link external site খোলে, দ্বিতীয়টি about.html পেজে যায়, তৃতীয়টি একই পেজের যোগাযোগ অংশে scroll করে।",
 commonMistakes:["href বাদ দেওয়া।","Relative path ভুল লেখা।","href-এ # না দিয়ে section id লেখা।","নতুন tab link-এ rel attribute বাদ দেওয়া।"],
 exercises:["একটি external ও দুটি internal link বানাও।","একই page-এ FAQ section-এ jump করার link তৈরি করো।","mailto link তৈরি করো।"],
 quiz:q("Link-এর গন্তব্য কোন attribute-এ থাকে?",["href","src","alt","width"],0,"Anchor element-এর href destination URL বা path।"),
 preview:"<h1>আমার লিংক</h1><p><a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">বাইরের ওয়েবসাইট</a></p><p><a href=\"#contact\">যোগাযোগে যাও</a></p><div style=\"height:180px\"></div><section id=\"contact\"><h2>যোগাযোগ</h2><p>info@example.com</p></section>"
}),
"html-images": mk({
 goals:["img element ব্যবহার করতে পারবে","src ও alt-এর কাজ বুঝবে","Image path ঠিক রাখতে পারবে এবং responsive image বানাবে"],
 easyExplanation:"Image দেখাতে `img` element ব্যবহার হয়। `src` বলে ছবির ফাইল কোথায়; `alt` ছবির অর্থ জানায়। ছবির file না এলে বা screen reader ব্যবহার করলে alt text কাজে লাগে। Img হলো void element—closing tag লাগে না।",
 whyLearn:"Product, মানুষ, জায়গা, diagram বা tutorial-এর screenshot দেখাতে image প্রয়োজন; alt accessibility-র জন্য জরুরি।",
 analogy:"চিঠির সঙ্গে ছবি পাঠালে ছবির পেছনে পরিচয় লিখে রাখার মতো alt হলো ছবির text description।",
 walkthrough:["img লিখে src attribute দাও।","Project folder-এর image হলে relative path দাও, যেমন images/college.jpg।","ছবিটি কী বোঝায় সংক্ষেপে alt-এ লেখো।","ছবির width/height বা CSS দিয়ে মাপ নিয়ন্ত্রণ করো।","max-width:100%; height:auto; দিলে image ছোট screen-এ overflow করবে না।"],
 exampleCode:`<img src="images/college.jpg" alt="কলেজের প্রধান ভবন" width="600">\n<style>img { max-width: 100%; height: auto; }</style>`,
 expectedOutput:"Path ঠিক থাকলে কলেজের ছবি দেখা যাবে। ছবি না এলে alt text ছবির বিষয় জানাবে।",
 commonMistakes:["ভুল folder path দেওয়া।","সব ছবিতে generic alt লেখা।","ছবির width screen-এর চেয়ে বড় রাখা।","Decorative image-এ অপ্রয়োজনীয় দীর্ঘ alt দেওয়া।"],
 exercises:["Project-এ images folder বানিয়ে ছবি রাখো।","ছবির alt text এমনভাবে লেখো যেন ছবি না দেখেও বোঝা যায়।","CSS দিয়ে ছবিকে mobile friendly করো।"],
 quiz:q("alt attribute-এর কাজ কী?",["ছবির বিকল্প বর্ণনা","ছবি upload","রং বদলানো","Link destination"],0,"Alt text ছবির অর্থ জানায় এবং accessibility-তে সহায়ক।"),
 preview:"<h1>আমার পছন্দের জায়গা</h1><img src=\"https://picsum.photos/640/320\" alt=\"প্রকৃতির একটি নমুনা ছবি\"><p>src পরিবর্তন করে নিজের image path বসাতে পারো।</p>"
}),
"html-favicon": mk({
 goals:["Favicon কী বুঝবে","PNG favicon যুক্ত করতে পারবে","Browser tab icon path পরীক্ষা করতে পারবে"],
 easyExplanation:"Browser tab-এ website নামের পাশে যে ছোট icon থাকে সেটি favicon। এটি site-কে দ্রুত চিনতে সাহায্য করে। একটি square icon file রেখে head অংশে `link rel=icon` দিয়ে browser-কে path জানানো হয়।",
 whyLearn:"অনেক tab খোলা থাকলেও favicon দেখে নিজের site চিনতে সহজ হয়; এটি ছোট brand identity।",
 analogy:"স্কুলের badge যেমন পরিচয় দেয়, favicon browser tab-এ website-এর পরিচয় দেয়।",
 walkthrough:["একটি square icon তৈরি করো, যেমন favicon.png।","ফাইলটি project-এর public বা root folder-এ রাখো।","Head-এ link rel=icon লিখে path দাও।","Cache-এর কারণে পুরোনো icon দেখালে hard refresh করো।"],
 exampleCode:`<head>\n  <title>আমার ওয়েবসাইট</title>\n  <link rel="icon" type="image/png" href="/favicon.png">\n</head>`,
 expectedOutput:"Browser tab-এ পেজের title-এর পাশে icon দেখা যাবে, যদি file path ও format ঠিক থাকে।",
 commonMistakes:["Favicon ভুল folder-এ রাখা।","File name-এর letter case না মেলানো।","Cache-এর জন্য পরিবর্তন না দেখলে path-কে ভুল ধরে নেওয়া।"],
 exercises:["নিজের initials দিয়ে 64×64 icon তৈরি করো।","PNG favicon যুক্ত করে browser tab-এ পরীক্ষা করো।"],
 quiz:q("Favicon সাধারণত কোথায় দেখা যায়?",["Browser tab","Keyboard key","Database row","শুধু footer"],0,"Favicon browser tab বা bookmark-এ website icon হিসেবে দেখা যায়।"),
 preview:"<h1>Favicon অনুশীলন</h1><p>Favicon head অংশে link rel=\"icon\" দিয়ে যুক্ত হয়। নিজের favicon path full document editor-এ পরীক্ষা করো।"
})
});

Object.assign(lessons, {
"html-tables": mk({
 goals:["table, tr, th ও td চিনবে","thead, tbody ও caption ব্যবহার করবে","rowspan ও colspan-এর পার্থক্য বুঝবে"],
 easyExplanation:"যে তথ্য সারি ও কলামে সাজানো স্বাভাবিক—যেমন class routine বা marksheet—সেটি table-এ দেখানো যায়। Table তথ্যের সম্পর্ক বোঝায়; CSS দিয়ে পরে border, spacing ও color সাজানো হয়।",
 whyLearn:"ফলাফল, সময়সূচি, মূল্যতালিকা ও পরিসংখ্যান স্পষ্টভাবে দেখাতে table লাগে।",
 analogy:"খাতার রুটিনের মতো—প্রথম row-তে দিনের নাম, পরের row-গুলোতে প্রতিদিনের বিষয়।",
 walkthrough:["table পুরো টেবিল তৈরি করে।","tr একটি row বা সারি তৈরি করে।","th heading cell; td সাধারণ data cell।","caption টেবিলের উদ্দেশ্য জানায়।","thead header ও tbody মূল row-গুলো গুছিয়ে রাখে।","colspan একাধিক column এবং rowspan একাধিক row জুড়ে cell বাড়ায়।"],
 exampleCode:`<table>\n  <caption>সাপ্তাহিক ক্লাস রুটিন</caption>\n  <thead><tr><th>দিন</th><th>বিষয়</th></tr></thead>\n  <tbody>\n    <tr><td>রবিবার</td><td>ICT</td></tr>\n    <tr><td>মঙ্গলবার</td><td>বাংলা</td></tr>\n  </tbody>\n</table>`,
 expectedOutput:"‘সাপ্তাহিক ক্লাস রুটিন’ caption-সহ দুই column-এর টেবিল দেখা যাবে। প্রতিটি row-তে দিন ও বিষয় থাকবে।",
 commonMistakes:["tr-এর বাইরে td রাখা।","Heading cell-এ th-এর বদলে সবসময় td ব্যবহার।","প্রতিটি row-তে cell সংখ্যা না মেলানো।","Page layout বানাতে table ব্যবহার।"],
 exercises:["তিন দিনের class routine table করো।","প্রথম row-এ colspan=2 দিয়ে শিরোনাম বানাও।","একটি cell-এ rowspan=2 দিয়ে ফল দেখো।"],
 quiz:q("Table-এর একটি row তৈরি করে কোন element?",["tr","td","th","caption"],0,"tr table row বোঝায়; এর ভেতরে th বা td cell থাকে।"),
 preview:"<h2>পরীক্ষার ফল</h2><table><caption>শিক্ষার্থীদের নম্বর</caption><thead><tr><th>নাম</th><th>ICT</th><th>বাংলা</th></tr></thead><tbody><tr><td>রিমা</td><td>৮৮</td><td>৮০</td></tr><tr><td>সাকিব</td><td>৯২</td><td>৮৫</td></tr></tbody></table>"
}),
"html-lists": mk({
 goals:["ul, ol, li ও dl ব্যবহার করতে পারবে","Nested list বানাতে পারবে","তথ্যের ধরন অনুযায়ী list বেছে নেবে"],
 easyExplanation:"একাধিক item সাজাতে list ব্যবহার হয়। ক্রম গুরুত্বপূর্ণ না হলে bullet list `ul`; ধাপের ক্রম জরুরি হলে numbered list `ol`। প্রতিটি item `li` দিয়ে লেখা হয়। শব্দ ও ব্যাখ্যা জোড়ায় দেখাতে dl, dt, dd আছে।",
 whyLearn:"Menu, shopping list, instructions, syllabus ও glossary-তে list খুব সাধারণ।",
 analogy:"বাজারের তালিকা bullet দিয়ে; রান্নার ধাপ ১, ২, ৩ করে লেখা—দুটির প্রয়োজন আলাদা।",
 walkthrough:["ul unordered বা bullet list বানায়।","ol ordered বা ক্রমিক list বানায়।","প্রতিটি item li দিয়ে লেখো।","li-এর ভেতরে আরেকটি ul দিলে nested list হয়।","dl-এর dt-তে শব্দ এবং dd-তে ব্যাখ্যা থাকে।"],
 exampleCode:`<h2>শেখার ধাপ</h2>\n<ol>\n  <li>HTML পড়ো</li><li>উদাহরণ চালাও</li><li>নিজে project বানাও</li>\n</ol>\n<h2>যা লাগবে</h2>\n<ul><li>কম্পিউটার</li><li>Browser</li></ul>`,
 expectedOutput:"শেখার ধাপে ১, ২, ৩ নম্বর দেখা যাবে; প্রয়োজনীয় জিনিসে bullet list থাকবে।",
 commonMistakes:["li বাদ দেওয়া।","সবসময় ul ব্যবহার করে ধাপের ক্রম হারানো।","Nested list ভুল জায়গায় রাখা।"],
 exercises:["নিজের daily routine ol দিয়ে লেখো।","তিনটি পছন্দের বই ul দিয়ে সাজাও।","HTML, CSS ও JavaScript-এর সংজ্ঞা dl দিয়ে দেখাও।"],
 quiz:q("Ordered list-এর element কোনটি?",["ol","ul","li","dl"],0,"ol item-গুলোকে ক্রমিকভাবে দেখায়।"),
 preview:"<h2>আজকের কাজ</h2><ol><li>পাঠ পড়া</li><li>Code লেখা</li><li>Output পরীক্ষা</li></ol><h2>প্রয়োজনীয় উপকরণ</h2><ul><li>Browser</li><li>Code editor</li><li>সময় ও মনোযোগ</li></ul>"
}),
"html-block-inline": mk({
 goals:["Block ও inline element-এর আচরণ বুঝবে","প্রচলিত element উদাহরণ চিনবে","প্রয়োজনীয় element বেছে নিতে পারবে"],
 easyExplanation:"কিছু element নতুন লাইনে শুরু হয়ে সাধারণত পুরো উপলব্ধ প্রস্থ নেয়—এগুলো block-level। কিছু element একই text line-এর ভেতরে থাকে—এগুলো inline। div ও p সাধারণত block; span, a ও strong সাধারণত inline।",
 whyLearn:"Element কীভাবে জায়গা নেয় বুঝলে CSS layout ও page structure শেখা সহজ হবে।",
 analogy:"Block নতুন খাতার লাইন শুরু করার মতো; inline একই লাইনে শব্দের মতো বসে।",
 walkthrough:["div generic block container।","p paragraph হিসেবে block-এর মতো আচরণ করে।","span inline container; বাক্যের ছোট অংশে style দিতে কাজে লাগে।","CSS display property দিয়ে আচরণ বদলানো যায়।","বাস্তব layout-এর জন্য Flexbox বা Grid-ও শেখো।"],
 exampleCode:`<div>\n  <p>এটি একটি অনুচ্ছেদ।</p>\n  <p>এখানে <span style="color:green">সবুজ শব্দ</span> আছে।</p>\n</div>`,
 expectedOutput:"দুটি paragraph আলাদা লাইনে থাকবে; সবুজ শব্দটি একই paragraph-এর ভেতরে থাকবে।",
 commonMistakes:["Inline element-এর ভেতরে ভুলভাবে block element রাখা।","div ও span-কে semantic meaning আছে মনে করা।","শুধু margin দিয়ে layout তৈরি করতে চেষ্টা করা।"],
 exercises:["div-এর মধ্যে দুটি paragraph রাখো।","একটি paragraph-এর একটি শব্দ span দিয়ে রঙিন করো।"],
 quiz:q("সাধারণত inline element কোনটি?",["span","div","section","p"],0,"span inline container; div, section ও p সাধারণত block-level।"),
 preview:"<div style=\"padding:16px;background:#e7f5ef\"><p>এটি প্রথম paragraph।</p><p>এখানে <span style=\"color:green;font-weight:bold\">সবুজ শব্দ</span> একই লাইনে আছে।</p></div>"
}),
"html-classes": mk({
 goals:["class-এর উদ্দেশ্য বুঝবে","একাধিক element-এ একই class প্রয়োগ করবে","CSS class selector লিখবে"],
 easyExplanation:"একই ধরনের অনেক element-এ একই style দিতে class ব্যবহার হয়। একটি class অনেক element-এ ব্যবহার করা যায়। CSS-এ class selector-এর আগে dot (`.`) থাকে। একই element-এ একাধিক class space দিয়ে লেখা যায়।",
 whyLearn:"Card, button, warning বা menu item একই design-এ রাখতে class খুব কাজে লাগে।",
 analogy:"একই class-এর শিক্ষার্থীরা একই শ্রেণিতে পড়ে; অনেক element-কে একই class দিলে এক style-এ সাজানো যায়।",
 walkthrough:["Element-এ class=\"notice\" লেখো।","CSS-এ .notice selector ব্যবহার করো।","একই class বহু element-এ ব্যবহার করো।","একটি element-এ class=\"card featured\" লিখলে দুটি class লাগবে।","Class name অর্থপূর্ণ রাখো।"],
 exampleCode:`<p class="notice">পরীক্ষার রুটিন প্রকাশিত হয়েছে।</p>\n<p class="notice">ফি জমার শেষ দিন শুক্রবার।</p>\n<style>.notice { background:#e6f6ee; padding:12px; }</style>`,
 expectedOutput:"দুটি paragraph-ই সবুজাভ background ও padding পাবে, কারণ class একই।",
 commonMistakes:["HTML class value-এর আগে dot লেখা।","CSS selector-এ dot বাদ দেওয়া।","একই কাজের জন্য অনেক duplicate class বানানো।"],
 exercises:["তিনটি card-এ card class দাও।","একটি element-এ card ও featured দুই class প্রয়োগ করো।"],
 quiz:q("CSS class selector কী দিয়ে শুরু হয়?",[".","#","@","&"],0,"Class selector dot দিয়ে; id selector hash দিয়ে শুরু হয়।"),
 preview:"<style>.card{padding:15px;margin:10px 0;background:#e7f5ef;border-radius:10px}.featured{border:2px solid #16845d}</style><div class=\"card\">সাধারণ card</div><div class=\"card featured\">বিশেষ card</div>"
}),
"html-id": mk({
 goals:["id-এর উদ্দেশ্য বুঝবে","unique id দিয়ে section target করবে","id ও class আলাদা করতে পারবে"],
 easyExplanation:"id একটি element-এর নির্দিষ্ট পরিচয়। একই HTML page-এ একই id একবার ব্যবহার করা উচিত। Link-এ `href=\"#contact\"` লিখে id=\"contact\" অংশে যাওয়া যায়। CSS-এ id selector-এর আগে # থাকে; একাধিক element-এর reusable style-এর জন্য class বেশি উপযুক্ত।",
 whyLearn:"Page navigation, JavaScript element খোঁজা এবং নির্দিষ্ট section-এ jump করতে id কাজে লাগে।",
 analogy:"প্রতিটি শিক্ষার্থীর আলাদা roll number-এর মতো id একটি element-কে নির্দিষ্ট করে।",
 walkthrough:["যে element target করবে তাতে id=\"contact\" দাও।","Link-এর href-এ #contact লেখো।","CSS-এ #contact দিয়ে style দাও।","একই page-এ duplicate id দিও না।","একই style বহু জায়গায় লাগলে class ব্যবহার করো।"],
 exampleCode:`<a href="#contact">যোগাযোগে যাও</a>\n<section id="contact">\n  <h2>যোগাযোগ</h2><p>info@example.com</p>\n</section>`,
 expectedOutput:"‘যোগাযোগে যাও’ link click করলে browser contact section-এ scroll করবে।",
 commonMistakes:["একই id বহু element-এ ব্যবহার।","href-এ # বাদ দেওয়া।","ID ও class selector গুলিয়ে ফেলা।"],
 exercises:["তিনটি section-এর জন্য top navigation link বানাও।","একটি id selector ও একটি class selector দিয়ে একই style তুলনা করো।"],
 quiz:q("CSS id selector-এর আগে কোন চিহ্ন বসে?",["#",".","!","*"],0,"Hash (#) দিয়ে id selector শুরু হয়।"),
 preview:"<nav><a href=\"#about\">পরিচিতি</a> · <a href=\"#contact\">যোগাযোগ</a></nav><div style=\"height:130px\"></div><section id=\"about\"><h2>পরিচিতি</h2><p>আমাদের সম্পর্কে।</p></section><div style=\"height:90px\"></div><section id=\"contact\"><h2>যোগাযোগ</h2><p>info@example.com</p></section>"
}),
"html-iframes": mk({
 goals:["iframe কী বুঝবে","অনুমোদিত page embed করতে পারবে","title ও নিরাপত্তা সতর্কতা জানবে"],
 easyExplanation:"iframe দিয়ে একটি page-এর ভেতরে আরেকটি webpage বা embed content দেখানো যায়—যেমন map বা video player। সব website iframe-এ খোলার অনুমতি দেয় না; browser security policy তা আটকাতে পারে।",
 whyLearn:"Map, video, document preview বা অনুমোদিত third-party content দেখাতে iframe ব্যবহৃত হয়।",
 analogy:"একটি ঘরের দেয়ালে অন্য ঘরের জানালা খুলে দেখার মতো—মূল page-এর ভেতরে আলাদা frame দেখা যায়।",
 walkthrough:["iframe element লিখো।","src-এ অনুমোদিত URL দাও।","Screen reader-এর জন্য অর্থপূর্ণ title দাও।","CSS দিয়ে width ও height responsive করো।","অজানা source embed করলে security ও privacy বিবেচনা করো।"],
 exampleCode:`<iframe src="https://example.com"\n  title="Example ওয়েবপেজ"\n  width="600" height="300">\n</iframe>`,
 expectedOutput:"সাইটটি iframe embedding অনুমতি দিলে frame-এর মধ্যে page দেখা যাবে। অনুমতি না থাকলে browser block করতে পারে—এটি সবসময় code-এর ভুল নয়।",
 commonMistakes:["iframe title বাদ দেওয়া।","Embed permission নেই এমন URL ব্যবহার।","Mobile width-এর জন্য frame responsive না করা।","অবিশ্বস্ত iframe-কে অপ্রয়োজনীয় permission দেওয়া।"],
 exercises:["একটি trusted video platform-এর embed code দিয়ে iframe বানাও।","iframe-কে 100% width ও responsive height দাও।"],
 quiz:q("iframe-এর title কেন দেওয়া হয়?",["Frame-এর বিষয় বোঝাতে","Video download করতে","CSS বন্ধ করতে","Database খোলার জন্য"],0,"Title frame-এর উদ্দেশ্য assistive technology-কে জানায়।"),
 preview:"<h2>Iframe উদাহরণ</h2><p>নিচের frame অনুমোদিত হলে Example website দেখাবে।</p><iframe src=\"https://example.com\" title=\"Example website preview\" style=\"width:100%;height:300px;border:1px solid #cbd5e1\"></iframe>"
}),
"html-javascript": mk({
 goals:["HTML-এ JavaScript যুক্ত করতে পারবে","defer-এর কাজ বুঝবে","Click event দিয়ে পেজ পরিবর্তন করবে"],
 easyExplanation:"HTML structure বানায়; JavaScript click, calculation, validation ও dynamic change করায়। Script আলাদা app.js file-এ রেখে `<script src=\"app.js\" defer></script>` দিয়ে যুক্ত করা যায়।",
 whyLearn:"JavaScript যোগ করলে button click বা form submit-এর মতো user action-এর প্রতিক্রিয়া দেওয়া যায়।",
 analogy:"HTML হলো দোকানের কাউন্টার, CSS সাজসজ্জা, JavaScript হলো বিক্রেতা—যিনি button চাপলে কাজ করেন।",
 walkthrough:["HTML-এ button ও target heading তৈরি করো।","JavaScript file তৈরি করো।","querySelector দিয়ে element খুঁজে বের করো।","addEventListener দিয়ে click শোনো।","Click হলে textContent বদলাও।","defer দিলে HTML parse হওয়ার পর external script চলে।"],
 exampleCode:`<h1 id="title">স্বাগতম</h1>\n<button id="change">লেখা বদলাও</button>\n<script>\nconst button = document.querySelector("#change");\nconst title = document.querySelector("#title");\nbutton.addEventListener("click", () => {\n  title.textContent = "তুমি সফল হয়েছ!";\n});\n</script>`,
 expectedOutput:"প্রথমে ‘স্বাগতম’ heading দেখা যাবে। Button click করলে heading বদলে ‘তুমি সফল হয়েছ!’ হবে।",
 commonMistakes:["ভুল id নির্বাচন করা, ফলে querySelector null দেয়।","Element তৈরি হওয়ার আগে script চালানো।","একটি ছোট project-এ HTML, CSS, JS এলোমেলোভাবে মিশিয়ে ফেলা।"],
 exercises:["Button click করলে paragraph text বদলাও।","দ্বিতীয় button দিয়ে background color বদলাও।"],
 quiz:q("Click event ধরতে কোন method ব্যবহার হয়?",["addEventListener","queryTable","href","styleSheet"],0,"addEventListener event শুনে callback function চালায়।"),
 preview:"<h1 id=\"title\">স্বাগতম</h1><button id=\"change\" onclick=\"document.getElementById('title').textContent='তুমি সফল হয়েছ!'\">লেখা বদলাও</button>"
}),
"html-file-paths": mk({
 goals:["Relative ও absolute path বুঝবে","Folder অনুযায়ী image ও page যুক্ত করবে","ভুল file path ঠিক করতে পারবে"],
 easyExplanation:"File path browser-কে বলে file কোথায় আছে। একই project-এর ভেতরে relative path, আর পূর্ণ address হলে absolute path। `./` বর্তমান folder এবং `../` এক ধাপ উপরের folder বোঝায়।",
 whyLearn:"Image, CSS, JavaScript ও internal page-এর path ভুল হলে resource load হবে না।",
 analogy:"বাসার ঠিকানা থেকে room-এ যাওয়ার রাস্তার মতো—কোন folder থেকে শুরু করছ তা জানা জরুরি।",
 walkthrough:["index.html-এর folder-কে starting point ধরো।","একই folder-এর about.html হলে href=about.html।","images folder-এর logo হলে src=images/logo.png।","Parent folder-এ যেতে ../ ব্যবহার করো।","GitHub Pages subfolder-এ deploy করলে root-relative path পরীক্ষা করো।"],
 exampleCode:`project/\n  index.html\n  about.html\n  style.css\n  images/logo.png\n\n<a href="about.html">পরিচিতি</a>\n<img src="images/logo.png" alt="আমাদের লোগো">`,
 expectedOutput:"About link একই project-এর about.html খুলবে; images folder থেকে logo load হবে।",
 commonMistakes:["image বনাম images folder-এর নাম না মেলা।","Windows backslash দিয়ে web path লেখা।","File extension বা uppercase/lowercase mismatch।","GitHub Pages path base না ভাবা।"],
 exercises:["Project folder tree আঁকো।","একটি CSS file ও image relative path দিয়ে যুক্ত করো।","Parent folder থেকে image আনতে path লেখো।"],
 quiz:q("`../` কী বোঝায়?",["এক ধাপ উপরের folder","বর্তমান folder-এর ভেতর","Root domain","Image file"],0,"../ হলো parent folder-এ ওঠার relative path notation।"),
 preview:"<h2>File Path অনুশীলন</h2><p>একই folder-এর link:</p><a href=\"https://example.com\">উদাহরণ link</a><p>নিজ project-এ images/logo.png path দিয়ে image যুক্ত করো।"
})
});

Object.assign(lessons, {
"html-head": mk({
 goals:["head element-এর কাজ বুঝবে","title, meta, stylesheet ও favicon যুক্ত করবে","head ও body-এর পার্থক্য বুঝবে"],
 easyExplanation:"`head` হলো document-এর পরিচিতি ও browser-কে দেওয়া তথ্যের জায়গা। এখানে title, character encoding, viewport, description, CSS link এবং favicon থাকে। ব্যবহারকারী যে heading, paragraph, image দেখে সেগুলো body-তে থাকবে।",
 whyLearn:"Head ঠিক না হলে বাংলা text বিকৃত হতে পারে, mobile-এ পেজ অস্বাভাবিক দেখাতে পারে, আর browser tab-এ ভুল title দেখা যায়।",
 analogy:"স্কুলের খাতার প্রথম পাতায় নাম, শ্রেণি ও রোল থাকে; পরে মূল লেখা। Head হলো পরিচিতি, body হলো মূল content।",
 walkthrough:["`<head>` খুলে metadata লেখো।","UTF-8 charset ও viewport meta রাখো।","প্রতিটি page-এর জন্য আলাদা title লেখো।","Description সংক্ষেপে পেজের বিষয় বোঝায়।","CSS ও favicon-এর path link দিয়ে যুক্ত করো।","`</head>`-এর পরে body শুরু করো।"],
 exampleCode:`<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>আমার কলেজ</title>\n  <meta name="description" content="কলেজের পরিচিতি ও নোটিশ।">\n  <link rel="stylesheet" href="style.css">\n  <link rel="icon" href="favicon.png">\n</head>`,
 expectedOutput:"এই metadata সাধারণত page-এর body-এর মতো দেখা যায় না; browser tab, layout এবং resource loading-এ প্রভাব ফেলে।",
 commonMistakes:["দৃশ্যমান heading head-এর মধ্যে রাখা।","একাধিক title লেখা।","CSS file path ভুল করা।","Meta description-কে page-এর visible text মনে করা।"],
 exercises:["নিজের portfolio-এর head section লেখো।","Title, description, favicon ও stylesheet link যোগ করো।"],
 quiz:q("Visible page content সাধারণত কোথায় থাকে?",["body","head","meta","title"],0,"মূল visible content body element-এর মধ্যে থাকে।"),
 preview:"<h1>Head ও Body</h1><p>এই content body-তে আছে। Title ও metadata browser tab এবং document-এর পরিচয় নিয়ন্ত্রণ করে।"
}),
"html-layout": mk({
 goals:["Header, nav, main, section, aside ও footer চিনবে","একটি semantic page layout বানাতে পারবে","প্রতিটি element-এর ভূমিকা বলতে পারবে"],
 easyExplanation:"একটি সাধারণ website-এ উপরে header, তার নিচে navigation, মাঝখানে main content, প্রয়োজনে পাশে aside, আর শেষে footer থাকে। এগুলো কেবল box নয়—প্রতিটি element পেজের একটি নির্দিষ্ট ভূমিকা বোঝায়।",
 whyLearn:"বড় পেজকে অংশে ভাগ করা, accessibility এবং code রক্ষণাবেক্ষণ সহজ করতে semantic layout কাজে লাগে।",
 analogy:"পত্রিকার মতো—masthead, বিভাগীয় menu, মূল খবর, পাশের খবর ও নিচের প্রকাশনা তথ্য।",
 walkthrough:["header পরিচিতি বা section-এর শিরোনাম রাখে।","nav গুরুত্বপূর্ণ navigation links রাখে।","main পেজের প্রধান content রাখে।","section বিষয়ভিত্তিক অংশ; সাধারণত heading থাকে।","aside সহায়ক বা পার্শ্ব তথ্য রাখে।","footer copyright, author বা contact তথ্য রাখতে পারে।"],
 exampleCode:`<header><h1>শিক্ষা পোর্টাল</h1></header>\n<nav><a href="#courses">কোর্স</a></nav>\n<main>\n  <section id="courses"><h2>আমাদের কোর্স</h2><p>HTML শেখা শুরু করো।</p></section>\n  <aside>নতুন শিক্ষার্থীদের নির্দেশনা</aside>\n</main>\n<footer>© ২০২৬ শিক্ষা পোর্টাল</footer>`,
 expectedOutput:"একটি পরিচিতি heading, navigation link, course section, সহায়ক aside এবং footer দেখা যাবে।",
 commonMistakes:["সবকিছু div দিয়ে বানিয়ে semantic element বাদ দেওয়া।","একাধিক unrelated main element রাখা।","Nav-এর ভেতর সব ধরনের content ঢোকানো।"],
 exercises:["নিজের কলেজের homepage-এর semantic structure বানাও।","একটি aside-এ গুরুত্বপূর্ণ নোট রাখো।"],
 quiz:q("পেজের প্রধান content-এর জন্য কোন element?",["main","footer","aside","head"],0,"main page-এর প্রধান unique content ধারণ করে।"),
 preview:"<header style=\"padding:12px;background:#e7f5ef\"><h1>আমার কলেজ</h1></header><nav><a href=\"#about\">পরিচিতি</a> · <a href=\"#notice\">নোটিশ</a></nav><main><section id=\"about\"><h2>পরিচিতি</h2><p>আমাদের কলেজে স্বাগতম।</p></section><aside class=\"note\">ভর্তি বিজ্ঞপ্তি প্রকাশিত হয়েছে।</aside><section id=\"notice\"><h2>নোটিশ</h2><p>পরীক্ষার রুটিন দেখো।</p></section></main><footer>© ২০২৬ আমার কলেজ</footer>"
}),
"html-responsive": mk({
 goals:["Responsive design-এর অর্থ বুঝবে","Viewport meta ও flexible image ব্যবহার করবে","Mobile, tablet ও desktop width পরীক্ষা করবে"],
 easyExplanation:"Responsive website screen-এর প্রস্থ অনুযায়ী নিজের layout বদলায়। Desktop-এ পাশাপাশি card mobile-এ একটির নিচে একটি হতে পারে। ছবিও container-এর বাইরে যাওয়া উচিত নয়।",
 whyLearn:"অনেক শিক্ষার্থী ফোন দিয়ে শেখে। Mobile layout ঠিক না হলে লেখা ছোট, button চাপা কঠিন এবং horizontal scroll হতে পারে।",
 analogy:"একটি ব্যাগের মাপ অনুযায়ী বই সাজানোর মতো—screen ছোট হলে layout-ও নতুনভাবে সাজাতে হয়।",
 walkthrough:["Head-এ viewport meta যোগ করো।","Container-এর width সীমিত ও margin auto রাখো।","Image-এ max-width:100% ও height:auto দাও।","Media query দিয়ে ছোট screen-এ column বদলাও।","320px, tablet ও desktop width-এ পরীক্ষা করো।"],
 exampleCode:`<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n.cards { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }\nimg { max-width:100%; height:auto; }\n@media(max-width:650px) { .cards { grid-template-columns:1fr; } }\n</style>`,
 expectedOutput:"বড় screen-এ তিনটি card পাশাপাশি থাকবে; 650px-এর কম screen-এ এক কলামে চলে আসবে।",
 commonMistakes:["Fixed width দিয়ে mobile overflow তৈরি করা।","Viewport meta বাদ দেওয়া।","Image-এর width সীমাহীন রাখা।","শুধু নিজের ফোনে পরীক্ষা করা।"],
 exercises:["তিনটি card-এর grid বানিয়ে mobile-এ এক কলাম করো।","একটি image responsive করো।","320px, 768px ও 1440px-এ পরীক্ষা করো।"],
 quiz:q("Responsive image-এর জন্য কোন CSS উপকারী?",["max-width:100%","width:2000px","position:fixed","display:none"],0,"max-width:100% ছবিকে parent container-এর বাইরে যেতে বাধা দেয়।"),
 preview:"<style>.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.card{padding:20px;background:#e7f5ef;border-radius:10px}@media(max-width:650px){.cards{grid-template-columns:1fr}}</style><h1>Responsive Card</h1><p>Preview-এর width ছোট করে দেখো।</p><div class=\"cards\"><div class=\"card\">প্রথম</div><div class=\"card\">দ্বিতীয়</div><div class=\"card\">তৃতীয়</div></div>"
}),
"html-computer-code": mk({
 goals:["pre ও code element-এর কাজ বুঝবে","Code snippet পাঠযোগ্যভাবে দেখাতে পারবে","HTML reserved character escape করবে"],
 easyExplanation:"Tutorial-এ code দেখাতে `<code>` element ব্যবহার হয়। একাধিক line-এর code হলে `<pre><code>...</code></pre>` ব্যবহার করলে space ও line break আগের মতো থাকে। Code-এর ভেতরে `<` বা `>` থাকলে HTML entity দিয়ে দেখাতে হয়, নইলে browser tag ভেবে render করতে পারে।",
 whyLearn:"Programming শেখার পেজে code যেন ঠিকভাবে পড়া, বোঝা ও copy করা যায়, তাই এই element দরকার।",
 analogy:"সাধারণ paragraph চিঠির লেখা; code block হলো খাতার আলাদা অংশ, যেখানে indentation ও line break-ও গুরুত্বপূর্ণ।",
 walkthrough:["ছোট inline code-এর জন্য code ব্যবহার করো।","একাধিক line হলে pre-এর মধ্যে code রাখো।","`<h1>`-এর মতো tag text হিসেবে দেখাতে `&lt;h1&gt;` লেখো।","অপ্রয়োজনীয় indentation রাখলে output-এ বাড়তি space আসতে পারে।"],
 exampleCode:`<p>JavaScript-এ <code>console.log()</code> output দেখায়।</p>\n<pre><code>const name = "Rafi";\nconsole.log(name);</code></pre>`,
 expectedOutput:"console.log() inline code হিসেবে দেখা যাবে; নিচের দুই line আলাদা line ও indentation ধরে রাখবে।",
 commonMistakes:["Code example-এ `<`/`>` escape না করা।","pre-এর মধ্যে বাড়তি indentation দিয়ে output অগোছালো করা।","Code-কে paragraph-এর মতো render করা।"],
 exercises:["একটি paragraph-এ inline code দেখাও।","তিন লাইনের code pre/code দিয়ে দেখাও।","`<div>` tag-কে text হিসেবে দেখাও।"],
 quiz:q("Line break ও whitespace ধরে রাখে কোন element?",["pre","p","strong","a"],0,"pre preformatted text-এর whitespace ধরে রাখে।"),
 preview:"<p>HTML heading tag হলো <code>&lt;h1&gt;</code>।</p><pre><code>const number = 10;\nconsole.log(number);</code></pre>"
}),
"html-semantics": mk({
 goals:["Semantic HTML-এর অর্থ বুঝবে","কাজ অনুযায়ী element বেছে নিতে পারবে","div-এর পরিবর্তে semantic tag ব্যবহারের সুবিধা জানবে"],
 easyExplanation:"Semantic element-এর নাম ও গঠন তার কাজ বোঝায়। nav navigation, main প্রধান content, article স্বতন্ত্র লেখা, footer নিচের তথ্য বোঝায়। div একটি generic container—নিজে নির্দিষ্ট অর্থ দেয় না।",
 whyLearn:"Semantic markup code পড়তে সহজ করে, assistive technology-কে structure জানায় এবং page maintenance সহজ করে।",
 analogy:"বাক্সে ‘বই’, ‘খেলনা’ বা ‘কাগজ’ লেখা label থাকলে ভেতরে কী আছে বোঝা যায়। Semantic tag হলো element-এর label।",
 walkthrough:["Page-এর পরিচিতির জন্য header ব্যবহার করো।","Navigation link nav-এ রাখো।","প্রধান content main-এ রাখো।","স্বতন্ত্র post বা লেখা article-এ রাখো।","বিষয়ভিত্তিক অংশ section; সহায়ক side content aside।","শুধু generic wrapper প্রয়োজন হলে div।"],
 exampleCode:`<article>\n  <header><h2>HTML শেখার উপকারিতা</h2></header>\n  <p>HTML ওয়েবপেজের কাঠামো নির্ধারণ করে।</p>\n  <footer>লেখক: CodeAtlas</footer>\n</article>`,
 expectedOutput:"একটি article section দেখা যাবে যার মধ্যে heading, paragraph ও লেখক-পরিচিতি আছে।",
 commonMistakes:["সব section-কে article বানানো।","শুধু style পাওয়ার জন্য semantic tag ব্যবহার।","Heading ছাড়া section তৈরি করা।"],
 exercises:["একটি blog post semantic article দিয়ে বানাও।","Page-এ header, nav, main ও footer যোগ করো।"],
 quiz:q("Navigation link-এর জন্য কোন semantic element?",["nav","aside","article","mark"],0,"nav navigation links-এর section বোঝায়।"),
 preview:"<header><h1>CodeAtlas ব্লগ</h1></header><nav><a href=\"#post\">লেখা</a></nav><main><article id=\"post\"><header><h2>আজকের HTML পাঠ</h2></header><p>Semantic HTML দিয়ে অর্থপূর্ণ কাঠামো তৈরি হয়।</p><footer>লেখক: শিক্ষার্থী</footer></article></main><footer>© CodeAtlas</footer>"
}),
"html-style-guide": mk({
 goals:["পাঠযোগ্য HTML format করতে পারবে","Indentation ও naming convention মানবে","Code consistency বজায় রাখবে"],
 easyExplanation:"Browser অগোছালো HTML-ও দেখাতে পারে, কিন্তু মানুষকে পড়তে ও পরিবর্তন করতে হলে code পরিষ্কার থাকা দরকার। Nested element এক ধাপ indent করো, attribute value quote-এর মধ্যে লেখো, অর্থপূর্ণ নাম ব্যবহার করো এবং অপ্রয়োজনীয় wrapper কমাও।",
 whyLearn:"পরিষ্কার code-এ ভুল খুঁজে পাওয়া সহজ; team-এর অন্য সদস্য ও ভবিষ্যতের তুমি নিজেও দ্রুত বুঝতে পারবে।",
 analogy:"গোছানো খাতায় শিরোনাম ও paragraph থাকলে পড়া সহজ; code formatting-ও একই কাজ করে।",
 walkthrough:["এক project-এ indentation-এর একই নিয়ম রাখো।","Tag lowercase লেখো ও attribute value quote করো।","Page-কে semantic section-এ ভাগ করো।","Image-এ alt, form-এ label ও link-এ বর্ণনামূলক text দাও।","Duplicated style ও অপ্রয়োজনীয় wrapper কমাও।"],
 exampleCode:`<main>\n  <section aria-labelledby="about-title">\n    <h2 id="about-title">আমাদের সম্পর্কে</h2>\n    <p>আমরা নতুন শিক্ষার্থীদের ওয়েব শেখাই।</p>\n  </section>\n</main>`,
 expectedOutput:"একটি পরিষ্কার section তৈরি হবে। Indentation দেখে কোন element কার ভেতরে আছে বোঝা যাবে।",
 commonMistakes:["একই file-এ tab ও space এলোমেলোভাবে মেশানো।","সব code এক লাইনে লেখা।","অস্পষ্ট link text ব্যবহার করা।"],
 exercises:["অগোছালো HTML indentation দিয়ে সাজাও।","একটি page-এর প্রতিটি section-এ heading ও meaningful id দাও।"],
 quiz:q("Indentation-এর সুবিধা কী?",["Structure বুঝতে সহজ হয়","HTML Python হয়","Image ছোট হয়","Internet speed বাড়ে"],0,"Indentation nested structure বোঝায় ও maintain করা সহজ করে।"),
 preview:"<main><section><h2>পরিষ্কার Code</h2><p>ছোট section, অর্থপূর্ণ নাম ও সঠিক indentation code পড়া সহজ করে।</p></section></main>"
}),
"html-entities": mk({
 goals:["HTML entity কেন প্রয়োজন বুঝবে","Reserved character text হিসেবে দেখাতে পারবে","Common entity চিনবে"],
 easyExplanation:"HTML-এ `<` ও `&`-এর মতো character-এর বিশেষ অর্থ আছে। এগুলো সাধারণ text হিসেবে দেখাতে entity লিখতে হয়। যেমন `<`-এর জন্য `&lt;`, `>`-এর জন্য `&gt;`, আর `&`-এর জন্য `&amp;`।",
 whyLearn:"HTML tutorial-এ tag syntax দেখানো, copyright sign বা special character লেখার জন্য entity প্রয়োজন।",
 analogy:"কোনো সংকেতকে সাধারণ লেখা হিসেবে দেখাতে আলাদা code ব্যবহার করার মতো entity কাজ করে।",
 walkthrough:["`&lt;` less-than sign।","`&gt;` greater-than sign।","`&amp;` ampersand।","`&quot;` quote এবং `&nbsp;` non-breaking space।","বাংলা text UTF-8-এ সরাসরি লেখা যায়; সব character entity করতে হয় না।"],
 exampleCode:`<p>HTML tag: &lt;p&gt;লেখা&lt;/p&gt;</p>\n<p>নাম: Rafi &amp; Fahim</p>\n<p>&copy; ২০২৬ CodeAtlas</p>`,
 expectedOutput:"Browser-এ `<p>লেখা</p>` text হিসেবে দেখা যাবে, HTML tag হিসেবে render হবে না।",
 commonMistakes:["Code example-এ `<`/`>` escape না করা।","বাংলা অক্ষর সব entity করা।","Entity-র semicolon বাদ দেওয়া।"],
 exercises:["`<div>` text হিসেবে দেখাও।","R&D এবং © symbol যুক্ত line লেখো।"],
 quiz:q("`<` text হিসেবে দেখানোর entity কোনটি?",["&lt;","&gt;","&amp;","&copy;"],0,"`&lt;` less-than character দেখায়।"),
 preview:"<h2>HTML Entity</h2><p>Tag: &lt;h1&gt;শিরোনাম&lt;/h1&gt;</p><p>Rafi &amp; Fahim</p><p>© ২০২৬ CodeAtlas</p>"
}),
"html-symbols-emojis": mk({
 goals:["Special symbol দেখাতে পারবে","Unicode-এর ধারণা বুঝবে","Emoji-কে একমাত্র তথ্যবাহক না করার কারণ জানবে"],
 easyExplanation:"বাংলা ও English অক্ষরের বাইরেও টাকা, গণিত, copyright, check mark ও emoji-এর মতো অনেক চিহ্ন দেখানো যায়। আধুনিক browser-এ Unicode character সরাসরি লেখা যায়; কিছু symbol-এর entity-ও আছে।",
 whyLearn:"মূল্য, গাণিতিক উদাহরণ, copyright notice ও status message-এ symbol কাজে লাগে।",
 analogy:"লেখার মধ্যে অক্ষরের পাশাপাশি চিহ্ন ও গণিতের sign ব্যবহার করার মতো।",
 walkthrough:["UTF-8 charset রাখো।","প্রয়োজনীয় Unicode symbol সরাসরি লিখে পরীক্ষা করো।","Entity প্রয়োজন হলে সঠিক named বা numeric reference ব্যবহার করো।","Emoji শুধু decoration হলে assistive technology যেন অপ্রয়োজনীয় শব্দ না পড়ে তা ভাবো।","Button-এর কাজ শুধু emoji দিয়ে বোঝিও না; text label দাও।"],
 exampleCode:`<p>দাম: ৳ ৫০০</p>\n<p>গণিত: ৫ &gt; ৩ এবং ২ &lt; ৪</p>\n<p>Copyright: &copy; ২০২৬</p>\n<p aria-label="সফল">✓ কাজ সম্পন্ন</p>`,
 expectedOutput:"টাকা, তুলনার চিহ্ন, copyright ও check mark দেখা যাবে।",
 commonMistakes:["UTF-8 charset বাদ দেওয়া।","সব browser emoji একভাবে দেখাবে ধরে নেওয়া।","Button-এ শুধু emoji রাখা।"],
 exercises:["মূল্যতালিকায় ৳ চিহ্ন ব্যবহার করো।","Success message-এ check mark-এর সঙ্গে text রাখো।"],
 quiz:q("বাংলা Unicode text-এর জন্য কোন charset প্রচলিত?",["UTF-8","RGB","JPEG","SQL"],0,"UTF-8 Unicode character encode করতে পারে; বাংলা অক্ষরও এতে সমর্থিত।"),
 preview:"<h2>বিশেষ চিহ্ন</h2><p>মূল্য: ৳ ৫০০</p><p>তুলনা: ৫ &gt; ৩</p><p>© ২০২৬ CodeAtlas</p><p>✓ কাজ সম্পন্ন</p>"
}),
"html-charsets": mk({
 goals:["Character encoding-এর প্রয়োজন বুঝবে","UTF-8 ঘোষণা করতে পারবে","Garbled text কেন হয় বুঝবে"],
 easyExplanation:"Computer text byte হিসেবে সংরক্ষণ করে। কোন byte কোন অক্ষর বোঝাবে তা encoding নির্ধারণ করে। HTML document-এ UTF-8 ঘোষণা করলে বাংলা, English ও অন্যান্য Unicode অক্ষর সঠিকভাবে দেখানো যায়—তবে file-টিও UTF-8 হিসেবে save করতে হবে।",
 whyLearn:"Encoding ভুল হলে বাংলা লেখা প্রশ্নবোধক চিহ্ন বা অদ্ভুত অক্ষর হয়ে যেতে পারে।",
 analogy:"একই সংকেতের ভাষা না জানলে চিঠি বোঝা যায় না; charset browser-কে সংকেতপদ্ধতি জানায়।",
 walkthrough:["HTML file UTF-8 encoding-এ save করো।","Head-এর শুরুতে meta charset=\"UTF-8\" রাখো।","বাংলা ও English text browser-এ পরীক্ষা করো।","পুরোনো file অন্য encoding-এ থাকলে editor থেকে UTF-8-এ convert করো।"],
 exampleCode:`<head>\n  <meta charset="UTF-8">\n  <title>বাংলা ওয়েবপেজ</title>\n</head>\n<body><p>আমি HTML শিখছি।</p></body>`,
 expectedOutput:"বাংলা text সঠিকভাবে দেখা যাবে, যদি source file-টিও UTF-8-এ save থাকে।",
 commonMistakes:["Meta charset লিখে file অন্য encoding-এ save রাখা।","Charset declaration অনেক দেরিতে লেখা।","Garbled text-কে CSS সমস্যা মনে করা।"],
 exercises:["বাংলা ও English মিলিয়ে paragraph লেখো।","File UTF-8-এ save করে browser-এ খোলো।"],
 quiz:q("বাংলা text-এর জন্য সাধারণত কোন charset ব্যবহার হয়?",["UTF-8","RGB","JPEG","SQL"],0,"UTF-8 Unicode encoding; বাংলা অক্ষর এতে সমর্থিত।"),
 preview:"<h1>বাংলা ও English</h1><p>আমি HTML শিখছি। This page uses UTF-8 character encoding.</p>"
}),
"html-url-encode": mk({
 goals:["URL encoding-এর প্রয়োজন বুঝবে","Query parameter চিনবে","Space ও special character encode হওয়ার ধারণা জানবে"],
 easyExplanation:"URL-এর কিছু character-এর বিশেষ অর্থ আছে। Space ও reserved character পাঠাতে percent-encoding ব্যবহার করা হয়; space অনেক URL context-এ `%20` হয়। `?` query শুরু করে এবং `&` একাধিক parameter আলাদা করে।",
 whyLearn:"Search term, filter ও বাংলা text-সহ URL তৈরি করতে encoding জানা কাজে লাগে।",
 analogy:"ঠিকানায় বিশেষ চিহ্নকে নির্দিষ্ট postal notation-এ লেখার মতো URL encoding character-কে নির্দিষ্ট রূপ দেয়।",
 walkthrough:["URL-এর scheme, host, path ও query চেনো।","`?` query শুরু করে; `&` parameter আলাদা করে।","Space ও reserved character percent-encoded হতে পারে।","JavaScript-এ query value encode করতে encodeURIComponent ব্যবহার করো।","পুরো URL ও query value-এর encoding এক নয়।"],
 exampleCode:`<a href="search.html?q=html%20tutorial">HTML Tutorial খুঁজো</a>\n<script>\n  const keyword = "বাংলা HTML";\n  console.log(encodeURIComponent(keyword));\n</script>`,
 expectedOutput:"Link-এ `q=html%20tutorial` query পাঠানো হবে; Console-এ বাংলা keyword-এর encoded form দেখা যাবে।",
 commonMistakes:["পুরো URL-কে একবারে query value হিসেবে encode করা।","একই value বারবার encode করা।","? ও &-এর কাজ গুলিয়ে ফেলা।"],
 exercises:["search.html?q=css link বানাও।","JavaScript দিয়ে ‘বাংলা কোর্স’ encode করো।"],
 quiz:q("URL query সাধারণত কোন চিহ্ন দিয়ে শুরু হয়?",["?","#","@","!"],0,"Path-এর পর ? দিয়ে query string শুরু হয়।"),
 preview:"<h2>URL Encoding</h2><p><a href=\"https://example.com/search?q=html%20tutorial\">HTML tutorial search link</a></p><p>Query string-এ space encoded থাকে।</p>"
})
});

Object.assign(lessons, {
"html-forms": mk({
 goals:["Form-এর action ও method বুঝবে","GET ও POST-এর মৌলিক পার্থক্য জানবে","fieldset ও legend দিয়ে input group করবে"],
 easyExplanation:"Form browser থেকে server-এ তথ্য পাঠানোর কাঠামো। `action` বলে তথ্য কোথায় যাবে; `method` বলে কী ধরনের HTTP request হবে। GET সাধারণত তথ্য query string-এ পাঠায়; POST request body-তে পাঠায়। শুধু HTML form বানালেই database-এ তথ্য জমা হয় না—server দরকার।",
 whyLearn:"Admission, search, registration, feedback ও contact form-এর ভিত্তি HTML form।",
 analogy:"আবেদনপত্র কোন অফিসে যাবে (action) এবং কোন পদ্ধতিতে জমা হবে (method)—form attribute সেই নির্দেশ দেয়।",
 walkthrough:["Form element দিয়ে input group শুরু করো।","Action-এ server endpoint লেখো।","Search বা filter-এর মতো non-sensitive request-এ GET উপযুক্ত হতে পারে।","তথ্য জমা বা পরিবর্তনের ক্ষেত্রে সাধারণত POST ব্যবহার হয়।","Fieldset related input একত্র করে; legend group-এর নাম দেয়।","Password GET URL-এ পাঠিও না; HTTPS ও server-side validation ব্যবহার করো।"],
 exampleCode:`<form action="/contact" method="post">\n  <fieldset>\n    <legend>যোগাযোগের তথ্য</legend>\n    <label for="name">নাম</label>\n    <input id="name" name="name" required>\n    <button type="submit">পাঠাও</button>\n  </fieldset>\n</form>`,
 expectedOutput:"একটি bordered group দেখা যাবে; তার legend ‘যোগাযোগের তথ্য’, নামের input ও submit button থাকবে। এই preview-তে real backend না থাকলে data server-এ জমা হবে না।",
 commonMistakes:["Form element না দিয়ে শুধু input রাখা।","Input-এর name না দেওয়া।","Password GET URL-এ পাঠানো।","Front-end validation-কে security ভাবা।"],
 exercises:["Contact form বানাও।","GET ও POST-এর পার্থক্য নিজের ভাষায় লেখো।","Fieldset ও legend দিয়ে related input group করো।"],
 quiz:q("Form-এর action কী নির্ধারণ করে?",["তথ্য কোথায় পাঠানো হবে","Input-এর রং","Browser-এর নাম","Table-এর row"],0,"Action form submission-এর destination নির্ধারণ করে।"),
 preview:"<h2>যোগাযোগ ফর্ম</h2><form><fieldset><legend>তোমার তথ্য</legend><p><label for=\"name\">নাম</label><br><input id=\"name\" name=\"name\" required></p><p><label for=\"email\">ইমেইল</label><br><input id=\"email\" name=\"email\" type=\"email\" required></p><button type=\"submit\">পাঠাও</button></fieldset></form><p>এই preview-তে backend নেই।</p>"
}),
"html-form-attributes": mk({
 goals:["action, method ও autocomplete বুঝবে","novalidate-এর প্রভাব জানবে","Form submission-এর destination নির্ধারণ করবে"],
 easyExplanation:"Form attribute browser-কে submit-এর সময় কী করতে হবে জানায়। Action গন্তব্য, method request method, autocomplete saved suggestion এবং target response কোথায় খুলবে তা নিয়ন্ত্রণ করতে পারে।",
 whyLearn:"Form সঠিকভাবে configure করলে user experience উন্নত হয় এবং data ঠিক endpoint-এ যায়।",
 analogy:"ফর্ম জমা দেওয়ার খামের গায়ে ঠিকানা, পাঠানোর পদ্ধতি ও ফেরত উত্তর কোথায় আসবে—এগুলো লেখা থাকার মতো।",
 walkthrough:["Action-এ endpoint লেখো।","GET বা POST বেছে নাও।","Autocomplete on/off দিয়ে browser suggestion নিয়ন্ত্রণ করো।","Novalidate browser-এর built-in validation বন্ধ করে—শুধু প্রয়োজন বুঝে ব্যবহার করো।","Submit button-এর formaction/formmethod form-এর default পরিবর্তন করতে পারে।"],
 exampleCode:`<form action="/search" method="get" autocomplete="on">\n  <label for="q">খুঁজতে চাও</label>\n  <input id="q" name="q" type="search">\n  <button type="submit">খুঁজো</button>\n</form>`,
 expectedOutput:"একটি search input ও button দেখা যাবে। Server থাকলে query parameter-সহ GET request পাঠানো হবে।",
 commonMistakes:["Input-এর name বাদ দেওয়া।","GET/POST কেন বেছে নিয়েছি না বোঝা।","novalidate দিয়ে validation বাদ দিয়ে দেওয়া।"],
 exercises:["GET search form বানাও।","একই form POST করলে server request কীভাবে আলাদা হবে লিখো।"],
 quiz:q("Autocomplete কী নিয়ন্ত্রণ করে?",["Browser-এর input suggestion","Image resize","Table merge","CSS color"],0,"Autocomplete browser-কে saved input suggestion দেখাতে বা বন্ধ করতে বলে।"),
 preview:"<h2>Search Form</h2><form action=\"https://example.com/search\" method=\"get\" autocomplete=\"on\"><label for=\"q\">কী খুঁজবে?</label><br><input id=\"q\" name=\"q\" type=\"search\"><button type=\"submit\">খুঁজো</button></form><p>বাস্তব backend ছাড়া search ফল আসবে না।</p>"
}),
"html-input-types": mk({
 goals:["Common input type চিনবে","তথ্যের সঙ্গে মিলিয়ে input type বেছে নেবে","Browser validation-এর সুবিধা বুঝবে"],
 easyExplanation:"একই input element বিভিন্ন ধরনের তথ্য নিতে পারে। Text সাধারণ লেখা, email email address, number সংখ্যা, date তারিখ এবং checkbox একাধিক option select করতে পারে। সঠিক input type দিলে mobile-এ উপযুক্ত keyboard এবং browser validation পাওয়া যায়।",
 whyLearn:"Form পূরণ সহজ হয়, ভুল input কমে এবং ব্যবহারকারী বুঝতে পারে কোন ধরনের তথ্য দিতে হবে।",
 analogy:"কাগজের form-এ নাম, তারিখ ও ফোন নম্বরের আলাদা ঘরের মতো input type-ও আলাদা কাজ করে।",
 walkthrough:["সাধারণ text-এর জন্য type=text।","Email-এর জন্য type=email।","সংখ্যার জন্য number; সীমা থাকলে min/max।","তারিখের জন্য date।","একাধিক পছন্দের জন্য checkbox; একই group থেকে একটি পছন্দের জন্য radio।","File নির্বাচন করতে type=file।"],
 exampleCode:`<label>নাম <input type="text"></label>\n<label>ইমেইল <input type="email"></label>\n<label>বয়স <input type="number" min="1" max="100"></label>\n<label>জন্মতারিখ <input type="date"></label>\n<label><input type="checkbox"> নিয়মে সম্মত</label>`,
 expectedOutput:"Text, email, number ও date-এর আলাদা input control এবং tick করা যায় এমন checkbox দেখা যাবে।",
 commonMistakes:["সব field-এ text ব্যবহার করা।","Radio input-এর একই group-এ আলাদা name দেওয়া।","Label বাদ দেওয়া।","Number input-এর সীমা যাচাই না করা।"],
 exercises:["নাম, email, বয়স ও জন্মতারিখ নিয়ে admission form বানাও।","তিনটি checkbox ও দুটি radio button তৈরি করো।"],
 quiz:q("Email address-এর জন্য কোন type?",["email","text-only","mailbox","url"],0,"type=email browser-কে email format যাচাই করতে সাহায্য করে।"),
 preview:"<h2>শিক্ষার্থী নিবন্ধন</h2><form><p><label>নাম <input type=\"text\"></label></p><p><label>ইমেইল <input type=\"email\"></label></p><p><label>বয়স <input type=\"number\" min=\"10\" max=\"100\"></label></p><p><label>জন্মতারিখ <input type=\"date\"></label></p><p><label><input type=\"checkbox\"> নিয়মে সম্মত</label></p></form>"
}),
"html-input-attributes": mk({
 goals:["required, placeholder, min, max ও maxlength বুঝবে","Input validation rule দেবে","readonly ও disabled আলাদা করবে"],
 easyExplanation:"Input attribute field-এর নিয়ম ঠিক করে। Required field বাধ্যতামূলক করে, placeholder hint দেখায়, min/max সংখ্যা সীমা দেয়, maxlength অক্ষর সীমা দেয়। Readonly মান edit করতে দেয় না; disabled field সাধারণত submit-এর অংশও হয় না।",
 whyLearn:"Form-এ ভুল ও অসম্পূর্ণ তথ্য কমাতে এবং user-কে সঠিক data দিতে সাহায্য করতে attribute দরকার।",
 analogy:"বয়সের ঘরে ১–১০০ দিতে বলা বা নাম ২–৪০ অক্ষরের মধ্যে রাখা—এই নিয়মগুলো attribute দিয়ে দেওয়া যায়।",
 walkthrough:["Required দিলে field খালি রাখা যাবে না।","Placeholder hint; এটি label-এর বিকল্প নয়।","Number input-এ min, max ও step ব্যবহার করো।","Text input-এ minlength ও maxlength ব্যবহার করো।","Pattern নির্দিষ্ট format-এর নিয়ম দিতে পারে।","Client validation-এর পাশাপাশি server-এও validate করো।"],
 exampleCode:`<label for="roll">রোল নম্বর</label>\n<input id="roll" name="roll" type="number" min="1" max="999" required>\n<label for="name">নাম</label>\n<input id="name" name="name" minlength="2" maxlength="40" placeholder="পূর্ণ নাম লেখো" required>`,
 expectedOutput:"রোল ১–৯৯৯-এর মধ্যে দিতে হবে। নাম খালি রাখা যাবে না এবং ২–৪০ অক্ষরের মধ্যে রাখতে হবে।",
 commonMistakes:["Placeholder-কে label মনে করা।","Client validation-কে security ভাবা।","Min/max সব input type-এ একইভাবে কাজ করবে ধরে নেওয়া।"],
 exercises:["Roll input-এ min=1 ও max=100 দাও।","নাম input-এ minlength ও maxlength দাও।","Readonly ও disabled আচরণ তুলনা করো।"],
 quiz:q("কোন attribute field বাধ্যতামূলক করে?",["required","placeholder","class","width"],0,"Required field না পূরণ করলে browser সাধারণত submit আটকে দেয়।"),
 preview:"<h2>Validation অনুশীলন</h2><form><p><label for=\"roll\">রোল (১–১০০)</label><br><input id=\"roll\" type=\"number\" min=\"1\" max=\"100\" required></p><p><label for=\"name\">নাম (২–৪০ অক্ষর)</label><br><input id=\"name\" minlength=\"2\" maxlength=\"40\" placeholder=\"পূর্ণ নাম\" required></p><button type=\"submit\">যাচাই করো</button></form>"
}),
"html-canvas": mk({
 goals:["Canvas element-এর কাজ বুঝবে","JavaScript দিয়ে 2D context পাবে","Rectangle ও circle আঁকতে পারবে"],
 easyExplanation:"Canvas হলো পেজের drawing area। HTML জায়গা তৈরি করে; JavaScript দিয়ে pixel-based drawing হয়—যেমন rectangle, circle, chart বা ছোট game graphic।",
 whyLearn:"Graph, diagram, ছোট game ও dynamic drawing বানাতে Canvas কাজে লাগে।",
 analogy:"সাদা drawing board হলো Canvas; JavaScript হলো হাতে থাকা brush ও রং।",
 walkthrough:["Canvas-এ width ও height দাও।","JavaScript-এ canvas element select করো।","getContext('2d') দিয়ে drawing context নাও।","fillStyle দিয়ে color এবং fillRect দিয়ে rectangle আঁকো।","Circle-এর জন্য beginPath ও arc ব্যবহার করো।","Canvas-এর drawing-এর text alternative রাখো।"],
 exampleCode:`<canvas id="board" width="320" height="160">Canvas সমর্থিত নয়।</canvas>\n<script>\nconst canvas = document.querySelector("#board");\nconst ctx = canvas.getContext("2d");\nctx.fillStyle = "#16845d";\nctx.fillRect(30, 25, 120, 70);\n</script>`,
 expectedOutput:"Canvas-এর মধ্যে সবুজ rectangle দেখা যাবে। Drawing area 320×160 pixel।",
 commonMistakes:["Canvas element না পেয়েই context call করা।","CSS width পাল্টে drawing resolution না বোঝা।","Canvas drawing-এর alternative description না রাখা।"],
 exercises:["একটি নীল circle আঁকো।","দুটি ভিন্ন রঙের rectangle আঁকো।","Drawing-এর নিচে text description লেখো।"],
 quiz:q("Canvas-এর 2D context পেতে কোন method?",["getContext('2d')","getCanvas()","drawHTML()","makeImage()"],0,"getContext('2d') canvas-এর 2D rendering context ফেরত দেয়।"),
 preview:"<h2>Canvas Drawing</h2><canvas id=\"board\" width=\"320\" height=\"160\" style=\"max-width:100%;border:1px solid #cbd5e1\">Canvas সমর্থিত নয়।</canvas><script>const c=document.querySelector('#board');const x=c.getContext('2d');x.fillStyle='#16845d';x.fillRect(25,25,120,70);x.beginPath();x.arc(220,75,35,0,Math.PI*2);x.fillStyle='#e4a33c';x.fill();</script>"
}),
"html-svg": mk({
 goals:["SVG কী বুঝবে","Inline SVG দিয়ে shape আঁকতে পারবে","SVG ও raster image-এর পার্থক্য জানবে"],
 easyExplanation:"SVG-এর পূর্ণরূপ Scalable Vector Graphics। Shape, line, path ও text-এর গাণিতিক বর্ণনা দিয়ে vector graphic তৈরি হয়। বড়-ছোট করলে সাধারণত pixel ভেঙে যায় না।",
 whyLearn:"Logo, icon, diagram ও chart নানা screen size-এ পরিষ্কার রাখতে SVG উপকারী।",
 analogy:"Pixel picture হলো ছোট রঙিন টালি; vector drawing হলো জ্যামিতির নির্দেশ—এখানে বৃত্ত আঁকো, এখানে রেখা টানো।",
 walkthrough:["svg element-এ viewBox দাও।","circle, rect, line বা path দিয়ে shape তৈরি করো।","fill ভরাটের রং; stroke রেখার রং।","অর্থবহ icon-এ accessible title বা aria-label দাও।","CSS width দিয়ে SVG responsive করো।"],
 exampleCode:`<svg viewBox="0 0 240 120" role="img" aria-label="বৃত্ত ও আয়তক্ষেত্র">\n  <circle cx="60" cy="60" r="35" fill="#16845d" />\n  <rect x="120" y="25" width="85" height="70" rx="8" fill="#4b79d8" />\n</svg>`,
 expectedOutput:"একটি সবুজ বৃত্ত ও একটি নীল rounded rectangle পাশাপাশি দেখা যাবে।",
 commonMistakes:["viewBox না দেওয়া।","Coordinate ভুল লেখা।","অর্থবহ graphic-এর accessible description বাদ দেওয়া।"],
 exercises:["একটি triangle আঁকো।","দুটি ভিন্ন রঙের circle তৈরি করো।","SVG-কে ছোট screen-এ পরীক্ষা করো।"],
 quiz:q("SVG বড় করলেও পরিষ্কার থাকে কেন?",["Vector description ব্যবহার করে","এটি video","এতে pixel double হয়","এটি database"],0,"SVG vector shape বর্ণনা করে; fixed pixel image নয়।"),
 preview:"<h2>SVG Shapes</h2><svg viewBox=\"0 0 300 150\" role=\"img\" aria-label=\"বৃত্ত ও আয়তক্ষেত্র\" style=\"width:100%;max-width:420px\"><circle cx=\"70\" cy=\"75\" r=\"45\" fill=\"#16845d\"/><rect x=\"145\" y=\"30\" width=\"110\" height=\"90\" rx=\"12\" fill=\"#4b79d8\"/></svg>"
})
});

Object.assign(lessons, {
"html-audio": mk({
 goals:["Audio element ব্যবহার করতে পারবে","controls ও source-এর কাজ বুঝবে","Fallback text ও accessible alternative দিতে পারবে"],
 easyExplanation:"HTML-এর audio element browser-এর মধ্যে audio playback দেয়। Controls দিলে play, pause ও volume control দেখা যায়। একাধিক source দিলে browser যে format support করে সেটি বেছে নিতে পারে।",
 whyLearn:"Podcast, lecture recording, pronunciation ও audio guide প্রকাশে এটি দরকার।",
 analogy:"ওয়েবপেজে ছোট audio player বসানোর মতো—HTML player তৈরি করে, source audio file-এর ঠিকানা দেয়।",
 walkthrough:["audio element লিখো।","controls দিলে browser player control দেখায়।","source-এ file path ও MIME type দাও।","Browser format না বুঝলে fallback text দেখাও।","Autoplay অযথা ব্যবহার করো না; user-এর নিয়ন্ত্রণ সম্মান করো।"],
 exampleCode:`<audio controls>\n  <source src="audio/lesson.mp3" type="audio/mpeg">\n  <source src="audio/lesson.ogg" type="audio/ogg">\n  তোমার browser audio সমর্থন করে না।\n</audio>`,
 expectedOutput:"Browser audio player দেখাবে। File path ও format সঠিক হলে play চাপলে audio চলবে।",
 commonMistakes:["Audio path ভুল দেওয়া।","Controls বাদ দেওয়া।","সব browser সব format সমর্থন করবে ধরে নেওয়া।","Autoplay দিয়ে user-কে বিরক্ত করা।"],
 exercises:["নিজের mp3 file দিয়ে player বানাও।","দুটি source format যোগ করো।"],
 quiz:q("Audio control দেখাতে কোন attribute?",["controls","href","poster","alt"],0,"controls browser-এর play/pause ও volume control দেখায়।"),
 preview:"<h2>Audio Player</h2><audio controls><source src=\"https://www.w3schools.com/html/horse.ogg\" type=\"audio/ogg\"><source src=\"https://www.w3schools.com/html/horse.mp3\" type=\"audio/mpeg\">তোমার browser audio সমর্থন করে না।</audio><p>নিজের audio file path দিয়ে পরীক্ষা করো।"
}),
"html-video": mk({
 goals:["Video element ব্যবহার করতে পারবে","controls, poster ও source বুঝবে","Caption ও transcript-এর গুরুত্ব জানবে"],
 easyExplanation:"Video element browser-এ video player তৈরি করে। Controls দিয়ে user play/pause করে; poster video শুরু হওয়ার আগে thumbnail দেখায়; source-এ video file-এর ঠিকানা ও type দেওয়া হয়। Caption দিলে শ্রবণ-সংক্রান্ত সীমাবদ্ধতা থাকা ব্যবহারকারীও ভিডিও বুঝতে পারে।",
 whyLearn:"Online lesson, product demo, tutorial ও announcement-এ video দরকার হয়।",
 analogy:"একটি video player-এর মতো—HTML player তৈরি করে, source clip দেয় এবং controls ব্যবহারকারীকে চালানোর নিয়ন্ত্রণ দেয়।",
 walkthrough:["video element-এ controls দাও।","এক বা একাধিক source যোগ করো।","Poster দিয়ে preview image দেখাও।","বাংলা caption-এর জন্য track element এবং VTT file ব্যবহার করো।","Video-র transcript বা summary রাখো।"],
 exampleCode:`<video width="480" controls poster="images/lesson-cover.jpg">\n  <source src="videos/lesson.mp4" type="video/mp4">\n  <track src="captions/bn.vtt" kind="captions" srclang="bn" label="বাংলা">\n  তোমার browser video সমর্থন করে না।\n</video>`,
 expectedOutput:"Browser video player ও poster দেখাবে। Video file পাওয়া গেলে play হবে; caption file ঠিক হলে বাংলা caption নির্বাচন করা যাবে।",
 commonMistakes:["Video path বা MIME type ভুল।","Controls না দেওয়া।","Caption বা transcript না রাখা।","Fixed width দিয়ে mobile overflow তৈরি করা।"],
 exercises:["MP4 player বানাও।","Poster image যোগ করো।","বাংলা VTT caption file যুক্ত করো।"],
 quiz:q("Video শুরুর আগে thumbnail দেখায় কোন attribute?",["poster","alt","href","charset"],0,"poster video element-এর preview image নির্ধারণ করে।"),
 preview:"<h2>Video Player</h2><video controls width=\"520\" poster=\"https://picsum.photos/520/280\" style=\"max-width:100%\"><source src=\"https://www.w3schools.com/html/mov_bbb.mp4\" type=\"video/mp4\">তোমার browser video সমর্থন করে না।</video><p>নিজের MP4 path বসিয়ে পরীক্ষা করো।"
}),
"html-object-embed": mk({
 goals:["object ও embed চিনবে","External resource embed-এর সীমা বুঝবে","Fallback content দিতে পারবে"],
 easyExplanation:"Object ও embed দিয়ে অন্য resource—যেমন document বা media—পেজে দেখানো যায়। তবে আধুনিক ওয়েবে অনেক ক্ষেত্রে resource-এর নিজস্ব element বা iframe বেশি উপযুক্ত। Browser ও device ভেদে support আলাদা হতে পারে।",
 whyLearn:"PDF বা embedded resource-এর পুরোনো code বুঝতে এবং fallback দেওয়া শিখতে এই topic দরকার।",
 analogy:"Notice board-এ আলাদা document লাগিয়ে দেওয়ার মতো—মূল page-এর মধ্যে বাইরের resource দেখানো হয়।",
 walkthrough:["কোন resource embed করবে ঠিক করো।","Object-এ data ও type দাও।","Embed-এ src ও type দাও।","Resource দেখা না গেলে fallback text বা download link রাখো।","অবিশ্বস্ত file embed করলে security বিবেচনা করো।"],
 exampleCode:`<object data="documents/notice.pdf" type="application/pdf" width="100%" height="420">\n  <p>PDF দেখা যাচ্ছে না। <a href="documents/notice.pdf">ডাউনলোড করো</a></p>\n</object>`,
 expectedOutput:"Browser PDF embed সমর্থন করলে frame-এ notice দেখাবে; না হলে download link দেখা যাবে।",
 commonMistakes:["সব browser একই embed support দেবে ধরে নেওয়া।","Fallback বাদ দেওয়া।","Resource path ভুল রাখা।"],
 exercises:["PDF object embed করে fallback link দাও।","Embed fail হলে user কী করবে তা লিখো।"],
 quiz:q("Embed fail করলে কী রাখা ভালো?",["Fallback text বা download link","কিছুই নয়","অজানা script","শুধু background"],0,"Fallback user-কে resource না দেখালে বিকল্প পথ দেয়।"),
 preview:"<h2>PDF Embed Example</h2><object data=\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\" type=\"application/pdf\" width=\"100%\" height=\"340\"><p>PDF দেখা যাচ্ছে না। <a href=\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\">PDF খোলো</a></p></object>"
}),
"html-web-storage": mk({
 goals:["localStorage ও sessionStorage আলাদা করবে","String data save/read করবে","Sensitive information browser storage-এ না রাখার কারণ বুঝবে"],
 easyExplanation:"Web Storage browser-এ key-value data রাখে। localStorage browser session শেষ হলেও থাকতে পারে; sessionStorage সাধারণত tab/session শেষ হলে মুছে যায়। Value string হিসেবে রাখা হয়; object রাখতে JSON stringify করতে হয়।",
 whyLearn:"Theme, ছোট draft বা user preference মনে রাখতে storage কাজে লাগে; password বা secret রাখার জন্য এটি নিরাপদ জায়গা নয়।",
 analogy:"localStorage নিজের drawer-এর মতো যেখানে পরে দরকারি ছোট note রাখা হয়; sessionStorage শুধু এই class-এর scratch paper-এর মতো।",
 walkthrough:["setItem দিয়ে key/value save করো।","getItem দিয়ে value পড়ো।","removeItem দিয়ে key মুছো।","Object হলে JSON.stringify ও JSON.parse ব্যবহার করো।","Password, token বা private key অপ্রয়োজনে browser storage-এ রেখো না।"],
 exampleCode:`localStorage.setItem("theme", "dark");\nconst savedTheme = localStorage.getItem("theme");\nconsole.log(savedTheme);\nlocalStorage.removeItem("theme");`,
 expectedOutput:"Console-এ dark দেখা যাবে; শেষের removeItem চালালে theme key মুছে যাবে।",
 commonMistakes:["Object সরাসরি save করার চেষ্টা।","JSON.parse-এর error handle না করা।","Password localStorage-এ রাখা।"],
 exercises:["Theme choice localStorage-এ save করো।","Page reload করে value আবার পড়ো।","একটি object JSON হিসেবে save/read করো।"],
 quiz:q("Web Storage-এ value সাধারণত কী?",["String","HTML element","Function","Database row"],0,"Web Storage API-তে value string; object হলে JSON serialize করতে হয়।"),
 preview:"<h2>Local Storage Demo</h2><p>এই lesson-এর code example-এ localStorage কীভাবে key ও value রাখে তা দেখা যাবে।</p><div style='padding:12px;background:#f2f5f9;border-radius:8px'><code>localStorage.setItem(&quot;theme&quot;, &quot;dark&quot;);</code><br><code>localStorage.getItem(&quot;theme&quot;);</code></div><p>নিরাপত্তার কারণে এই sandboxed preview-তে browser storage সরাসরি চালানো হচ্ছে না। নিজের secure website origin-এ চেষ্টা করো।</p>"
}),
"html-web-apis": mk({
 goals:["Web API কী বুঝবে","HTML element ও browser API-এর পার্থক্য জানবে","API ব্যবহারের আগে support ও permission বিবেচনা করবে"],
 easyExplanation:"Web API হলো browser-এর দেওয়া JavaScript interface। এর মাধ্যমে clipboard, location, storage, drag-and-drop বা notification-এর মতো browser/device সুবিধা ব্যবহার করা যায়। HTML element page structure তৈরি করে; API browser-এর ক্ষমতা ব্যবহারের পথ দেয়।",
 whyLearn:"Modern web app-এ location, file, clipboard বা storage-এর মতো সুবিধা নিতে API জানা প্রয়োজন।",
 analogy:"একটি building-এর আলাদা service desk-এর মতো—প্রতিটি Web API নির্দিষ্ট browser সুবিধার দরজা।",
 walkthrough:["কোন কাজের জন্য API দরকার নির্ধারণ করো।","Browser API support করে কি না পরীক্ষা করো।","Permission দরকার হলে কেন লাগবে user-কে বোঝাও।","Success ও error দুই অবস্থাই handle করো।","ব্যক্তিগত তথ্য অপ্রয়োজনে সংগ্রহ বা পাঠিও না।"],
 exampleCode:`if ("clipboard" in navigator) {\n  console.log("Clipboard API পাওয়া যাচ্ছে");\n} else {\n  console.log("এই browser-এ Clipboard API নেই");\n}`, 
 expectedOutput:"Clipboard API থাকলে প্রথম message, না থাকলে fallback message Console-এ আসবে।",
 commonMistakes:["সব API সব browser-এ থাকবে ধরে নেওয়া।","Permission না পেলে error handle না করা।","Support check বাদ দেওয়া।"],
 exercises:["navigator object-এর clipboard property পরীক্ষা করো।","Feature না থাকলে fallback message দেখাও।"],
 quiz:q("Web API সাধারণত কী দেয়?",["Browser capability ব্যবহারের interface","নতুন HTML tag","Database schema","Hardware"],0,"Web API browser/device-এর function ব্যবহারের JavaScript interface দেয়।"),
 preview:"<h2>Browser API Check</h2><button id=\"check\">Clipboard support দেখো</button><p id=\"result\">বোতামে চাপ দাও।</p><script>document.querySelector('#check').onclick=()=>{document.querySelector('#result').textContent=('clipboard' in navigator)?'এই browser-এ Clipboard API available।':'Clipboard API পাওয়া যায়নি।';};</script>"
}),
"html-editors": mk({
 goals:["Code Editor কী বুঝবে","HTML file তৈরি ও সঠিক extension-এ save করতে পারবে","Save, browser open এবং refresh-এর কাজ বুঝবে"],
 easyExplanation:"HTML লিখতে Word-এর মতো document editor নয়, code editor ব্যবহার করাই সুবিধাজনক। Code editor code-এর রং আলাদা করে, ভুল tag সহজে খুঁজতে সাহায্য করে এবং file ও folder একসঙ্গে পরিচালনা করতে পারে। তুমি VS Code, Notepad বা browser-এর online editor দিয়ে শুরু করতে পারো। এই পাঠে আমরা একটি `index.html` file বানিয়ে browser-এ খুলব।",
 whyLearn:"সঠিকভাবে file তৈরি ও save করতে না পারলে code ভালো হলেও browser-এ page দেখা যাবে না। Editor ও browser-এর কাজ আলাদা—editor-এ লেখা হয়, browser-এ output দেখা হয়।",
 analogy:"খাতায় লেখা হলো code লেখা; editor হলো ভালো কলম ও গুছানো খাতা; browser হলো শিক্ষক যিনি তোমার লেখা পড়ে ফল দেখান।",
 walkthrough:["একটি folder তৈরি করো, যেমন `my-first-site`। project-এর সব file এই folder-এ থাকবে।","Code editor-এ নতুন file খোলো।","ফাইলের নাম `index.html` দাও। `.html` হলো browser-কে HTML file চিনতে সাহায্য করা extension।","ফাইলটি UTF-8 encoding-এ save করো, যাতে বাংলা লেখা ঠিক থাকে।","HTML skeleton লেখার পর Ctrl + S দিয়ে save করো।","File Explorer থেকে index.html double-click করে browser-এ খোলো।","Editor-এ লেখা বদলে save করো, তারপর browser refresh দিয়ে নতুন output দেখো।"],
 exampleCode:`<!doctype html>\n<html lang="bn">\n<head>\n  <meta charset="UTF-8">\n  <title>আমার প্রথম পেজ</title>\n</head>\n<body>\n  <h1>আমি HTML শিখছি</h1>\n  <p>আজ আমি নিজে একটি HTML file তৈরি করেছি।</p>\n</body>\n</html>`,
 expectedOutput:"Browser-এ ‘আমি HTML শিখছি’ শিরোনাম এবং তার নিচে একটি অনুচ্ছেদ দেখা যাবে। Browser tab-এ ‘আমার প্রথম পেজ’ লেখা থাকবে।",
 commonMistakes:["ফাইলের নাম `index.html.txt` হয়ে যাওয়া।","Save না করে browser refresh করা।","বাংলা অক্ষর ভুল দেখালে UTF-8 charset না দেওয়া।","Word বা Google Docs-এ code লিখে formatting-সহ HTML হিসেবে save করা।"],
 exercises:["my-first-site নামে folder তৈরি করো।","index.html-এ নিজের নাম ও পরিচয় লিখে browser-এ খোলো।","শিরোনাম বদলে save ও refresh করে পরিবর্তন দেখো।","ফাইলের নাম ভুল করে index.html.txt করে দেখো browser কীভাবে নেয়, পরে ঠিক করো।"],
 quiz:q("HTML file-এর প্রচলিত extension কোনটি?",[".html",".docx",".mp3",".exe"],0,"HTML document সাধারণত .html বা .htm extension-এ save করা হয়।"),
 preview:"<h1>আমি HTML শিখছি</h1><p>আজ আমি নিজে একটি HTML file তৈরি করেছি।</p>"
}),
"html-colors": mk({
 goals:["CSS color কেন HTML-এর অংশ নয় তা বুঝবে","Color name, HEX ও RGB value চিনবে","Text ও background-এর contrast পরীক্ষা করবে"],
 easyExplanation:"ওয়েবপেজে লেখা বা box-এর রং বদলাতে CSS ব্যবহার করা হয়। HTML বলে কোন অংশটি heading বা paragraph; CSS বলে সেটি কোন রঙে দেখা যাবে। CSS-এ `color` text-এর রং বদলায়, আর `background-color` element-এর পেছনের রং বদলায়। রং লেখার কয়েকটি উপায় আছে—নামের মাধ্যমে, HEX code, RGB এবং HSL।",
 whyLearn:"শুধু সঠিক রং নয়, এমন রং বেছে নিতে হবে যাতে লেখা পড়া যায়। Background ও text-এর রং খুব কাছাকাছি হলে চোখে পড়তে কষ্ট হয়।",
 analogy:"সাদা কাগজে কালো কালি দিয়ে লেখা সহজে পড়া যায়; সাদা কাগজে হালকা হলুদ কালি পড়তে কঠিন। Website-এও text ও background-এর contrast জরুরি।",
 walkthrough:["প্রথমে HTML element তৈরি করো, যেমন h1 বা p।","CSS selector দিয়ে কোন element বদলাবে তা বেছে নাও।","`color` property text-এর রং বদলায়।","`background-color` property element-এর পেছনের অংশ রঙিন করে।","Named color যেমন green বা navy সহজে লেখা যায়।","HEX যেমন #16734f ছয়টি hexadecimal digit দিয়ে রং প্রকাশ করে।","RGB-তে red, green, blue channel-এর মান 0 থেকে 255-এর মধ্যে থাকে।","RGBA-তে alpha transparency যোগ হয়; HSLA-তে hue, saturation, lightness ও alpha থাকে।"],
 exampleCode:`<h1 class="headline">সবুজ শিরোনাম</h1>\n<p class="note">এটি হালকা সবুজ পটভূমির লেখা।</p>\n<style>\n  .headline { color: #16734f; }\n  .note {\n    background-color: rgb(231, 246, 237);\n    color: rgb(35, 55, 42);\n    padding: 12px;\n  }\n</style>`,
 expectedOutput:"শিরোনাম গাঢ় সবুজ হবে। অনুচ্ছেদের পেছনে হালকা সবুজ রং এবং লেখায় গাঢ় রং দেখা যাবে।",
 commonMistakes:["Text color বদলাতে ভুল করে background-color ব্যবহার।","HEX code-এ # বাদ দেওয়া বা digit ভুল লেখা।","Background ও text-এর contrast না দেখে রং নির্বাচন।","HTML attribute দিয়ে পুরোনো পদ্ধতিতে রং সেট করে আধুনিক CSS উপেক্ষা করা।"],
 exercises:["একটি h1-কে named color দিয়ে রঙিন করো।","একটি paragraph-এ HEX text color ও RGB background দাও।","একই background-এ তিনটি text color দিয়ে কোনটি সবচেয়ে পড়তে সহজ তা তুলনা করো।","RGBA দিয়ে হালকা transparent box তৈরি করো।"],
 quiz:q("CSS-এর কোন property লেখার রং বদলায়?",["color","background-image","font-family","border-width"],0,"color property element-এর text color নির্ধারণ করে; background-color পেছনের রং বদলায়।"),
 preview:"<h1 style=\"color:#16734f\">সবুজ শিরোনাম</h1><p style=\"background-color:rgb(231,246,237);color:rgb(35,55,42);padding:12px;border-radius:8px\">এটি হালকা সবুজ পটভূমির লেখা।</p>"
}),
"html-page-title": mk({
 goals:["title element কোথায় লিখতে হয় বুঝবে","Browser tab ও page heading-এর পার্থক্য বুঝবে","প্রতিটি page-এর বর্ণনামূলক title লিখতে পারবে"],
 easyExplanation:"HTML page-এর নাম নির্ধারণ করতে `head` অংশে `title` element লেখা হয়। এটি সাধারণত পেজের ভেতরে বড় করে দেখা যায় না; browser tab-এ, bookmark-এ এবং অনেক সময় search result-এ পেজের নাম হিসেবে ব্যবহৃত হয়। অন্যদিকে `h1` হলো body-এর ভেতরে থাকা দৃশ্যমান প্রধান heading। তাই title ও h1 একই জিনিস নয়।",
 whyLearn:"একটি website-এ Home, About, Contact—প্রতিটি page-এর title আলাদা হলে browser tab-এ page চেনা সহজ হয় এবং search engine-ও পেজের বিষয় বুঝতে পারে।",
 analogy:"বইয়ের প্রচ্ছদে বইয়ের নাম থাকে, আর ভেতরের প্রথম পাতায় অধ্যায়ের শিরোনাম থাকে। Browser tab-এর title হলো বইয়ের নাম; h1 হলো পৃষ্ঠার দৃশ্যমান শিরোনাম।",
 walkthrough:["HTML document-এর head element খুঁজে নাও।","head-এর ভিতরে `<title>` লিখে page-এর নাম বসাও।","Title opening ও closing tag-এর মধ্যে লিখবে।","Title সাধারণত browser tab-এ দেখা যায়।","Body-এর মধ্যে h1 লিখলে সেটি page-এর ভেতরে দেখা যায়।","প্রতিটি page-এর জন্য আলাদা, সংক্ষিপ্ত ও বিষয়ভিত্তিক title লেখো।"],
 exampleCode:`<!doctype html>\n<html lang="bn">\n<head>\n  <meta charset="UTF-8">\n  <title>আমাদের কলেজ | ভর্তি তথ্য</title>\n</head>\n<body>\n  <h1>ভর্তি তথ্য</h1>\n  <p>একাদশ শ্রেণিতে ভর্তির নিয়ম এখানে দেখো।</p>\n</body>\n</html>`,
 expectedOutput:"Browser tab-এ ‘আমাদের কলেজ | ভর্তি তথ্য’ দেখা যাবে। Page-এর মধ্যে বড় heading হবে ‘ভর্তি তথ্য’।",
 commonMistakes:["title element body-এর মধ্যে লেখা।","Title ও h1-কে একই element মনে করা।","সব page-এ একই title রাখা।","Title ফাঁকা বা শুধু ‘Page’ লেখা।"],
 exercises:["নিজের স্কুলের page-এর জন্য একটি title লিখো।","Title ও h1 আলাদা করে লিখে browser tab ও page-এ পরিবর্তন দেখো।","About ও Contact page-এর জন্য দুটি আলাদা title প্রস্তাব করো।"],
 quiz:q("Browser tab-এর page name কোন element নির্ধারণ করে?",["title","h1","header","meta name=viewport"],0,"title element head-এর মধ্যে থাকে এবং browser tab-এ page name হিসেবে ব্যবহৃত হয়।"),
 preview:"<div style=\"display:flex;align-items:center;gap:8px;margin:-6px -6px 20px;padding:10px 12px;background:#edf1f5;border:1px solid #d7dee7;border-radius:8px;color:#526077;font-size:12px\"><span style=\"width:8px;height:8px;border-radius:50%;background:#2e9b65\"></span> Browser tab: আমাদের কলেজ | ভর্তি তথ্য</div><h1>ভর্তি তথ্য</h1><p>এটি body-এর দৃশ্যমান h1। উপরের ছোট bar-টি title element-এর নাম দেখাচ্ছে।</p>"
}),
"html-accessibility": mk({
 goals:["Accessibility-এর অর্থ বুঝবে","Alt, label, heading ও keyboard focus ব্যবহার করবে","নিজের page keyboard দিয়ে পরীক্ষা করবে"],
 easyExplanation:"Accessibility মানে website এমনভাবে তৈরি করা যাতে দৃষ্টি, শ্রবণ, চলাচল বা অন্য সীমাবদ্ধতা থাকলেও মানুষ ব্যবহার করতে পারে। সঠিক heading, label, alt text, keyboard navigation এবং contrast বাধা কমায়।",
 whyLearn:"Website সবার জন্য হওয়া উচিত। Accessible structure mobile user, keyboard user ও screen reader user—সবাইকে সাহায্য করে।",
 analogy:"ভবনে সিঁড়ির পাশাপাশি ramp ও sign থাকলে বেশি মানুষ ঢুকতে পারে; website-এ accessible structure একইভাবে বাধা কমায়।",
 walkthrough:["Heading h1, h2, h3 অর্থপূর্ণ ক্রমে সাজাও।","অর্থপূর্ণ image-এ alt; decorative image-এ alt empty রাখো।","Form input-এর সঙ্গে label যুক্ত করো।","Tab/Enter/Space দিয়ে controls ব্যবহার করা যায় কি না দেখো।","Keyboard focus দৃশ্যমান রাখো।","শুধু রঙ দিয়ে error বা success বোঝিও না; text-ও দাও।"],
 exampleCode:`<label for="email">ইমেইল ঠিকানা</label>\n<input id="email" type="email" aria-describedby="email-help">\n<p id="email-help">যেমন: name@example.com</p>\n<img src="college.jpg" alt="কলেজের প্রধান ভবন">`,
 expectedOutput:"Input-এর নাম label থেকে বোঝা যাবে; help text input-এর সঙ্গে যুক্ত হবে; ছবির অর্থ alt text দিয়ে বোঝা যাবে।",
 commonMistakes:["Placeholder-কে label মনে করা।","অর্থপূর্ণ image-এ alt বাদ দেওয়া।","Click handler-সহ div-কে button-এর বদলে ব্যবহার।","Keyboard focus লুকানো।"],
 exercises:["Contact form-এর প্রতিটি input-এ label যোগ করো।","একটি অর্থপূর্ণ image-এর alt লেখো।","শুধু keyboard দিয়ে পুরো page ব্যবহার করো।"],
 quiz:q("Form input-এর accessible নাম দিতে কোনটি সহায়ক?",["label","শুধু placeholder","background color","margin"],0,"Label input-এর উদ্দেশ্য জানায় এবং programmatically input-এর সঙ্গে যুক্ত হয়।"),
 preview:"<h1>Accessible Form</h1><form><label for=\"email\">ইমেইল ঠিকানা</label><br><input id=\"email\" type=\"email\" aria-describedby=\"help\"><p id=\"help\">যেমন: name@example.com</p><button type=\"submit\">জমা দাও</button></form><p>Tab key দিয়ে input ও button-এ যাও।"
})
});

export function getHtmlTeaching(slug: string): HtmlTeaching | undefined {
  return lessons[slug];
}
export function getAllHtmlTeaching() {
  return Object.entries(lessons).map(([slug, teaching]) => ({ slug, teaching }));
}
export const htmlTeachingCount = Object.keys(lessons).length;
