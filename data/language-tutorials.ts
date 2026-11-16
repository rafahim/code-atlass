import { languages, type Language } from "./languages";
import { localizeLanguage } from "./bn";
import { courseChapters, languageChapterMap, getCourseChapter, stripChapterPrefix, stripLessonPrefix } from "./curriculum";

export type TutorialSection = {
  title: string;
  paragraphs: string[];
  code?: string;
  output?: string;
  lineNotes?: string[];
  note?: string;
};
export type TutorialQuiz = { question: string; options: string[]; answer: number; explanation: string };
export type TutorialLesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  sections: TutorialSection[];
  exercises: string[];
  quiz: TutorialQuiz;
  source: "master-course" | "original-bangla";
};
export type TutorialReference = { term: string; meaning: string; example: string };
export type TutorialProject = { title: string; level: string; brief: string; requirements: string[] };
export type TutorialCourse = {
  slug: string;
  name: string;
  description: string;
  category: string;
  level: string;
  setup: string;
  lessons: TutorialLesson[];
  references: TutorialReference[];
  projects: TutorialProject[];
  sourceNote: string;
};

type Profile = {
  setup: string;
  hello: string;
  helloOutput: string;
  variables: string;
  variablesNote: string;
  input: string;
  inputOutput: string;
  inputNote: string;
  operators: string;
  condition: string;
  conditionOutput: string;
  loop: string;
  loopOutput: string;
  fn: string;
  fnOutput: string;
  collection: string;
  collectionOutput: string;
  specialTitle: string;
  specialText: string;
  specialCode: string;
  specialOutput: string;
  errorCode: string;
  errorText: string;
  projectTitle: string;
  projectBrief: string;
  projectRequirements: string[];
  references: TutorialReference[];
};

// These profiles are original Bengali teaching material. They are not copied from W3Schools.
const profiles: Record<string, Profile> = {
  java: {
    setup: "JDK ইনস্টল করে `java --version` ও `javac --version` যাচাই করো। শেখার জন্য IntelliJ IDEA Community বা VS Code ব্যবহার করা যায়। Java source file সাধারণত `.java` extension-এ থাকে।",
    hello: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}', helloOutput: "Hello, Java!",
    variables: 'String name = "Mina";\nint age = 17;\ndouble gpa = 4.75;\nboolean passed = true;', variablesNote: "Java-তে variable ঘোষণার সময় type লিখতে হয়। `int` পূর্ণসংখ্যা, `double` দশমিক, `boolean` true/false এবং `String` text রাখে।",
    input: 'import java.util.Scanner;\n\nScanner input = new Scanner(System.in);\nSystem.out.print("তোমার নাম: ");\nString name = input.nextLine();\nSystem.out.println("স্বাগতম, " + name);', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`Scanner` keyboard থেকে data পড়ে। `nextLine()` পুরো লাইন নেয়; `nextInt()` integer নেয়। ব্যবহার শেষে Scanner বন্ধ করা ভালো।",
    operators: 'int a = 17, b = 5;\nSystem.out.println(a + b); // 22\nSystem.out.println(a % b); // 2\nSystem.out.println(a == b); // false',
    condition: 'int marks = 78;\nif (marks >= 80) {\n    System.out.println("A+");\n} else if (marks >= 70) {\n    System.out.println("A");\n} else {\n    System.out.println("আরও অনুশীলন করো");\n}', conditionOutput: "A", loop: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'public class Main {\n    static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(add(4, 6));\n    }\n}', fnOutput: "10",
    collection: 'import java.util.ArrayList;\n\nArrayList<String> subjects = new ArrayList<>();\nsubjects.add("ICT");\nsubjects.add("Physics");\nSystem.out.println(subjects.get(0));', collectionOutput: "ICT",
    specialTitle: "Class, Object ও Encapsulation", specialText: "Java object-oriented। Class হলো নকশা, আর object হলো সেই নকশা অনুযায়ী তৈরি বাস্তব instance। `private` দিয়ে data লুকিয়ে public method দিয়ে নিয়ন্ত্রিতভাবে ব্যবহার করা যায়।", specialCode: 'class Student {\n    private String name;\n    Student(String name) { this.name = name; }\n    String getName() { return name; }\n}\nStudent s = new Student("Nila");\nSystem.out.println(s.getName());', specialOutput: "Nila",
    errorCode: 'try {\n    int result = 10 / 0;\n} catch (ArithmeticException error) {\n    System.out.println("শূন্য দিয়ে ভাগ করা যায় না");\n}', errorText: "Java-তে exception হলে `try/catch` দিয়ে নির্দিষ্ট সমস্যা সামলানো যায়। সব exception নির্বিচারে গিলে ফেলবে না; ব্যবহারকারীকে প্রয়োজনীয় বার্তা দাও এবং মূল কারণ log করো।",
    projectTitle: "শিক্ষার্থীর ফলাফল তৈরির প্রোগ্রাম", projectBrief: "শিক্ষার্থীর নাম ও নম্বর নিয়ে grade হিসাব করে ফল দেখানোর console program তৈরি করো।", projectRequirements: ["Student class-এ নাম ও নম্বর রাখো।", "নম্বর ০–১০০-এর মধ্যে কি না যাচাই করো।", "if/else দিয়ে grade নির্ধারণ করো।", "কমপক্ষে তিনজন শিক্ষার্থীর ফল দেখাও।"],
    references: [{term:"class",meaning:"নতুন type বা object-এর নকশা ঘোষণা করে।",example:"class Student { }"},{term:"new",meaning:"সাধারণত object তৈরি করতে ব্যবহৃত হয়।",example:"new Student()"},{term:"static",meaning:"object ছাড়াই class-এর সঙ্গে যুক্ত member বোঝায়।",example:"static void main(String[] args)"},{term:"extends",meaning:"এক class থেকে আরেক class-এ inheritance।",example:"class Cat extends Animal"},{term:"implements",meaning:"কোনো interface-এর contract পূরণ করে।",example:"class A implements Runnable"},{term:"try / catch",meaning:"exception সামলানোর কাঠামো।",example:"try { } catch (Exception e) { }"}]
  },
  "c-sharp": {
    setup: ".NET SDK ইনস্টল করে `dotnet --version` চালাও। নতুন console app: `dotnet new console -n FirstApp`, তারপর folder-এ গিয়ে `dotnet run`।",
    hello: 'Console.WriteLine("Hello, C#!");', helloOutput: "Hello, C#!",
    variables: 'string name = "Rafi";\nint age = 18;\ndouble height = 1.72;\nbool isStudent = true;', variablesNote: "C# statically typed। Compiler variable-এর type পরীক্ষা করে। `var` লিখলে compiler initial value থেকে type অনুমান করে; `var` মানে dynamic type নয়।",
    input: 'Console.Write("তোমার নাম: ");\nstring? name = Console.ReadLine();\nConsole.WriteLine($"স্বাগতম, {name}");', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`Console.ReadLine()` text ফেরত দেয় এবং input না এলে null হতে পারে। দরকার হলে `int.TryParse()` দিয়ে নিরাপদে সংখ্যা রূপান্তর করো।",
    operators: 'int a = 17, b = 5;\nConsole.WriteLine(a + b); // 22\nConsole.WriteLine(a % b); // 2\nConsole.WriteLine(a == b); // False',
    condition: 'int marks = 78;\nif (marks >= 80) Console.WriteLine("A+");\nelse if (marks >= 70) Console.WriteLine("A");\nelse Console.WriteLine("আরও অনুশীলন করো");', conditionOutput: "A", loop: 'for (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine(i);\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'static int Add(int a, int b)\n{\n    return a + b;\n}\nConsole.WriteLine(Add(4, 6));', fnOutput: "10",
    collection: 'using System.Collections.Generic;\n\nvar subjects = new List<string> { "ICT", "Physics" };\nsubjects.Add("Math");\nConsole.WriteLine(subjects[0]);', collectionOutput: "ICT",
    specialTitle: "Nullable Type ও LINQ", specialText: "C#-এ nullable reference/type বোঝা গুরুত্বপূর্ণ: কোনো value অনুপস্থিত হতে পারে। LINQ collection-এর data filter, sort ও transform করতে দেয়।", specialCode: 'List<int> marks = new() { 65, 82, 91, 48 };\nvar passed = marks.Where(mark => mark >= 50);\nforeach (var mark in passed)\n{\n    Console.WriteLine(mark);\n}', specialOutput: "65\n82\n91",
    errorCode: 'if (int.TryParse("42", out int number))\n{\n    Console.WriteLine(number);\n}\nelse\n{\n    Console.WriteLine("সঠিক সংখ্যা দাও");\n}', errorText: "Input parse করার আগে ধরে নিও না যে ব্যবহারকারী সঠিক data দিয়েছে। `TryParse` ব্যর্থ হলে exception ছাড়াই false পাওয়া যায়। প্রয়োজন অনুযায়ী exception handling-ও ব্যবহার করো।",
    projectTitle: "শিক্ষার্থীর নম্বর ব্যবস্থাপক", projectBrief: "List ব্যবহার করে শিক্ষার্থীদের নম্বর রাখো, গড় বের করো এবং পাশ/ফেল দেখাও।", projectRequirements: ["Student নামে class বা record তৈরি করো।", "List-এ কয়েকজন শিক্ষার্থী রাখো।", "LINQ দিয়ে পাশ করা শিক্ষার্থী filter করো।", "অবৈধ নম্বর গ্রহণ কোরো না।"],
    references: [{term:"var",meaning:"Compiler-কে local variable-এর type অনুমান করতে দেয়।",example:"var count = 5;"},{term:"namespace",meaning:"সম্পর্কিত type-গুলো সংগঠিত করে।",example:"namespace SchoolApp"},{term:"class",meaning:"নিজস্ব object type তৈরি করে।",example:"class Student { }"},{term:"record",meaning:"Data-centric type তৈরিতে সুবিধাজনক।",example:"record Person(string Name);"},{term:"async / await",meaning:"Asynchronous কাজ সহজভাবে লেখে।",example:"await LoadAsync();"},{term:"LINQ",meaning:"Collection-এ query/transform চালায়।",example:"items.Where(x => x > 0)"}]
  },
  go: {
    setup: "Go install করে `go version` যাচাই করো। `go mod init example/hello` দিয়ে module শুরু করো। Go source file-এর extension `.go`।",
    hello: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}', helloOutput: "Hello, Go!",
    variables: 'package main\n\nimport "fmt"\n\nfunc main() {\n    name := "Mina"\n    age := 17\n    active := true\n    fmt.Println(name, age, active)\n}', variablesNote: "`:=` দিয়ে function-এর ভিতরে short declaration করা যায়। Go compile-time type system ব্যবহার করে; unused local variable ও import compiler error তৈরি করে।",
    input: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var name string\n    fmt.Print("তোমার নাম: ")\n    fmt.Scanln(&name)\n    fmt.Println("স্বাগতম,", name)\n}', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`fmt.Scanln` সাধারণ input নেয়। `&name` হলো variable-এর address, যেখানে input লেখা হবে। জটিল line বা whitespace input-এর জন্য `bufio.Reader` ব্যবহার করো।",
    operators: 'a, b := 17, 5\nfmt.Println(a + b) // 22\nfmt.Println(a % b) // 2\nfmt.Println(a == b) // false',
    condition: 'marks := 78\nif marks >= 80 {\n    fmt.Println("A+")\n} else if marks >= 70 {\n    fmt.Println("A")\n} else {\n    fmt.Println("আরও অনুশীলন করো")\n}', conditionOutput: "A", loop: 'for i := 1; i <= 5; i++ {\n    fmt.Println(i)\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'func add(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    fmt.Println(add(4, 6))\n}', fnOutput: "10",
    collection: 'subjects := []string{"ICT", "Physics"}\nsubjects = append(subjects, "Math")\nfmt.Println(subjects[0])', collectionOutput: "ICT",
    specialTitle: "Struct, Interface ও Error Value", specialText: "Go class-based inheritance ব্যবহার করে না। Struct দিয়ে data একত্রে রাখো, interface দিয়ে আচরণের contract প্রকাশ করো। অনেক function result-এর সঙ্গে error-ও ফেরত দেয়; সেটি স্পষ্টভাবে পরীক্ষা করতে হয়।", specialCode: 'type Student struct {\n    Name string\n    Marks int\n}\n\ns := Student{Name: "Nila", Marks: 85}\nfmt.Println(s.Name)', specialOutput: "Nila",
    errorCode: 'value, err := strconv.Atoi("42")\nif err != nil {\n    fmt.Println("সংখ্যা পড়া যায়নি:", err)\n    return\n}\nfmt.Println(value)', errorText: "Go-তে error সাধারণত return value হিসেবে পাওয়া যায়। `if err != nil` দিয়ে প্রতিটি গুরুত্বপূর্ণ error পরীক্ষা করো; error উপেক্ষা করলে সমস্যা গোপন থাকে।",
    projectTitle: "টার্মিনালে যোগাযোগের তালিকা", projectBrief: "নাম ও ফোন নম্বর রাখা, খোঁজা ও তালিকা দেখানোর ছোট terminal app বানাও।", projectRequirements: ["Contact struct তৈরি করো।", "Slice-এ একাধিক contact রাখো।", "নাম দিয়ে search করো।", "ফাঁকা নাম বা ফোন নম্বর reject করো।"],
    references: [{term: "package",meaning:"Go file-গুলোকে package-এ সংগঠিত করে।",example:"package main"},{term:"func",meaning:"Function ঘোষণা করে।",example:"func add(a, b int) int"},{term:":=",meaning:"Short variable declaration।",example:"name := \"Rafi\""},{term:"slice",meaning:"Flexible sequence of values।",example:"[]int{1, 2, 3}"},{term:"map",meaning:"Key-value collection।",example:"map[string]int{}"},{term:"go",meaning:"নতুন goroutine শুরু করে।",example:"go worker()"}]
  },
  rust: {
    setup: "Rustup দিয়ে Rust ও Cargo ইনস্টল করো। `rustc --version` এবং `cargo --version` যাচাই করো। নতুন project: `cargo new hello_rust`, চালাও `cargo run`।",
    hello: 'fn main() {\n    println!("Hello, Rust!");\n}', helloOutput: "Hello, Rust!",
    variables: 'fn main() {\n    let name = "Mina";\n    let mut score = 10;\n    score += 5;\n    println!("{}: {}", name, score);\n}', variablesNote: "Rust-এ `let` দিয়ে binding তৈরি হয়; default-এ immutable। বদলাতে হলে `mut` লাগে। Compiler অনেক type নিজে অনুমান করতে পারে।",
    input: 'use std::io;\n\nfn main() {\n    let mut name = String::new();\n    io::stdin().read_line(&mut name).expect("input error");\n    println!("স্বাগতম, {}", name.trim());\n}', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`read_line`-এ mutable String-এর reference দেওয়া হয়। `trim()` line ending ও অতিরিক্ত পাশের whitespace বাদ দেয়। `.expect()` error হলে panic করে; production code-এ ভালো error handling শেখো।",
    operators: 'let a = 17;\nlet b = 5;\nprintln!("{}", a + b); // 22\nprintln!("{}", a % b); // 2\nprintln!("{}", a == b); // false',
    condition: 'let marks = 78;\nif marks >= 80 {\n    println!("A+");\n} else if marks >= 70 {\n    println!("A");\n} else {\n    println!("আরও অনুশীলন করো");\n}', conditionOutput: "A", loop: 'for i in 1..=5 {\n    println!("{}", i);\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    println!("{}", add(4, 6));\n}', fnOutput: "10",
    collection: 'let mut subjects = vec!["ICT", "Physics"];\nsubjects.push("Math");\nprintln!("{}", subjects[0]);', collectionOutput: "ICT",
    specialTitle: "Ownership, Borrowing ও Reference", specialText: "Rust-এর বড় বৈশিষ্ট্য ownership। প্রতিটি value-এর একটি owner থাকে। Reference দিয়ে ধার নিয়ে ব্যবহার করা যায়; borrowing rule memory safety বজায় রাখতে সাহায্য করে, অনেক ক্ষেত্রে garbage collector ছাড়াই।", specialCode: 'fn length(text: &String) -> usize {\n    text.len()\n}\n\nfn main() {\n    let name = String::from("CodeAtlas");\n    println!("{}", length(&name));\n    println!("{}", name);\n}', specialOutput: "8\nCodeAtlas",
    errorCode: 'fn main() {\n    let value = Some(42);\n    match value {\n        Some(number) => println!("{}", number),\n        None => println!("কোনো মান নেই"),\n    }\n}', errorText: "Rust-এ `Option<T>` অনুপস্থিত value প্রকাশ করে এবং `Result<T, E>` সফলতা/ব্যর্থতা প্রকাশ করে। `unwrap()` দিয়ে error লুকিয়ে না রেখে `match`, `?` operator বা উপযুক্ত handling ব্যবহার করো।",
    projectTitle: "টার্মিনালে খরচের হিসাবরক্ষক", projectBrief: "খরচের তালিকা যোগ, মোট হিসাব ও category অনুযায়ী দেখানোর command-line app বানাও।", projectRequirements: ["Expense নামে struct তৈরি করো।", "Vec-এ খরচের record রাখো।", "প্রতিটি input-এর type ও range যাচাই করো।", "Result/Option ব্যবহার করে error সামলাও।"],
    references: [{term:"let",meaning:"নতুন variable binding তৈরি করে।",example:"let count = 5;"},{term:"mut",meaning:"Binding পরিবর্তনযোগ্য করে।",example:"let mut score = 0;"},{term:"fn",meaning:"Function ঘোষণা করে।",example:"fn add(a: i32, b: i32) -> i32"},{term:"&T",meaning:"Immutable reference।",example:"fn show(value: &String)"},{term:"Vec<T>",meaning:"পরিবর্তনশীল দৈর্ঘ্যের vector।",example:"vec![1, 2, 3]"},{term:"Result<T, E>",meaning:"সফল ফল বা error প্রকাশ করে।",example:"Result<i32, String>"}]
  },
  php: {
    setup: "PHP 8+ install করে `php -v` যাচাই করো। `index.php` নামে ফাইল তৈরি করে terminal-এ `php index.php` চালাও। Local web server: `php -S localhost:8000`।",
    hello: '<?php\necho "Hello, PHP!";\n?>', helloOutput: "Hello, PHP!",
    variables: '<?php\n$name = "Mina";\n$age = 17;\n$gpa = 4.75;\n$isStudent = true;\necho $name . " " . $age;\n?>', variablesNote: "PHP variable `$` দিয়ে শুরু হয়। সাধারণত type লিখতে হয় না; value থেকে runtime type নির্ধারিত হয়। `.` operator string জোড়া দেয়।",
    input: '<?php\n$name = trim(fgets(STDIN));\necho "স্বাগতম, " . $name . PHP_EOL;\n?>', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "Terminal script-এ `STDIN` থেকে line পড়া যায়। Web form-এ `$_GET` বা `$_POST` আসে—কিন্তু browser input-কে কখনো বিশ্বাস করবে না; validate ও sanitize করতে হবে।",
    operators: '$a = 17; $b = 5;\necho $a + $b . PHP_EOL; // 22\necho $a % $b . PHP_EOL; // 2\nvar_dump($a === $b); // false',
    condition: '$marks = 78;\nif ($marks >= 80) {\n    echo "A+";\n} elseif ($marks >= 70) {\n    echo "A";\n} else {\n    echo "আরও অনুশীলন করো";\n}', conditionOutput: "A", loop: 'for ($i = 1; $i <= 5; $i++) {\n    echo $i . PHP_EOL;\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'function add(int $a, int $b): int {\n    return $a + $b;\n}\necho add(4, 6);', fnOutput: "10",
    collection: '$student = [\n    "name" => "Nila",\n    "marks" => 85\n];\necho $student["name"];', collectionOutput: "Nila",
    specialTitle: "Associative Array ও Server-side Form", specialText: "PHP associative array-এ key দিয়ে value পাওয়া যায়। Web request এলে server PHP চালায়, form-এর data পড়ে এবং response তৈরি করে। শুধু client-side validation নিরাপত্তার জন্য যথেষ্ট নয়।", specialCode: '<?php\n$name = htmlspecialchars($_POST["name"] ?? "", ENT_QUOTES, "UTF-8");\nif ($name === "") {\n    echo "নাম লিখতে হবে";\n} else {\n    echo "স্বাগতম, " . $name;\n}\n?>', specialOutput: "উদাহরণ input: Rafi → স্বাগতম, Rafi",
    errorCode: '<?php\ntry {\n    $number = intdiv(10, 0);\n} catch (DivisionByZeroError $error) {\n    echo "শূন্য দিয়ে ভাগ করা যায় না";\n}\n?>', errorText: "PHP-তে warning, notice ও throwable আলাদা হতে পারে। Production-এ error screen-এ প্রকাশ না করে log করো। User input database query-তে সরাসরি জুড়বে না; PDO prepared statement ব্যবহার করো।",
    projectTitle: "ক্লাস নোটিশ বোর্ড", projectBrief: "Notice যোগ, তালিকা, edit ও delete করার ছোট PHP app পরিকল্পনা করো।", projectRequirements: ["HTML form দিয়ে notice নাও।", "Server-side validation করো।", "PDO prepared statement দিয়ে database access করো।", "Output দেখানোর সময় HTML escape করো।"],
    references: [{term:"$variable",meaning:"Variable-এর নামের আগে dollar sign থাকে।",example:"$name = 'Rafi';"},{term:"echo",meaning:"Output পাঠায়।",example:"echo 'Hello';"},{term:"function",meaning:"Reusable function ঘোষণা করে।",example:"function add($a, $b) {}"},{term:"foreach",meaning:"Array/iterable-এর item ধরে loop চালায়।",example:"foreach ($items as $item) {}"},{term:"$_GET / $_POST",meaning:"HTTP request-এর query/form data।",example:"$_POST['email']"},{term:"PDO",meaning:"Database access-এর consistent interface।",example:"$pdo->prepare($sql)"}]
  },
  ruby: {
    setup: "Ruby install করে `ruby -v` যাচাই করো। `hello.rb` নামে file বানিয়ে `ruby hello.rb` চালাও।",
    hello: 'puts "Hello, Ruby!"', helloOutput: "Hello, Ruby!",
    variables: 'name = "Mina"\nage = 17\ngpa = 4.75\nactive = true\nputs "#{name}: #{age}"', variablesNote: "Ruby-তে variable ঘোষণার আগে type লিখতে হয় না। সবকিছু object—সংখ্যা, string, array-ও। `#{...}` দিয়ে string interpolation করা যায়।",
    input: 'print "তোমার নাম: "\nname = gets.chomp\nputs "স্বাগতম, #{name}"', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`gets` keyboard থেকে line নেয়; `chomp` line ending সরায়। Input-কে number করতে `to_i` বা `to_f` ব্যবহার করা যায়—তবে invalid text হলে conversion কেমন হবে তা পরীক্ষা করো।",
    operators: 'a = 17\nb = 5\nputs a + b # 22\nputs a % b # 2\nputs a == b # false',
    condition: 'marks = 78\nif marks >= 80\n  puts "A+"\nelsif marks >= 70\n  puts "A"\nelse\n  puts "আরও অনুশীলন করো"\nend', conditionOutput: "A", loop: '5.times do |index|\n  puts index + 1\nend', loopOutput: "1\n2\n3\n4\n5",
    fn: 'def add(a, b)\n  a + b\nend\nputs add(4, 6)', fnOutput: "10",
    collection: 'subjects = ["ICT", "Physics"]\nsubjects << "Math"\nputs subjects[0]\nstudent = { name: "Nila", marks: 85 }\nputs student[:name]', collectionOutput: "ICT\nNila",
    specialTitle: "Block, Yield ও Enumerable", specialText: "Ruby-তে block হলো code-এর ছোট অংশ, যা method-এ পাঠানো যায়। `each`, `map`, `select`-এর মতো Enumerable method collection নিয়ে পরিষ্কারভাবে কাজ করতে সাহায্য করে।", specialCode: 'numbers = [2, 4, 6, 8]\ndoubled = numbers.map do |number|\n  number * 2\nend\nputs doubled.inspect', specialOutput: "[4, 8, 12, 16]",
    errorCode: 'begin\n  number = Integer("abc")\nrescue ArgumentError => error\n  puts "সঠিক integer দাও"\nensure\n  puts "কাজ শেষ"\nend', errorText: "Ruby exception হলে `begin/rescue` দিয়ে সামলানো যায়। খুব broad rescue দিয়ে সব error চেপে ফেলো না; কোন error প্রত্যাশিত সেটি ধরো।",
    projectTitle: "কাজের তালিকা ব্যবস্থাপক", projectBrief: "Terminal-এ task যোগ, তালিকা, complete ও delete করার ছোট app বানাও।", projectRequirements: ["Array বা Hash-এ task রাখো।", "Menu-এর জন্য loop ব্যবহার করো।", "Task সম্পন্ন হয়েছে কি না boolean দিয়ে রাখো।", "ভুল menu choice সামলাও।"],
    references: [{term:"puts",meaning:"Output দেখিয়ে নতুন line দেয়।",example:"puts 'Hello'"},{term:"gets.chomp",meaning:"User input line নেয় ও newline বাদ দেয়।",example:"name = gets.chomp"},{term:"def",meaning:"Method ঘোষণা করে।",example:"def add(a, b)"},{term:"do...end",meaning:"Block বা code group তৈরি করে।",example:"items.each do |item|"},{term:"Array",meaning:"ক্রমযুক্ত collection।",example:"[1, 2, 3]"},{term:"Hash",meaning:"Key-value collection।",example:"{name: 'Nila'}"}]
  },
  swift: {
    setup: "Swift toolchain বা Xcode-এ Swift Playground ব্যবহার করো। Terminal-এ `swift --version`; script চালাতে `swift main.swift`।",
    hello: 'print("Hello, Swift!")', helloOutput: "Hello, Swift!",
    variables: 'let name = "Mina"\nvar score = 10\nscore += 5\nlet isStudent = true\nprint(name, score, isStudent)', variablesNote: "`let` constant এবং `var` পরিবর্তনযোগ্য variable তৈরি করে। Swift type inference করে, তবে প্রয়োজন হলে `Int`, `String`, `Double` লিখে type ঘোষণা করা যায়।",
    input: 'print("তোমার নাম:", terminator: " ")\nif let name = readLine() {\n    print("স্বাগতম, \\(name)")\n}', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`readLine()` optional String ফেরত দেয়। তাই `if let` দিয়ে value আছে কি না unwrap করা নিরাপদ।",
    operators: 'let a = 17, b = 5\nprint(a + b) // 22\nprint(a % b) // 2\nprint(a == b) // false',
    condition: 'let marks = 78\nif marks >= 80 {\n    print("A+")\n} else if marks >= 70 {\n    print("A")\n} else {\n    print("আরও অনুশীলন করো")\n}', conditionOutput: "A", loop: 'for number in 1...5 {\n    print(number)\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'func add(_ a: Int, _ b: Int) -> Int {\n    return a + b\n}\nprint(add(4, 6))', fnOutput: "10",
    collection: 'var subjects = ["ICT", "Physics"]\nsubjects.append("Math")\nprint(subjects[0])\nlet marks = ["ICT": 85, "Math": 90]', collectionOutput: "ICT",
    specialTitle: "Optionals ও Value Type", specialText: "Swift-এ Optional বোঝায় কোনো value থাকতে পারে, আবার নাও থাকতে পারে। `?` optional type চিহ্নিত করে। `struct` value type; `class` reference type—দুটির আচরণ বোঝা জরুরি।", specialCode: 'let possibleAge: Int? = Int("18")\nif let age = possibleAge {\n    print("বয়স: \\(age)")\n} else {\n    print("বয়স দেওয়া হয়নি")\n}', specialOutput: "বয়স: 18",
    errorCode: 'enum InputError: Error { case empty }\nfunc check(_ text: String) throws {\n    if text.isEmpty { throw InputError.empty }\n}\ndo {\n    try check("")\n} catch {\n    print("ইনপুট ফাঁকা")\n}', errorText: "Swift-এ `throws` দিয়ে function error দিতে পারে এবং `do/catch` দিয়ে তা সামলানো যায়। Force unwrap `!` কেবল value নিশ্চিত থাকলে ব্যবহার করো।",
    projectTitle: "পড়ার সময় গণনার অ্যাপ", projectBrief: "বিষয়ভিত্তিক পড়ার সময় যোগ করে মোট সময় দেখানোর ছোট Swift console program বানাও।", projectRequirements: ["Subject নামে struct তৈরি করো।", "Dictionary বা Array-এ সময় রাখো।", "সময় ঋণাত্মক হলে reject করো।", "মোট সময় ও সবচেয়ে বেশি পড়া subject দেখাও।"],
    references: [{term:"let",meaning:"অপরিবর্তনীয় constant তৈরি করে।",example:"let name = 'Rafi'"},{term:"var",meaning:"পরিবর্তনযোগ্য variable তৈরি করে।",example:"var score = 0"},{term:"func",meaning:"Function ঘোষণা করে।",example:"func add(_ a: Int) -> Int"},{term:"?",meaning:"Optional type নির্দেশ করে।",example:"var age: Int?"},{term:"if let",meaning:"Optional value নিরাপদে unwrap করে।",example:"if let value = optionalValue"},{term:"struct",meaning:"Value type data structure।",example:"struct Student { }"}]
  },
  kotlin: {
    setup: "Kotlin Playground-এ browser থেকে শুরু করা যায়। স্থানীয়ভাবে JDK ও Kotlin compiler/IntelliJ IDEA ব্যবহার করো। Android app-এর জন্য Android Studio ও Kotlin project লাগে।",
    hello: 'fun main() {\n    println("Hello, Kotlin!")\n}', helloOutput: "Hello, Kotlin!",
    variables: 'fun main() {\n    val name = "Mina"\n    var score = 10\n    score += 5\n    println("$name: $score")\n}', variablesNote: "`val` পুনরায় assign করা যায় না; `var` করা যায়। Kotlin type inference করে; প্রয়োজন হলে `: Int` বা `: String` লেখা যায়।",
    input: 'fun main() {\n    print("তোমার নাম: ")\n    val name = readLine() ?: "বন্ধু"\n    println("স্বাগতম, $name")\n}', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`readLine()` nullable হতে পারে। `?:` Elvis operator value null হলে বিকল্প দেয়। আধুনিক project-এ typed input ও validation আলাদা করে শেখো।",
    operators: 'val a = 17; val b = 5\nprintln(a + b) // 22\nprintln(a % b) // 2\nprintln(a == b) // true/false comparison',
    condition: 'val marks = 78\nif (marks >= 80) {\n    println("A+")\n} else if (marks >= 70) {\n    println("A")\n} else {\n    println("আরও অনুশীলন করো")\n}', conditionOutput: "A", loop: 'for (i in 1..5) {\n    println(i)\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'fun add(a: Int, b: Int): Int {\n    return a + b\n}\nfun main() { println(add(4, 6)) }', fnOutput: "10",
    collection: 'val subjects = mutableListOf("ICT", "Physics")\nsubjects.add("Math")\nprintln(subjects[0])', collectionOutput: "ICT",
    specialTitle: "Null Safety ও Data Class", specialText: "Kotlin-এর type system null-জনিত ভুল কমাতে সাহায্য করে। সাধারণ String null হতে পারে না; `String?` nullable। `data class` data রাখার জন্য প্রয়োজনীয় method তৈরি করে দেয়।", specialCode: 'data class Student(val name: String, val marks: Int)\nval student = Student("Nila", 85)\nval nickname: String? = null\nprintln(student.name)\nprintln(nickname?.length ?: 0)', specialOutput: "Nila\n0",
    errorCode: 'fun parseAge(text: String): Int? {\n    return text.toIntOrNull()\n}\nval age = parseAge("abc")\nif (age == null) println("সঠিক বয়স দাও")', errorText: "Kotlin-এ nullable value ব্যবহার করার আগে null check, safe call `?.` বা Elvis `?:` ব্যবহার করো। `!!` null হলে crash ঘটাতে পারে—অপ্রয়োজনে ব্যবহার কোরো না।",
    projectTitle: "পড়ার কাজের চেকলিস্ট", projectBrief: "পড়ার task যোগ, complete ও filter করার Kotlin data model ও console logic তৈরি করো।", projectRequirements: ["Task নামে data class তৈরি করো।", "MutableList-এ task রাখো।", "Filter দিয়ে অসমাপ্ত task দেখাও।", "Null ও empty input যাচাই করো।"],
    references: [{term:"val",meaning:"Read-only reference তৈরি করে।",example:"val age = 18"},{term:"var",meaning:"Reassign করা যায়।",example:"var score = 0"},{term:"fun",meaning:"Function ঘোষণা করে।",example:"fun add(a: Int, b: Int): Int"},{term:"?",meaning:"Nullable type চিহ্নিত করে।",example:"String?"},{term:"?.",meaning:"Null হলে নিরাপদে call এড়িয়ে যায়।",example:"name?.length"},{term:"data class",meaning:"Data model class তৈরি করে।",example:"data class User(val name: String)"}]
  },
  dart: {
    setup: "Dart SDK ইনস্টল করে `dart --version` যাচাই করো। `dart create hello_app` দিয়ে project তৈরি করো; `dart run` দিয়ে চালাও। Flutter app বানাতে Flutter SDK লাগবে।",
    hello: 'void main() {\n  print("Hello, Dart!");\n}', helloOutput: "Hello, Dart!",
    variables: 'void main() {\n  String name = "Mina";\n  int age = 17;\n  var score = 85.5;\n  final active = true;\n  print("$name $age $score $active");\n}', variablesNote: "Dart-এ explicit type, `var`, `final` ও `const` আছে। `final` একবার assign হয়; `const` compile-time constant। Null safety default-এ type non-nullable রাখে।",
    input: 'import "dart:io";\n\nvoid main() {\n  stdout.write("তোমার নাম: ");\n  final name = stdin.readLineSync() ?? "বন্ধু";\n  print("স্বাগতম, $name");\n}', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`stdin.readLineSync()` null হতে পারে, তাই `??` দিয়ে fallback value দেওয়া হয়েছে। Flutter app-এ input সাধারণত TextField widget থেকে আসে।",
    operators: 'final a = 17, b = 5;\nprint(a + b); // 22\nprint(a % b); // 2\nprint(a == b); // false',
    condition: 'final marks = 78;\nif (marks >= 80) {\n  print("A+");\n} else if (marks >= 70) {\n  print("A");\n} else {\n  print("আরও অনুশীলন করো");\n}', conditionOutput: "A", loop: 'for (var i = 1; i <= 5; i++) {\n  print(i);\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'int add(int a, int b) {\n  return a + b;\n}\nvoid main() { print(add(4, 6)); }', fnOutput: "10",
    collection: 'final subjects = <String>["ICT", "Physics"];\nsubjects.add("Math");\nprint(subjects[0]);', collectionOutput: "ICT",
    specialTitle: "Null Safety, Class ও Async", specialText: "Dart-এ nullable type স্পষ্ট করে `?` দিয়ে লিখতে হয়। Class দিয়ে object তৈরি হয়। `Future` ও `async/await` দিয়ে সময়সাপেক্ষ কাজের ফল অপেক্ষা করা যায়।", specialCode: 'Future<String> loadMessage() async {\n  await Future.delayed(Duration(milliseconds: 10));\n  return "ডেটা পাওয়া গেছে";\n}\nvoid main() async {\n  print(await loadMessage());\n}', specialOutput: "ডেটা পাওয়া গেছে",
    errorCode: 'try {\n  final number = int.parse("abc");\n  print(number);\n} on FormatException {\n  print("সঠিক সংখ্যা দাও");\n}', errorText: "যে input সংখ্যা নাও হতে পারে, `int.parse` ব্যবহারে FormatException হতে পারে। `int.tryParse` null ফেরত দিয়ে আরও নিরাপদ fallback দিতে পারে।",
    projectTitle: "পড়ার পরিকল্পনা তৈরির মডেল", projectBrief: "বিষয়, task ও সময়ের তথ্য নিয়ে Study Planner-এর model ও console prototype তৈরি করো।", projectRequirements: ["StudyTask class বানাও।", "List দিয়ে task রাখো।", "সময় ও title validate করো।", "Future ব্যবহার করে mock loading দেখাও।"],
    references: [{term:"var",meaning:"Type inference-সহ variable।",example:"var count = 3;"},{term:"final",meaning:"একবার assign করা যায়।",example:"final name = 'Rafi';"},{term:"const",meaning:"Compile-time constant।",example:"const pi = 3.14;"},{term:"?",meaning:"Nullable type।",example:"String? nickname;"},{term:"Future",meaning:"ভবিষ্যতে পাওয়া যাবে এমন asynchronous result।",example:"Future<int> load() async"},{term:"class",meaning:"Object-এর নকশা।",example:"class Student { }"}]
  },
  r: {
    setup: "R ও RStudio install করে `R.version.string` যাচাই করো। RStudio-তে Script তৈরি করে line চালাও; Console-এ expression সরাসরি পরীক্ষা করা যায়।",
    hello: 'cat("Hello, R!\\n")', helloOutput: "Hello, R!",
    variables: 'name <- "Mina"\nage <- 17\nscores <- c(78, 85, 92)\nactive <- TRUE\nprint(mean(scores))', variablesNote: "R-এ assignment-এর জন্য `<-` প্রচলিত। Vector একটি গুরুত্বপূর্ণ building block; একই operation অনেক value-তে একসঙ্গে চালানো যায়।",
    input: 'name <- readline(prompt = "তোমার নাম: ")\ncat("স্বাগতম,", name, "\\n")', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`readline()` text ফেরত দেয়। সংখ্যায় রূপান্তর করতে `as.numeric()` ব্যবহার করা যায়, তবে `NA` তৈরি হলো কি না পরীক্ষা করতে হবে।",
    operators: 'a <- 17; b <- 5\nprint(a + b) # 22\nprint(a %% b) # 2\nprint(a == b) # FALSE',
    condition: 'marks <- 78\nif (marks >= 80) {\n  print("A+")\n} else if (marks >= 70) {\n  print("A")\n} else {\n  print("আরও অনুশীলন করো")\n}', conditionOutput: "[1] \"A\"", loop: 'for (i in 1:5) {\n  print(i)\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'add <- function(a, b) {\n  return(a + b)\n}\nprint(add(4, 6))', fnOutput: "[1] 10",
    collection: 'marks <- c(70, 85, 90)\nstudents <- data.frame(\n  name = c("Mina", "Rafi", "Nila"),\n  marks = marks\n)\nprint(students$marks)', collectionOutput: "70 85 90",
    specialTitle: "Vectorization ও Data Frame", specialText: "R-এ vectorization খুব গুরুত্বপূর্ণ: এক vector-এর ওপর operation দিলে প্রতিটি element-এর জন্য loop নিজে লিখতে হয় না। Data frame হলো সমান দৈর্ঘ্যের column-সহ tabular data।", specialCode: 'marks <- c(65, 82, 91, 48)\npassed <- marks[marks >= 50]\nprint(passed)\nprint(mean(passed))', specialOutput: "82 91\n86.5",
    errorCode: 'value <- suppressWarnings(as.numeric("abc"))\nif (is.na(value)) {\n  cat("সঠিক সংখ্যা দাও\\n")\n}', errorText: "R-এ ভুল conversion থেকে `NA` তৈরি হতে পারে। `is.na()` দিয়ে অনুপস্থিত/অকার্যকর value পরীক্ষা করো। অপ্রয়োজনে warning suppress করে সমস্যা আড়াল কোরো না।",
    projectTitle: "পরীক্ষার ফল বিশ্লেষণ", projectBrief: "একটি data frame-এ শিক্ষার্থীদের নম্বর রেখে গড়, সর্বোচ্চ, সর্বনিম্ন ও পাশের হার বের করো।", projectRequirements: ["কমপক্ষে ১০ শিক্ষার্থীর data তৈরি করো।", "Missing value পরীক্ষা করো।", "গড় ও summary বের করো।", "একটি সহজ plot তৈরি করো।"],
    references: [{term:"<-",meaning:"Assignment operator।",example:"score <- 85"},{term:"c()",meaning:"Vector তৈরি করে।",example:"c(1, 2, 3)"},{term:"data.frame()",meaning:"Tabular dataset তৈরি করে।",example:"data.frame(name, marks)"},{term:"if",meaning:"শর্ত অনুসারে কাজ করে।",example:"if (x > 0) print(x)"},{term:"function()",meaning:"Function তৈরি করে।",example:"add <- function(a,b) a+b"},{term:"mean()",meaning:"গড় বের করে।",example:"mean(values, na.rm=TRUE)"}]
  },
  julia: {
    setup: "Julia install করে `julia --version` যাচাই করো। REPL খুলে expression পরীক্ষা করো; script চালাতে `julia main.jl`।",
    hello: 'println("Hello, Julia!")', helloOutput: "Hello, Julia!",
    variables: 'name = "Mina"\nage = 17\nscore = 85.5\nactive = true\nprintln((name, age, score, active))', variablesNote: "Julia dynamic language হলেও type system শক্তিশালী। Variable-এ type annotation বাধ্যতামূলক নয়। Type system ও multiple dispatch Julia-র মূল বৈশিষ্ট্য।",
    input: 'print("তোমার নাম: ")\nname = readline()\nprintln("স্বাগতম, ", name)', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`readline()` line হিসেবে String ফেরত দেয়। সংখ্যা নিতে `parse(Int, readline())` ব্যবহার করা যায়; invalid input হলে error হবে, তাই validate করো।",
    operators: 'a, b = 17, 5\nprintln(a + b) # 22\nprintln(a % b) # 2\nprintln(a == b) # false',
    condition: 'marks = 78\nif marks >= 80\n    println("A+")\nelseif marks >= 70\n    println("A")\nelse\n    println("আরও অনুশীলন করো")\nend', conditionOutput: "A", loop: 'for i in 1:5\n    println(i)\nend', loopOutput: "1\n2\n3\n4\n5",
    fn: 'function add(a, b)\n    a + b\nend\nprintln(add(4, 6))', fnOutput: "10",
    collection: 'subjects = ["ICT", "Physics"]\npush!(subjects, "Math")\nprintln(subjects[1])', collectionOutput: "ICT",
    specialTitle: "Multiple Dispatch ও Array", specialText: "Julia-তে function কোন method চালাবে তা argument-এর type-এর ওপর নির্ভর করতে পারে—এটিই multiple dispatch। Numerical computing-এ array ও broadcasting খুব গুরুত্বপূর্ণ। Julia-র array index সাধারণত 1 থেকে শুরু।", specialCode: 'area(r::Float64) = pi * r^2\narea(side::Int) = side * side\nprintln(area(2.0))\nprintln(area(3))', specialOutput: "12.566370614359172\n9",
    errorCode: 'text = "abc"\ntry\n    number = parse(Int, text)\ncatch error\n    println("সঠিক integer দাও")\nend', errorText: "Julia-তে parsing বা indexing error হতে পারে। `try/catch` দিয়ে প্রত্যাশিত error ধরো। বড় array-তে index range ও element type পরীক্ষা করা জরুরি।",
    projectTitle: "বৈজ্ঞানিক হিসাবের ছোট Tool", projectBrief: "একটি সংখ্যার তালিকা থেকে গড়, standard deviation ও সর্বোচ্চ মান বের করো।", projectRequirements: ["Vector-এ data রাখো।", "Function দিয়ে summary হিসাব করো।", "খালি vector-এর edge case সামলাও।", "ফলাফল পরিষ্কারভাবে print করো।"],
    references: [{term:"function",meaning:"নতুন function ঘোষণা করে।",example:"function f(x) x^2 end"},{term:"::Type",meaning:"Type annotation/dispatch-এ ব্যবহৃত হয়।",example:"f(x::Int) = x+1"},{term:"push!",meaning:"Mutable collection-এ item যোগ করে।",example:"push!(items, 4)"},{term:"broadcast .",meaning:"Array-এর element-wise operation।",example:"sin.(values)"},{term:"Dict",meaning:"Key-value collection।",example:"Dict('a' => 1)"},{term:"try/catch",meaning:"Exception সামলায়।",example:"try ... catch ... end"}]
  },
  bash: {
    setup: "Linux/macOS terminal-এ Bash সাধারণত থাকে। Windows-এ WSL বা Git Bash ব্যবহার করা যায়। `bash --version` চালিয়ে দেখো। Script-এর প্রথম লাইনে shebang লেখো।",
    hello: '#!/usr/bin/env bash\necho "Hello, Bash!"', helloOutput: "Hello, Bash!",
    variables: 'name="Mina"\nage=17\nactive=true\necho "$name is $age"', variablesNote: "Bash variable assign করার সময় `=`-এর পাশে space দেওয়া যাবে না। Variable পড়তে `$name` ব্যবহার হয়। Text-এ variable expansion হলে সাধারণত double quote ব্যবহার করো।",
    input: 'read -r -p "তোমার নাম: " name\nprintf "স্বাগতম, %s\\n" "$name"', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`read -r` backslash-কে escape হিসেবে না ধরে input নেয়। `printf` দিয়ে format নিয়ন্ত্রণ করা যায়; `echo`-র আচরণ shell ভেদে বদলাতে পারে।",
    operators: 'a=17\nb=5\necho $((a + b))\necho $((a % b))\n[[ $a -gt $b ]] && echo "a বড়"',
    condition: 'marks=78\nif (( marks >= 80 )); then\n  echo "A+"\nelif (( marks >= 70 )); then\n  echo "A"\nelse\n  echo "আরও অনুশীলন করো"\nfi', conditionOutput: "A", loop: 'for i in {1..5}; do\n  echo "$i"\ndone', loopOutput: "1\n2\n3\n4\n5",
    fn: 'add() {\n  local a=$1\n  local b=$2\n  echo $((a + b))\n}\nadd 4 6', fnOutput: "10",
    collection: 'subjects=("ICT" "Physics")\nsubjects+=("Math")\necho "${subjects[0]}"\necho "${#subjects[@]}"', collectionOutput: "ICT\n3",
    specialTitle: "Quoting, Expansion ও Pipeline", specialText: 'Bash-এ space-সহ path বা user input ভুলভাবে split হতে পারে। তাই variable ব্যবহার করার সময় অধিকাংশ ক্ষেত্রে `"$variable"` লিখো। Pipeline (`|`) এক command-এর output অন্য command-এর input করে।', specialCode: 'printf "%s\\n" "apple" "banana" "apricot" | grep "ap" | sort', specialOutput: "apple\napricot",
    errorCode: 'set -Eeuo pipefail\nfile="notes.txt"\nif [[ -f "$file" ]]; then\n  cat -- "$file"\nelse\n  echo "ফাইল পাওয়া যায়নি" >&2\nfi', errorText: "Bash script-এ ভুল quoting, unquoted variable ও unchecked command failure বিপজ্জনক। `set -euo pipefail` সহায়ক হতে পারে, তবে এর আচরণ বুঝে ব্যবহার করো; destructive command-এ path যাচাই করো।",
    projectTitle: "ফাইল ব্যাকআপ Script", projectBrief: "নির্দিষ্ট folder-এর file তারিখসহ backup folder-এ কপি করার script লেখো।", projectRequirements: ["Source ও destination path variable-এ রাখো।", "Folder আছে কি না পরীক্ষা করো।", "File name-এ space থাকলেও কাজ করাও।", "Command failure হলে non-zero exit status দাও।"],
    references: [{term:"$name",meaning:"Variable expansion।",example:'echo "$name"'},{term:"${array[@]}",meaning:"Array-এর সব item।",example:'printf "%s\\n" "${items[@]}"'},{term:"$?",meaning:"সর্বশেষ command-এর exit status।",example:"if [[ $? -ne 0 ]]; then ..."},{term:"if / fi",meaning:"শর্তের block।",example:"if [[ -f file ]]; then ... fi"},{term:"for",meaning:"Item/sequence ধরে loop।",example:"for f in *.txt; do ...; done"},{term:"pipe |",meaning:"এক command-এর output পরের command-এ দেয়।",example:"cat file | grep word"}]
  },
  powershell: {
    setup: "PowerShell 7 ব্যবহার করা ভালো। `pwsh --version` যাচাই করো। Script `.ps1` extension-এ থাকে; policy অনুযায়ী script চালানোর অনুমতি পরীক্ষা করো।",
    hello: 'Write-Output "Hello, PowerShell!"', helloOutput: "Hello, PowerShell!",
    variables: '$name = "Mina"\n$age = 17\n$active = $true\nWrite-Output "$name $age $active"', variablesNote: "PowerShell variable `$` দিয়ে শুরু হয়। PowerShell-এ string, number ও object থাকে; command-এর output অনেক সময় plain text নয়, object হয়।",
    input: '$name = Read-Host "তোমার নাম"\nWrite-Output "স্বাগতম, $name"', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`Read-Host` ব্যবহারকারীর কাছ থেকে input নেয়। Input text হলে number দরকারের সময় parse ও range validation করো।",
    operators: '$a = 17; $b = 5\n$a + $b\n$a % $b\n$a -eq $b',
    condition: '$marks = 78\nif ($marks -ge 80) { "A+" }\nelseif ($marks -ge 70) { "A" }\nelse { "আরও অনুশীলন করো" }', conditionOutput: "A", loop: 'for ($i = 1; $i -le 5; $i++) {\n  Write-Output $i\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'function Add-Numbers {\n  param([int]$A, [int]$B)\n  return $A + $B\n}\nAdd-Numbers -A 4 -B 6', fnOutput: "10",
    collection: '$subjects = @("ICT", "Physics")\n$subjects += "Math"\n$subjects[0]', collectionOutput: "ICT",
    specialTitle: "Object ও Pipeline", specialText: "PowerShell pipeline-এ এক command-এর output পরের command-এ যায়। অনেক ক্ষেত্রে সেখানে object যায়, শুধু text নয়। তাই property ধরে filter ও format করা যায়।", specialCode: 'Get-Process |\n  Where-Object { $_.CPU -gt 1 } |\n  Select-Object -First 5 ProcessName, CPU', specialOutput: "চলমান process-এর নাম ও CPU তথ্য (কম্পিউটারভেদে বদলাবে)",
    errorCode: 'try {\n  Get-Content "missing.txt" -ErrorAction Stop\n} catch {\n  Write-Error "ফাইল পড়া যায়নি: $($_.Exception.Message)"\n}', errorText: "PowerShell-এ অনেক cmdlet non-terminating error দিতে পারে। যেখানে catch দরকার, `-ErrorAction Stop` ব্যবহার করতে হতে পারে। `$_` pipeline-এর current object বা error context বোঝায়।",
    projectTitle: "ডাউনলোড ফোল্ডার সাজানোর টুল", projectBrief: "Extension অনুযায়ী file-কে আলাদা folder-এ সাজানোর safe PowerShell script বানাও।", projectRequirements: ["প্রথমে file list preview করো।", "Destination folder তৈরি করো।", "WhatIf দিয়ে dry run করো।", "File conflict হলে overwrite না করে আলাদা নাম দাও।"],
    references: [{term:"$variable",meaning:"Variable তৈরি/পড়া।",example:"$name = 'Rafi'"},{term:"Write-Output",meaning:"Pipeline-এ output পাঠায়।",example:"Write-Output 'Hello'"},{term:"Read-Host",meaning:"Interactive input নেয়।",example:"Read-Host 'Name'"},{term:"Where-Object",meaning:"Object filter করে।",example:"Where-Object { $_.Length -gt 0 }"},{term:"ForEach-Object",meaning:"প্রতিটি pipeline object-এ কাজ করে।",example:"ForEach-Object { $_.Name }"},{term:"try/catch",meaning:"Terminating error সামলায়।",example:"try { ... } catch { ... }"}]
  },
  lua: {
    setup: "Lua interpreter install করে `lua -v` যাচাই করো। `main.lua` file চালাও `lua main.lua` দিয়ে।",
    hello: 'print("Hello, Lua!")', helloOutput: "Hello, Lua!",
    variables: 'local name = "Mina"\nlocal age = 17\nlocal active = true\nprint(name, age, active)', variablesNote: "Lua dynamic typed। `local` দিলে variable local scope-এ থাকে। `nil` মানে value অনুপস্থিত। Global variable অপ্রয়োজনে ব্যবহার কোরো না।",
    input: 'io.write("তোমার নাম: ")\nlocal name = io.read("*l")\nprint("স্বাগতম, " .. name)', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`io.read` standard input থেকে text নেয়। `..` string concatenate করে। input `nil` হতে পারে, বিশেষত end-of-file হলে—সেটি যাচাই করো।",
    operators: 'local a, b = 17, 5\nprint(a + b) -- 22\nprint(a % b) -- 2\nprint(a == b) -- false',
    condition: 'local marks = 78\nif marks >= 80 then\n  print("A+")\nelseif marks >= 70 then\n  print("A")\nelse\n  print("আরও অনুশীলন করো")\nend', conditionOutput: "A", loop: 'for i = 1, 5 do\n  print(i)\nend', loopOutput: "1\n2\n3\n4\n5",
    fn: 'local function add(a, b)\n  return a + b\nend\nprint(add(4, 6))', fnOutput: "10",
    collection: 'local student = { name = "Nila", marks = 85 }\nlocal subjects = { "ICT", "Physics" }\nprint(student.name)\nprint(subjects[1])', collectionOutput: "Nila\nICT",
    specialTitle: "Table ও Metatable", specialText: "Lua-তে table-ই array, dictionary ও object-এর মতো অনেক কাজ করে। Table-এর index সাধারণত 1 থেকে শুরু হতে পারে। Metatable দিয়ে table-এর আচরণ customize করা যায়।", specialCode: 'local student = { name = "Nila", marks = 85 }\nsetmetatable(student, {\n  __tostring = function(self)\n    return self.name .. ": " .. self.marks\n  end\n})\nprint(student)', specialOutput: "Nila: 85",
    errorCode: 'local ok, result = pcall(function()\n  return tonumber("abc") + 1\nend)\nif not ok then\n  print("হিসাব করা যায়নি")\nend', errorText: "Lua-তে `pcall` protected call করে error ধরতে পারে। তবে সব error pcall দিয়ে ঢেকে না রেখে input ও program logic আগে যাচাই করো।",
    projectTitle: "গেমের স্কোর তালিকা", projectBrief: "Player name ও score table-এ রেখে ranking দেখানোর script বানাও।", projectRequirements: ["Player data table-এ রাখো।", "নতুন score যোগ করো।", "Score অনুযায়ী sort করো।", "খালি বা invalid score reject করো।"],
    references: [{term:"local",meaning:"Local scope variable ঘোষণা করে।",example:"local count = 3"},{term:"nil",meaning:"অনুপস্থিত value।",example:"local item = nil"},{term:"function",meaning:"Function তৈরি করে।",example:"local function add(a,b) return a+b end"},{term:"table",meaning:"Array/record/key-value structure।",example:"{name='Nila'}"},{term:"pairs",meaning:"Table-এর key/value iterate করে।",example:"for k,v in pairs(t) do end"},{term:"ipairs",meaning:"Sequence-এর ধারাবাহিক numeric index iterate করে।",example:"for i,v in ipairs(t) do end"}]
  },
  perl: {
    setup: "Perl install করে `perl -v` যাচাই করো। `hello.pl` file চালাও `perl hello.pl` দিয়ে। Windows-এ Strawberry Perl ব্যবহার করা যায়।",
    hello: 'use strict;\nuse warnings;\nprint "Hello, Perl!\\n";', helloOutput: "Hello, Perl!",
    variables: 'use strict;\nmy $name = "Mina";\nmy $age = 17;\nmy @subjects = ("ICT", "Physics");\nprint "$name $age\\n";', variablesNote: "Perl-এ scalar `$`, array `@` এবং hash `%` দিয়ে বোঝানো হয়। `my` lexical scope তৈরি করে। নতুন script-এ `use strict` ও `use warnings` চালু রাখো।",
    input: 'print "তোমার নাম: ";\nmy $name = <STDIN>;\nchomp $name;\nprint "স্বাগতম, $name\\n";', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`<STDIN>` line নেয়; `chomp` line ending সরায়। `use warnings` সম্ভাব্য ভুল ধরতে সাহায্য করে।",
    operators: 'my $a = 17; my $b = 5;\nprint $a + $b, "\\n";\nprint $a % $b, "\\n";\nprint($a == $b ? "সমান" : "সমান নয়");',
    condition: 'my $marks = 78;\nif ($marks >= 80) {\n  print "A+\\n";\n} elsif ($marks >= 70) {\n  print "A\\n";\n} else {\n  print "আরও অনুশীলন করো\\n";\n}', conditionOutput: "A", loop: 'for my $i (1..5) {\n  print "$i\\n";\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'sub add {\n  my ($a, $b) = @_;\n  return $a + $b;\n}\nprint add(4, 6), "\\n";', fnOutput: "10",
    collection: 'my @subjects = ("ICT", "Physics");\npush @subjects, "Math";\nmy %student = (name => "Nila", marks => 85);\nprint $student{name};', collectionOutput: "Nila",
    specialTitle: "Regular Expression ও Hash", specialText: "Perl text processing-এ শক্তিশালী। Regex দিয়ে pattern খোঁজা বা প্রতিস্থাপন করা যায়। Hash key-value data রাখে। Regex greedy behavior ও special character বোঝা জরুরি।", specialCode: 'my $line = "Student ID: 2026";\nif ($line =~ /ID:\\s*(\\d+)/) {\n  print "ID = $1\\n";\n}', specialOutput: "ID = 2026",
    errorCode: 'use strict;\nuse warnings;\nmy $age = "abc";\nif ($age !~ /^\\d+$/) {\n  die "বয়স অবশ্যই সংখ্যা হতে হবে\\n";\n}', errorText: "Perl-এ input validation ও regex ভুল হলে অপ্রত্যাশিত ফল হতে পারে। `strict`, `warnings` এবং input-এর pattern পরীক্ষা ব্যবহার করো। `eval` দিয়ে exception ধরলে `$@` পরীক্ষা করতে হবে।",
    projectTitle: "লগ ফাইল বিশ্লেষক", projectBrief: "Text log file থেকে ERROR line ও তারিখ বের করে summary তৈরি করো।", projectRequirements: ["File line-by-line পড়ো।", "Regex দিয়ে ERROR খুঁজো।", "কতটি error আছে গোনো।", "File না পাওয়া গেলে পরিষ্কার বার্তা দাও।"],
    references: [{term:"$scalar",meaning:"একটি value।",example:"my $name = 'Rafi';"},{term:"@array",meaning:"ক্রমযুক্ত তালিকা।",example:"my @items = (1,2,3);"},{term:"%hash",meaning:"Key-value data।",example:"my %user = (name => 'Mina');"},{term:"sub",meaning:"Subroutine ঘোষণা করে।",example:"sub add { ... }"},{term:"=~",meaning:"Regex match/replace-এর সঙ্গে কাজ করে।",example:"$text =~ /abc/"},{term:"chomp",meaning:"Line ending সরায়।",example:"chomp $input;"}]
  },
  scala: {
    setup: "JDK ও Scala CLI বা sbt install করো। `scala version` যাচাই করো। ছোট code Scala CLI/REPL-এ, বড় project sbt দিয়ে চালাও।",
    hello: 'object Main {\n  def main(args: Array[String]): Unit = {\n    println("Hello, Scala!")\n  }\n}', helloOutput: "Hello, Scala!",
    variables: 'val name = "Mina"\nvar score = 10\nscore += 5\nval active = true\nprintln(s"$name: $score")', variablesNote: "Scala-তে `val` immutable এবং `var` mutable। Functional style-এ `val` বেশি ব্যবহার করা হয়। Type inference থাকলেও প্রয়োজন হলে explicit type লেখা যায়।",
    input: 'import scala.io.StdIn\nprint("তোমার নাম: ")\nval name = StdIn.readLine()\nprintln(s"স্বাগতম, $name")', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`StdIn.readLine()` line হিসেবে String দেয়। Numeric input-এর আগে parse ও error handling করতে হবে।",
    operators: 'val a = 17; val b = 5\nprintln(a + b) // 22\nprintln(a % b) // 2\nprintln(a == b) // true/false',
    condition: 'val marks = 78\nif (marks >= 80) println("A+")\nelse if (marks >= 70) println("A")\nelse println("আরও অনুশীলন করো")', conditionOutput: "A", loop: 'for (i <- 1 to 5) {\n  println(i)\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'def add(a: Int, b: Int): Int = a + b\nprintln(add(4, 6))', fnOutput: "10",
    collection: 'val subjects = List("ICT", "Physics", "Math")\nval longNames = subjects.filter(_.length > 3)\nprintln(longNames)', collectionOutput: "List(Physics, Math)",
    specialTitle: "Case Class ও Pattern Matching", specialText: "Scala-তে case class data model তৈরি সহজ করে। Pattern matching দিয়ে value বা structure অনুযায়ী branch নির্বাচন করা যায়। `Option` অনুপস্থিত value-এর explicit representation।", specialCode: 'case class Student(name: String, marks: Int)\nval student = Student("Nila", 85)\nstudent match {\n  case Student(name, marks) if marks >= 80 => println(s"$name: A+")\n  case _ => println("আরও অনুশীলন করো")\n}', specialOutput: "Nila: A+",
    errorCode: 'def parseAge(text: String): Option[Int] =\n  text.toIntOption\n\nparseAge("abc") match {\n  case Some(age) => println(age)\n  case None => println("সঠিক বয়স দাও")\n}', errorText: "Scala-তে `Option` ও `Either` দিয়ে সম্ভাব্য অনুপস্থিতি/ব্যর্থতা type-এর মধ্যে প্রকাশ করা যায়। সব সমস্যায় exception ব্যবহার না করে domain অনুযায়ী উপযুক্ত type বেছে নাও।",
    projectTitle: "শিক্ষার্থীর ফলাফল বিশ্লেষক", projectBrief: "Case class ও collection ব্যবহার করে নম্বর সাজাও, filter করো এবং grade বের করো।", projectRequirements: ["Student case class তৈরি করো।", "List-এ শিক্ষার্থী রাখো।", "পাশ করা শিক্ষার্থী filter করো।", "Average marks বের করো।"],
    references: [{term:"val",meaning:"Immutable binding।",example:"val x = 5"},{term:"var",meaning:"Mutable binding।",example:"var x = 5"},{term:"def",meaning:"Method/function ঘোষণা করে।",example:"def add(a:Int,b:Int)=a+b"},{term:"case class",meaning:"Data-centric class।",example:"case class User(name: String)"},{term:"match",meaning:"Pattern matching শুরু করে।",example:"x match { case 1 => ... }"},{term:"Option",meaning:"Some value বা None।",example:"Option[String]"}]
  },
  haskell: {
    setup: "GHCup দিয়ে GHC ও Cabal install করো। `ghci` দিয়ে interactive REPL শুরু করো; file চালাতে `runghc Main.hs` ব্যবহার করতে পারো।",
    hello: 'main :: IO ()\nmain = putStrLn "Hello, Haskell!"', helloOutput: "Hello, Haskell!",
    variables: 'name :: String\nname = "Mina"\n\nage :: Int\nage = 17\n\nmain :: IO ()\nmain = print (name, age)', variablesNote: "Haskell-এ সাধারণ value immutable। Type signature `name :: String` দিয়ে type ঘোষণা/ডকুমেন্ট করা যায়। Function-এর ফল expression; variable পরিবর্তনের বদলে নতুন value তৈরি হয়।",
    input: 'main :: IO ()\nmain = do\n  putStrLn "তোমার নাম:"\n  name <- getLine\n  putStrLn ("স্বাগতম, " ++ name)', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "Haskell-এ `getLine` IO action। `<-` do-block-এর ভিতরে action-এর result bind করে; এটি সাধারণ assignment নয়।",
    operators: 'main :: IO ()\nmain = do\n  print (17 + 5)\n  print (17 `mod` 5)\n  print (17 == 5)',
    condition: 'grade :: Int -> String\ngrade marks =\n  if marks >= 80 then "A+"\n  else if marks >= 70 then "A"\n  else "আরও অনুশীলন করো"\n\nmain = putStrLn (grade 78)', conditionOutput: "A", loop: 'countUp :: Int -> [Int]\ncountUp n = [1..n]\n\nmain :: IO ()\nmain = mapM_ print (countUp 5)', loopOutput: "1\n2\n3\n4\n5",
    fn: 'add :: Int -> Int -> Int\nadd a b = a + b\n\nmain :: IO ()\nmain = print (add 4 6)', fnOutput: "10",
    collection: 'subjects :: [String]\nsubjects = ["ICT", "Physics", "Math"]\n\nmain :: IO ()\nmain = print (map length subjects)', collectionOutput: "[3,7,4]",
    specialTitle: "Pure Function, Recursion ও Higher-order Function", specialText: "Haskell pure functional language। Pure function একই input-এ একই output দেয় এবং বাইরে state পরিবর্তন করে না। Recursion দিয়ে পুনরাবৃত্ত কাজ লেখা হয়; `map` বা `filter` function-কে collection-এ প্রয়োগ করে।", specialCode: 'square :: Int -> Int\nsquare x = x * x\n\nmain :: IO ()\nmain = print (map square [1, 2, 3, 4])', specialOutput: "[1,4,9,16]",
    errorCode: 'safeDivide :: Double -> Double -> Maybe Double\nsafeDivide _ 0 = Nothing\nsafeDivide a b = Just (a / b)\n\nmain = print (safeDivide 10 0)', errorText: "Haskell-এ partial function তৈরি না করে `Maybe` বা `Either` দিয়ে অনুপস্থিত ফল/ত্রুটি প্রকাশ করো। Type signature আগেই বলে দেয় কোন input ও output প্রত্যাশিত।",
    projectTitle: "ফাংশন দিয়ে গ্রেড নির্ণায়ক", projectBrief: "Pure function দিয়ে নম্বরের তালিকা থেকে grade ও summary বের করো।", projectRequirements: ["Grade নির্ধারণের pure function লেখো।", "map দিয়ে সব শিক্ষার্থীর grade বের করো।", "filter দিয়ে পাশ করা শিক্ষার্থী বেছে নাও।", "খালি list-এর average নিরাপদে handle করো।"],
    references: [{term:"::",meaning:"Type signature ঘোষণা করে।",example:"add :: Int -> Int -> Int"},{term:"->",meaning:"Function input/output type আলাদা করে।",example:"Int -> String"},{term:"do",meaning:"IO action sequence লেখে।",example:"main = do ..."},{term:"map",meaning:"প্রতিটি element-এ function প্রয়োগ করে।",example:"map (*2) [1,2,3]"},{term:"filter",meaning:"শর্তপূরণকারী element রাখে।",example:"filter even [1..10]"},{term:"Maybe",meaning:"Just value অথবা Nothing।",example:"Maybe Int"}]
  },
  elixir: {
    setup: "Elixir ও Erlang/OTP install করে `elixir --version` যাচাই করো। Mix project: `mix new hello_app`; চালাও `mix run` বা `iex -S mix`।",
    hello: 'IO.puts("Hello, Elixir!")', helloOutput: "Hello, Elixir!",
    variables: 'name = "Mina"\nage = 17\nactive = true\nIO.inspect({name, age, active})', variablesNote: "Elixir immutable data ব্যবহার করে। Variable rebind হতে পারে, কিন্তু পুরোনো value পরিবর্তিত হয় না। Pattern matching (`=`) শুধু assignment নয়; pattern-এর সঙ্গে মান মেলাতেও ব্যবহৃত হয়।",
    input: 'IO.write("তোমার নাম: ")\nname = IO.gets("") |> String.trim()\nIO.puts("স্বাগতম, #{name}")', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`IO.gets` line নেয়; শেষে newline থাকলে `String.trim` সরায়। Pipe operator `|>` আগের expression-এর ফল পরের function-এ পাঠায়।",
    operators: 'a = 17; b = 5\nIO.puts(a + b)\nIO.puts(rem(a, b))\nIO.inspect(a == b)',
    condition: 'marks = 78\nresult = cond do\n  marks >= 80 -> "A+"\n  marks >= 70 -> "A"\n  true -> "আরও অনুশীলন করো"\nend\nIO.puts(result)', conditionOutput: "A", loop: 'for number <- 1..5 do\n  IO.puts(number)\nend', loopOutput: "1\n2\n3\n4\n5",
    fn: 'add = fn a, b -> a + b end\nIO.puts(add.(4, 6))', fnOutput: "10",
    collection: 'subjects = ["ICT", "Physics", "Math"]\nIO.inspect(Enum.map(subjects, &String.upcase/1))', collectionOutput: "[\"ICT\", \"PHYSICS\", \"MATH\"]",
    specialTitle: "Pattern Matching, Process ও Message", specialText: "Elixir pattern matching-কে ব্যাপকভাবে ব্যবহার করে। BEAM VM-এর process lightweight এবং message passing দিয়ে একে অন্যের সঙ্গে যোগাযোগ করে। এটি concurrency ও fault-tolerance-এর ভিত্তি।", specialCode: 'spawn(fn ->\n  send(self(), :hello)\nend)\n\nreceive do\n  message -> IO.inspect(message)\nafter\n  100 -> IO.puts("বার্তা আসেনি")\nend', specialOutput: "এটি শুধু message passing-এর ধারণা দেখায়; বাস্তব process-এ sender/receiver PID আলাদা করে ব্যবহার করতে হয়।",
    errorCode: 'case Integer.parse("42") do\n  {number, ""} -> IO.puts(number)\n  _ -> IO.puts("সঠিক integer দাও")\nend', errorText: "Elixir-এ function অনেক সময় `{:ok, value}` বা `{:error, reason}` tuple দেয়। Pattern matching দিয়ে দুই ফল আলাদা করো। অপরিচিত exception চেপে ফেলবে না।",
    projectTitle: "পড়ার কাজের অগ্রগতি তালিকা", projectBrief: "Map/list দিয়ে task যোগ, complete ও অসমাপ্ত task filter করার mini app তৈরি করো।", projectRequirements: ["Task map-এ id/title/status রাখো।", "নতুন task immutableভাবে যোগ করো।", "Enum.filter দিয়ে অসমাপ্ত task বের করো।", "ভুল command-এ পরিষ্কার response দাও।"],
    references: [{term:"=",meaning:"Pattern match ও binding।",example:"name = 'Rafi'"},{term:"fn",meaning:"Anonymous function তৈরি করে।",example:"fn x -> x * 2 end"},{term:"|>",meaning:"Function call chain করে।",example:"text |> String.trim()"},{term:"case",meaning:"Value pattern match করে।",example:"case result do ... end"},{term:"Enum",meaning:"Enumerable collection process করে।",example:"Enum.map(items, &(&1 * 2))"},{term:"spawn",meaning:"নতুন lightweight process শুরু করে।",example:"spawn(fn -> work() end)"}]
  },
  assembly: {
    setup: "এই পাঠে নির্দিষ্টভাবে x86-64 Linux ও NASM syntax ব্যবহার করা হচ্ছে; Assembly syntax CPU architecture ও assembler অনুযায়ী বদলায়। Linux-এ NASM ও linker install করে `nasm -f elf64 file.asm` এবং `ld` দিয়ে build করো।",
    hello: 'section .data\n    msg db "Hello, Assembly!", 10\n    len equ $ - msg\n\nsection .text\n    global _start\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60\n    xor rdi, rdi\n    syscall', helloOutput: "Hello, Assembly!",
    variables: 'section .data\n    count dq 5\nsection .text\n    global _start\n_start:\n    mov rax, [count]\n    add rax, 2\n    ; rax এখন 7\n    mov rax, 60\n    xor rdi, rdi\n    syscall', variablesNote: "Assembly-তে high-level variable নয়; label দিয়ে memory location চিহ্নিত করা হয় এবং register-এ মান নিয়ে instruction চালানো হয়। `dq` ৮ byte data reserve/define করে।",
    input: 'section .bss\n    buffer resb 32\nsection .text\n    ; Linux read syscall: rax=0, rdi=stdin(0)\n    mov rax, 0\n    mov rdi, 0\n    mov rsi, buffer\n    mov rdx, 32\n    syscall', inputOutput: "এই code snippet stdin থেকে সর্বোচ্চ ৩২ byte buffer-এ পড়ে; text conversion নিজে করতে হবে।", inputNote: "System call-এর register convention OS ও architecture-specific। এই course x86-64 Linux syscall convention ধরে; Windows বা ARM Assembly-তে code আলাদা হবে।",
    operators: 'mov rax, 17\nmov rbx, 5\nadd rax, rbx ; rax = 22\nsub rax, 2  ; rax = 20\nxor rcx, rcx',
    condition: 'cmp rax, rbx\nje values_equal\n; এখানে মান সমান নয় হলে এই অংশ চলে\njmp done\nvalues_equal:\n    ; সমান হলে এখানে আসবে\ndone:', conditionOutput: "`je` jump করে যখন তুলনার ফল equal flag সেট করে।", loop: 'mov rcx, 5\nstart_loop:\n    ; এখানে loop-এর কাজ\n    dec rcx\n    jnz start_loop', loopOutput: "Loop body পাঁচবার চলে; RCX শূন্য হলে `jnz` jump করে না।",
    fn: 'section .text\nadd_two:\n    ; input: rdi, rsi\n    mov rax, rdi\n    add rax, rsi\n    ret', fnOutput: "Function দুইটি integer যোগ করে result RAX-এ ফেরত দেয় (এখানে System V AMD64 calling convention ধরে নেওয়া হয়েছে)।",
    collection: 'section .data\n    values dq 10, 20, 30\nsection .text\n    mov rax, [values]\n    mov rbx, [values + 8]\n    add rax, rbx ; 30', collectionOutput: "প্রথম দুইটি ৮-byte item যোগ করলে 30।",
    specialTitle: "Register, Memory ও Calling Convention", specialText: "Register CPU-র অতি দ্রুত storage। Memory operand-এর address ও size জানা জরুরি। Function call-এ কোন register দিয়ে argument যাবে, কোন register সংরক্ষণ করতে হবে—এটি ABI/calling convention নির্ধারণ করে।", specialCode: 'mov rax, 5\nmov rbx, 3\nimul rax, rbx\n; RAX = 15\n\n; exit(0)\nmov rax, 60\nxor rdi, rdi\nsyscall', specialOutput: "RAX-এ 15 থাকে; তারপর process exit করে।",
    errorCode: '; সম্ভাব্য ভুল: ভুল memory width বা address\n; ব্যবহার করার আগে register এবং label-এর size মিলিয়ে দেখো\nmov rax, qword [count]', errorText: "Assembly-তে type mismatch-এর মতো অনেক ভুল assembler ধরতে পারে না। ভুল address, stack alignment, register convention ও buffer size runtime crash বা data corruption তৈরি করতে পারে। Debugger দিয়ে register/stack পর্যবেক্ষণ করো।",
    projectTitle: "রেজিস্টারে গাণিতিক কাজের প্রদর্শনী", projectBrief: "দুটি integer নিয়ে যোগ, বিয়োগ ও গুণের result register-এ বের করার ছোট x86-64 routine তৈরি করো।", projectRequirements: ["কোন register-এ input থাকবে লিখে রাখো।", "প্রতিটি instruction-এর পর register-এর মান trace করো।", "Zero ও negative result পরীক্ষা করো।", "Architecture ও calling convention স্পষ্ট করো।"],
    references: [{term:"mov",meaning:"এক operand থেকে অন্যটিতে data কপি করে।",example:"mov rax, 5"},{term:"add",meaning:"যোগ করে।",example:"add rax, rbx"},{term:"sub",meaning:"বিয়োগ করে।",example:"sub rax, 1"},{term:"cmp",meaning:"দুই operand তুলনা করে flags সেট করে।",example:"cmp rax, rbx"},{term:"jmp",meaning:"অন্য label-এ control পাঠায়।",example:"jmp done"},{term:"syscall",meaning:"Operating system service call করে (Linux x86-64)।",example:"syscall"}]
  },
  "objective-c": {
    setup: "Objective-C development-এর জন্য macOS ও Xcode প্রয়োজন। Command line-এ Apple Clang toolchain ব্যবহার করো। পুরোনো iOS/macOS project পড়ার জন্য Foundation framework-এর ধারণা জরুরি।",
    hello: '#import <Foundation/Foundation.h>\n\nint main(void) {\n    @autoreleasepool {\n        NSLog(@"Hello, Objective-C!");\n    }\n    return 0;\n}', helloOutput: "Hello, Objective-C!",
    variables: 'NSString *name = @"Mina";\nNSInteger age = 17;\nBOOL active = YES;\nNSLog(@"%@ %ld %d", name, (long)age, active);', variablesNote: "Objective-C-তে C-এর primitive type-এর পাশাপাশি object pointer থাকে। `NSString *` একটি object reference; `NSInteger` integer এবং `BOOL` boolean value।",
    input: 'char buffer[128];\nprintf("তোমার নাম: ");\nfgets(buffer, sizeof buffer, stdin);\nNSString *name = [NSString stringWithUTF8String:buffer];\nNSLog(@"স্বাগতম, %@", [name stringByTrimmingCharactersInSet:[NSCharacterSet newlineCharacterSet]]);', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "Objective-C object-এর সঙ্গে C stdio-ও ব্যবহার করা যায়। `fgets` buffer size মানে; raw input-কে NSString-এ রূপান্তরের আগে encoding valid কি না বুঝতে হবে।",
    operators: 'NSInteger a = 17, b = 5;\nNSLog(@"%ld", (long)(a + b));\nNSLog(@"%ld", (long)(a % b));\nNSLog(@"%d", a == b);',
    condition: 'NSInteger marks = 78;\nif (marks >= 80) {\n    NSLog(@"A+");\n} else if (marks >= 70) {\n    NSLog(@"A");\n} else {\n    NSLog(@"আরও অনুশীলন করো");\n}', conditionOutput: "A", loop: 'for (NSInteger i = 1; i <= 5; i++) {\n    NSLog(@"%ld", (long)i);\n}', loopOutput: "1\n2\n3\n4\n5",
    fn: 'NSInteger add(NSInteger a, NSInteger b) {\n    return a + b;\n}\nNSLog(@"%ld", (long)add(4, 6));', fnOutput: "10",
    collection: 'NSArray<NSString *> *subjects = @[@"ICT", @"Physics"];\nNSLog(@"%@", subjects[0]);', collectionOutput: "ICT",
    specialTitle: "Message Sending, Class ও ARC", specialText: "Objective-C-তে method call-কে message sending বলা হয়: object-কে bracket syntax-এ message পাঠানো হয়। ARC (Automatic Reference Counting) object lifetime পরিচালনায় সাহায্য করে; retain cycle এড়াতে weak reference প্রয়োজন হতে পারে।", specialCode: '@interface Student : NSObject\n@property (nonatomic, copy) NSString *name;\n@end\n\nStudent *student = [Student new];\nstudent.name = @"Nila";\nNSLog(@"%@", student.name);', specialOutput: "Nila",
    errorCode: 'NSError *error = nil;\nNSString *text = [NSString stringWithContentsOfFile:@"notes.txt"\n  encoding:NSUTF8StringEncoding error:&error];\nif (text == nil) {\n    NSLog(@"ফাইল পড়া যায়নি: %@", error.localizedDescription);\n}', errorText: "Objective-C API অনেক সময় `NSError **` parameter দিয়ে error দেয়। Return value ও error দুটোই পরীক্ষা করো। Object ownership ও retain cycle বুঝে memory management করো।",
    projectTitle: "যোগাযোগের তালিকার মডেল", projectBrief: "Foundation collection ব্যবহার করে নাম ও phone number-এর contact list তৈরি করো।", projectRequirements: ["Contact class তৈরি করো।", "NSMutableArray-এ item রাখো।", "নাম দিয়ে search করো।", "nil value ও duplicate contact handle করো।"],
    references: [{term:"@interface",meaning:"Class interface ঘোষণা করে।",example:"@interface Student : NSObject"},{term:"@implementation",meaning:"Class method/property implementation।",example:"@implementation Student"},{term:"@property",meaning:"Object property ঘোষণা করে।",example:"@property NSString *name;"},{term:"NSString",meaning:"Immutable text object।",example:"NSString *s = @\"Hi\";"},{term:"NSArray",meaning:"Immutable ordered collection।",example:"@[ @\"A\", @\"B\" ]"},{term:"NSLog",meaning:"Console log output।",example:"NSLog(@\"Hello\");"}]
  },
  ocaml: {
    setup: "OCaml ও opam install করে `ocaml --version` যাচাই করো। `utop` REPL ব্যবহার করা যায়; ছোট file `ocaml main.ml` দিয়ে চালাও।",
    hello: 'print_endline "Hello, OCaml!"', helloOutput: "Hello, OCaml!",
    variables: 'let name = "Mina"\nlet age = 17\nlet active = true\nlet () = Printf.printf "%s %d %b\\n" name age active', variablesNote: "OCaml-এ `let` দিয়ে binding তৈরি হয়; সাধারণত immutable। Type inference expression থেকে type বের করে। Function ও value একই expression-oriented style-এ লেখা যায়।",
    input: 'let () =\n  print_string "তোমার নাম: ";\n  let name = read_line () in\n  Printf.printf "স্বাগতম, %s\\n" name', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`read_line()` এক লাইন text নেয়। Input parsing-এ `int_of_string` invalid text পেলে exception দিতে পারে; সে ক্ষেত্রে `try` বা result type দিয়ে সামলাও।",
    operators: 'let a = 17 and b = 5 in\nPrintf.printf "%d\\n" (a + b);\nPrintf.printf "%d\\n" (a mod b);\nPrintf.printf "%b\\n" (a = b)',
    condition: 'let marks = 78 in\nif marks >= 80 then print_endline "A+"\nelse if marks >= 70 then print_endline "A"\nelse print_endline "আরও অনুশীলন করো"', conditionOutput: "A", loop: 'let rec count n =\n  if n > 5 then ()\n  else (Printf.printf "%d\\n" n; count (n + 1))\nlet () = count 1', loopOutput: "1\n2\n3\n4\n5",
    fn: 'let add a b = a + b\nlet () = Printf.printf "%d\\n" (add 4 6)', fnOutput: "10",
    collection: 'let subjects = ["ICT"; "Physics"; "Math"]\nlet lengths = List.map String.length subjects\nList.iter print_int lengths', collectionOutput: "374",
    specialTitle: "Pattern Matching ও Algebraic Data Type", specialText: "OCaml pattern matching দিয়ে data-এর shape অনুযায়ী কাজ করা যায়। Variant type দিয়ে নিজের data case তৈরি করা যায়, আর option type অনুপস্থিত value প্রকাশ করে।", specialCode: 'type result = Passed of string | Failed of string\nlet show = function\n  | Passed name -> name ^ " পাস করেছে"\n  | Failed name -> name ^ " আবার চেষ্টা করো"\nlet () = print_endline (show (Passed "Nila"))', specialOutput: "Nila পাস করেছে",
    errorCode: 'let parse_number text =\n  try Some (int_of_string text)\n  with Failure _ -> None\nlet () = match parse_number "abc" with\n  | Some n -> Printf.printf "%d\\n" n\n  | None -> print_endline "সঠিক integer দাও"', errorText: "OCaml-এ option/result-like type দিয়ে সম্ভাব্য ব্যর্থতা প্রকাশ করা যায়। Exception ধরতে নির্দিষ্ট exception pattern ব্যবহার করো; অজানা error অযথা গিলে ফেলবে না।",
    projectTitle: "ফাংশন দিয়ে ফলাফল প্রতিবেদন", projectBrief: "Student record list থেকে grade, passed list ও summary তৈরি করো।", projectRequirements: ["Student record type তৈরি করো।", "List.map দিয়ে grade তৈরি করো।", "List.filter দিয়ে পাশের তালিকা বের করো।", "খালি list-এর average নিরাপদে handle করো।"],
    references: [{term:"let",meaning:"Immutable binding তৈরি করে।",example:"let age = 18"},{term:"fun",meaning:"Anonymous function লেখে।",example:"fun x -> x * 2"},{term:"match",meaning:"Pattern matching শুরু করে।",example:"match value with ..."},{term:"type",meaning:"নতুন variant/record type।",example:"type status = On | Off"},{term:"option",meaning:"Some অথবা None প্রকাশ করে।",example:"int option"},{term:"List.map",meaning:"প্রতিটি item-এ function প্রয়োগ করে।",example:"List.map f items"}]
  },
  fortran: {
    setup: "GFortran compiler install করে `gfortran --version` যাচাই করো। `main.f90` file compile: `gfortran main.f90 -o main`; তারপর executable চালাও।",
    hello: 'program hello\n  print *, "Hello, Fortran!"\nend program hello', helloOutput: "Hello, Fortran!",
    variables: 'program variables\n  implicit none\n  character(len=20) :: name = "Mina"\n  integer :: age = 17\n  real :: score = 85.5\n  logical :: active = .true.\n  print *, name, age, score, active\nend program variables', variablesNote: "Fortran-এ type declaration সাধারণত স্পষ্টভাবে লেখা হয়। `implicit none` undeclared variable-সংক্রান্ত ভুল ধরতে সাহায্য করে; নতুন code-এ এটি ব্যবহার করো।",
    input: 'program input_demo\n  implicit none\n  character(len=40) :: name\n  print *, "তোমার নাম:"\n  read(*,*) name\n  print *, "স্বাগতম, ", trim(name)\nend program input_demo', inputOutput: "ইনপুট: Rima\nআউটপুট: স্বাগতম, Rima", inputNote: "`read(*,*)` standard input থেকে data নেয় এবং `print *` output দেয়। `trim()` string-এর trailing space বাদ দেয়।",
    operators: 'program ops\n  implicit none\n  integer :: a=17, b=5\n  print *, a+b\n  print *, mod(a,b)\n  print *, a == b\nend program ops',
    condition: 'program grade\n  implicit none\n  integer :: marks = 78\n  if (marks >= 80) then\n    print *, "A+"\n  else if (marks >= 70) then\n    print *, "A"\n  else\n    print *, "আরও অনুশীলন করো"\n  end if\nend program grade', conditionOutput: "A", loop: 'program loop_demo\n  implicit none\n  integer :: i\n  do i = 1, 5\n    print *, i\n  end do\nend program loop_demo', loopOutput: "1\n2\n3\n4\n5",
    fn: 'program procedures\n  implicit none\n  print *, add(4, 6)\ncontains\n  integer function add(a, b)\n    integer, intent(in) :: a, b\n    add = a + b\n  end function add\nend program procedures', fnOutput: "10",
    collection: 'program arrays\n  implicit none\n  integer :: marks(3) = [70, 85, 90]\n  print *, marks(1)\n  print *, sum(marks)\nend program arrays', collectionOutput: "70\n245",
    specialTitle: "Array ও Numerical Computing", specialText: "Fortran array-oriented scientific computing-এর জন্য শক্তিশালী। Array-এর lower bound নির্দিষ্ট করা যায়; default lower bound সাধারণত 1। `do` loop, intrinsic function এবং module scientific code-এ বহুল ব্যবহৃত।", specialCode: 'program vector_sum\n  implicit none\n  real :: a(3) = [1.0, 2.0, 3.0]\n  real :: b(3) = [4.0, 5.0, 6.0]\n  print *, sum(a + b)\nend program vector_sum', specialOutput: "21.0",
    errorCode: 'program safe_input\n  implicit none\n  integer :: value, status\n  read(*,*,iostat=status) value\n  if (status /= 0) then\n    print *, "সঠিক integer দাও"\n  else\n    print *, value\n  end if\nend program safe_input', errorText: "Fortran input/output statement-এ `iostat` দিয়ে operation সফল হয়েছে কি না পরীক্ষা করা যায়। Array bound ও numeric kind ভুল হলে ফল ভুল বা runtime error হতে পারে।",
    projectTitle: "পরীক্ষার নম্বর বিশ্লেষণ", projectBrief: "Array-এ নম্বর নিয়ে average, min, max ও grade count বের করো।", projectRequirements: ["কমপক্ষে ১০টি নম্বরের array তৈরি করো।", "SUM, MINVAL, MAXVAL ব্যবহার করো।", "Do loop দিয়ে grade count করো।", "Array খালি/ভুল input-এর সীমা বিবেচনা করো।"],
    references: [{term:"program",meaning:"প্রোগ্রাম শুরু/শেষ চিহ্নিত করে।",example:"program main ... end program"},{term:"implicit none",meaning:"Undeclared variable-এর implicit typing বন্ধ করে।",example:"implicit none"},{term:"integer",meaning:"পূর্ণসংখ্যার type।",example:"integer :: count"},{term:"real",meaning:"ভগ্নাংশের numeric type।",example:"real :: temperature"},{term:"do",meaning:"Loop তৈরি করে।",example:"do i = 1, 5"},{term:"contains",meaning:"Program/module-এর internal procedure section শুরু করে।",example:"contains\n  subroutine work"}]
  }
};

const mappedSlugs = new Set(Object.keys(languageChapterMap));
const bengaliQuizLabels = ["ক", "খ", "গ", "ঘ"];
const commonMistakes: Record<string, string[]> = {
  variables: ["Variable-এর নাম ও type নিয়ে অস্পষ্টতা রেখো না।", "অনুমান করে input-এর type ঠিক ধরে নিও না; validate করো।"],
  decisions: ["একাধিক condition থাকলে সঠিক ক্রমে পরীক্ষা করো।", "Boundary value যেমন 0, 40, 100 পরীক্ষা করো।"],
  loops: ["Loop-এর start, condition ও update পরীক্ষা করো।", "শেষ হওয়ার condition না থাকলে infinite loop হতে পারে।"],
  functions: ["Function-এর input ও return type বোঝো।", "একটি function-এ অপ্রয়োজনীয় অনেক কাজ গুঁজে দিও না।"],
  collections: ["Index-এর শুরু ও শেষ সীমা বুঝে ব্যবহার করো।", "Collection পরিবর্তন করলে সেই প্রভাব অন্য অংশে পড়ছে কি না পরীক্ষা করো।"],
};

function lesson(slug: string, number: number, title: string, summary: string, sections: TutorialSection[], exercises: string[], quiz: TutorialQuiz, source: TutorialLesson["source"] = "original-bangla"): TutorialLesson {
  return { slug, number, title, summary, sections, exercises, quiz, source };
}

function buildProfileLessons(language: Language, profile: Profile): TutorialLesson[] {
  const name = language.name;
  const descriptionBn = localizeLanguage(language).descriptionBn;
  const lessons: TutorialLesson[] = [];
  lessons.push(lesson("getting-started", 1, `${name} কী এবং কীভাবে শুরু করবে`, `${name}-এর কাজ, development setup ও প্রথম program।`, [
    { title: `${name} দিয়ে কী করা যায়?`, paragraphs: [`${descriptionBn}`, `${profile.setup}`, `প্রথম লক্ষ্য বড় application বানানো নয়। আগে একটি ছোট program চালিয়ে দেখবে, code কোথায় লেখা হয়, কীভাবে run হয় এবং output কোথায় দেখা যায়।`] },
    { title: "প্রথম program", paragraphs: [`এই code-টি ${name}-এ একটি বার্তা output করে। প্রতিটি ভাষায় program শুরু ও output দেওয়ার নিয়ম আলাদা, তাই syntax মন দিয়ে দেখো।`], code: profile.hello, output: profile.helloOutput, lineNotes: ["Program-এর entry point বা execution শুরু হওয়ার নিয়ম ভাষাভেদে আলাদা।", "Output statement-টি screen/console-এ বার্তা দেখায়।"] },
    { title: "চালানোর পর কী দেখবে?", paragraphs: ["Output-এর সঙ্গে code মিলিয়ে দেখো। কোনো error এলে প্রথমে file name, command, punctuation এবং compiler/interpreter install ঠিক আছে কি না দেখো।"], note: "কোড চালানোর আগে output অনুমান করো; তারপর বাস্তব output-এর সঙ্গে মিলাও।" }
  ], [`একটি বার্তা নিজের ভাষায় পরিবর্তন করে output দেখাও।`, `${name} file-এর নাম ও run command নিজের খাতায় লেখো।`], { question: "প্রথম program চালানোর পর কোন বিষয়টি সবচেয়ে আগে যাচাই করবে?", options: ["শুধু file-এর রং", "Code run হয়েছে কি না এবং output প্রত্যাশামতো কি না", "কম্পিউটার restart করা", "সব code মুখস্থ করা"], answer: 1, explanation: "প্রথমে execution সফল হয়েছে কি না এবং output ঠিক এসেছে কি না যাচাই করাই শেখার ভিত্তি।" }));
  lessons.push(lesson("variables-and-types", 2, "Variable ও Data Type", "প্রোগ্রামের তথ্য কীভাবে নাম দিয়ে রাখা হয় এবং type কেন প্রয়োজন তা শেখো।", [
    { title: "Variable-কে নাম দেওয়া বাক্স ভাবো", paragraphs: [`Variable হলো program চলার সময় কোনো value রাখার নামযুক্ত জায়গা। উদাহরণ হিসেবে শিক্ষার্থীর নাম, বয়স, নম্বর—প্রতিটি আলাদা variable-এ রাখা যায়।`, profile.variablesNote, `Type বলে value কী ধরনের: text, integer, decimal বা true/false। Type ভুল হলে operation ভুল হতে পারে বা compiler/interpreter error দিতে পারে।`] },
    { title: "Code Example", paragraphs: [`নিচে একই program-এ text, সংখ্যা ও boolean value রাখা হয়েছে।`], code: profile.variables, lineNotes: ["প্রথম variable-এ text রাখা হয়েছে।", "পরের variable-এ numeric value রাখা হয়েছে।", "Boolean value true/false ধরনের সিদ্ধান্ত বোঝায়।"] },
    { title: "নিজের data type চিনে নাও", paragraphs: ["নাম, বয়স, GPA, পাস করেছে কি না—এই চারটি তথ্যের জন্য কোন type উপযুক্ত তা নির্ধারণ করো।", `ভাষাভেদে dynamic typing, static typing, mutable ও immutable variable-এর নিয়ম আলাদা হতে পারে—এই পার্থক্যটি ${name}-এর syntax অনুযায়ী মনে রাখবে।`] , note: "কোডে variable-এর নাম অর্থপূর্ণ রাখো; `x1`-এর বদলে `studentAge` অনেক বেশি পরিষ্কার।" }
  ], [`name, age ও score নামে তিনটি variable তৈরি করো।`, "একটি variable-এর value বদলে program আবার চালাও। কী পরিবর্তন হলো লিখে রাখো।"], { question: "Variable ব্যবহারের প্রধান উদ্দেশ্য কী?", options: ["Data-কে নাম দিয়ে সংরক্ষণ ও ব্যবহার করা", "Monitor-এর brightness বাড়ানো", "কোডকে ছবি বানানো", "Compiler বন্ধ করা"], answer: 0, explanation: "Variable value-কে নাম দিয়ে ধরে রাখে, ফলে program-এর বিভিন্ন অংশে তা ব্যবহার করা যায়।" }));
  lessons.push(lesson("input-and-output", 3, "Input ও Output", "ব্যবহারকারীর কাছ থেকে তথ্য নিয়ে ফলাফল দেখানো শেখো।", [
    { title: "Input ও Output-এর পার্থক্য", paragraphs: ["Input হলো program-কে দেওয়া তথ্য; Output হলো program যে ফলাফল দেখায়। যেমন নাম জিজ্ঞেস করা input, তারপর নাম ধরে স্বাগত জানানো output।", profile.inputNote] },
    { title: "Code Example", paragraphs: ["নিচের code-এ keyboard থেকে নাম নেওয়া হচ্ছে এবং সেই নাম দিয়ে message দেখানো হচ্ছে।"], code: profile.input, output: profile.inputOutput, lineNotes: ["প্রথম statement ব্যবহারকারীর কাছে prompt দেখায়।", "পরের statement input পড়ে variable-এ রাখে।", "শেষে variable-এর value ব্যবহার করে output দেখায়।"] },
    { title: "ভুল input সামলাও", paragraphs: ["ব্যবহারকারী ফাঁকা নাম, সংখ্যা যেখানে text দরকার, অথবা ভুল format দিতে পারে। input নেওয়ার পর প্রয়োজন অনুযায়ী trim, parse, range check ও validation করো।"] }
  ], ["নিজের নাম নিয়ে greeting তৈরি করো।", "বয়স input নিয়ে পরের বছর বয়স দেখাও; invalid input-এর জন্য বার্তা রাখো।"], { question: "User input নেওয়ার পর validation কেন প্রয়োজন?", options: ["ভুল বা অপ্রত্যাশিত data শনাক্ত করতে", "Code-এর font বড় করতে", "Program-এর নাম পাল্টাতে", "Output লুকাতে"], answer: 0, explanation: "ব্যবহারকারী ভুল format বা সীমার বাইরে value দিতে পারে, তাই ব্যবহার করার আগে যাচাই করা জরুরি।" }));
  lessons.push(lesson("operators-and-expressions", 4, "Operators ও Expressions", "হিসাব, তুলনা ও logic তৈরি করতে operator ব্যবহার করো।", [
    { title: "Operator কী?", paragraphs: ["Operator হলো এমন চিহ্ন/keyword যা value-এর ওপর কাজ করে। Arithmetic operator হিসাব করে, comparison operator তুলনা করে, logical operator একাধিক শর্ত যুক্ত করে।", "`=` অনেক ভাষায় value assign করে; `==` বা `===` তুলনা করতে পারে—ভাষাভেদে নিয়ম আলাদা।"] },
    { title: "Code Example", paragraphs: ["দুটি সংখ্যা নিয়ে যোগ, ভাগশেষ ও সমতা পরীক্ষা করা হচ্ছে।"], code: profile.operators, lineNotes: ["যোগ operator দুইটি value যোগ করে।", "Modulo/remainder operator ভাগশেষ দেয়।", "Comparison operator সত্য/মিথ্যা ফল দেয়।"] },
    { title: "Operator precedence", paragraphs: ["এক expression-এ একাধিক operator থাকলে কোন কাজ আগে হবে তা precedence নির্ধারণ করে। সন্দেহ হলে parentheses ব্যবহার করো—যেমন `(a + b) * c`।"] }
  ], ["দুটি সংখ্যার যোগ, বিয়োগ, গুণ ও ভাগফল দেখাও।", "একটি সংখ্যা জোড় কি না remainder operator দিয়ে পরীক্ষা করো।"], { question: "Modulo বা remainder operator সাধারণত কী বের করে?", options: ["ভাগশেষ", "বড় সংখ্যা", "Text length", "Variable-এর নাম"], answer: 0, explanation: "Modulo operator ভাগ করার পর অবশিষ্ট অংশ বের করে; জোড়-বিজোড় পরীক্ষায় এটি কাজে লাগে।" }));
  lessons.push(lesson("conditions", 5, "Condition: if, else ও সিদ্ধান্ত", "শর্ত সত্য বা মিথ্যা হলে ভিন্ন কাজ চালাতে শেখো।", [
    { title: "প্রোগ্রামে সিদ্ধান্ত নেওয়া", paragraphs: ["বাস্তব জীবনে নম্বর ৮০ বা তার বেশি হলে A+, নইলে অন্য grade—এ ধরনের সিদ্ধান্ত program-এ condition দিয়ে লেখা হয়।", "একাধিক range থাকলে বড় threshold থেকে ছোট threshold-এ পরীক্ষা করো, যাতে সঠিক grade পাওয়া যায়।"] },
    { title: "Code Example", paragraphs: ["নিচের code নম্বর দেখে grade নির্ধারণ করে।"], code: profile.condition, output: profile.conditionOutput, lineNotes: ["প্রথমে marks-এর একটি মান রাখা হয়েছে।", "if condition সত্য হলে প্রথম block চলে।", "না হলে পরের condition পরীক্ষা হয়; সব false হলে else চলে।"] },
    { title: "Boundary test", paragraphs: ["৭৯, ৮০, ৬৯, ৭০ এবং ০ দিয়ে পরীক্ষা করো। সীমার ঠিক আগে ও পরে test করলে ভুল condition সহজে ধরা পড়ে।"] }
  ], ["তিনটি সংখ্যার মধ্যে সবচেয়ে বড়টি বের করো।", "শিক্ষার্থীর নম্বর দিয়ে pass/fail এবং grade নির্ধারণ করো।"], { question: "`else` block কখন চলে?", options: ["আগের if/else-if কোনো condition সত্য না হলে", "সব condition সত্য হলে", "Loop শুরু হওয়ার আগে", "প্রোগ্রাম compile না হলে"], answer: 0, explanation: "if ও পরবর্তী else-if condition-গুলো মিথ্যা হলে else fallback হিসেবে চলে।" }));
  lessons.push(lesson("loops", 6, "Loop: একই কাজ বারবার করা", "for/while বা ভাষার iteration পদ্ধতি দিয়ে পুনরাবৃত্ত কাজ করো।", [
    { title: "Loop কেন দরকার?", paragraphs: ["১ থেকে ১০০ পর্যন্ত সংখ্যা দেখাতে ১০০টি print statement লেখা অযৌক্তিক। Loop দিয়ে একটি নির্দেশ বারবার চালানো যায়।", "Loop-এর শুরু, চলার শর্ত এবং update কীভাবে হচ্ছে—এই তিনটি বিষয় বুঝতে হবে।"] },
    { title: "Code Example", paragraphs: ["নিচের code ১ থেকে ৫ পর্যন্ত সংখ্যা দেখায়।"], code: profile.loop, output: profile.loopOutput, lineNotes: ["Loop variable কোথা থেকে শুরু হচ্ছে দেখো।", "প্রতিবার iteration-এর শেষে value কীভাবে বদলাচ্ছে দেখো।", "Condition false হলেই loop শেষ হয়।"] },
    { title: "Infinite loop থেকে সাবধান", paragraphs: ["Update না হলে বা condition কখনো false না হলে loop অনন্তকাল চলতে পারে। প্রথমে ছোট range দিয়ে পরীক্ষা করো।"] }
  ], ["১ থেকে ১০ পর্যন্ত যোগফল বের করো।", "একটি সংখ্যার নামতা দেখাও।"], { question: "Loop থামার জন্য সাধারণত কী প্রয়োজন?", options: ["Condition false হওয়া বা loop থেকে বের হওয়ার নির্দেশ", "আরও variable তৈরি", "কম্পিউটার restart", "Text-এর রং বদল"], answer: 0, explanation: "Loop-এর condition false হলে বা break-এর মতো control statement এলে loop শেষ হয়।" }));
  lessons.push(lesson("functions", 7, "Function: একই কাজ পুনরায় ব্যবহার", "Code ছোট অংশে ভাগ করে reusable function তৈরি করো।", [
    { title: "Function কেন ব্যবহার করব?", paragraphs: ["Function হলো নির্দিষ্ট কাজের জন্য নাম দেওয়া code block। একই কাজ বারবার লাগলে copy-paste না করে function call করো।", "Parameter function-এ data পাঠায়; return value কাজের ফল ফেরত দেয়। সব function result ফেরত দেয় না—কিছু শুধু কাজ করে।"] },
    { title: "Code Example", paragraphs: ["দুটি সংখ্যা যোগ করার function তৈরি করে সেটি call করা হচ্ছে।"], code: profile.fn, output: profile.fnOutput, lineNotes: ["Function declaration-এ নাম ও parameter লেখা হয়।", "Function-এর ভিতরে হিসাব করা হয়।", "Call করলে argument পাঠানো হয় এবং return value পাওয়া যায়।"] },
    { title: "Function-এর দায়িত্ব ছোট রাখো", paragraphs: ["একটি function যেন একটি পরিষ্কার কাজ করে। নাম এমন দাও যাতে কী করে বোঝা যায়—যেমন `calculateAverage`, `isValidEmail`।"] }
  ], ["বৃত্তের ক্ষেত্রফল বের করার function লেখো।", "তিনটি সংখ্যার গড় বের করার function তৈরি করো।"], { question: "Function-এর parameter কী?", options: ["Function-এর input গ্রহণের নামযুক্ত স্থান", "একটি file extension", "Screen size", "শুধু output format"], answer: 0, explanation: "Parameter হলো function-এর declaration-এ থাকা input variable; call-এর সময় argument দিয়ে মান পাঠানো হয়।" }));
  lessons.push(lesson("collections", 8, "Array, List ও Collection", "একসঙ্গে একাধিক value সংগঠিতভাবে রাখতে শেখো।", [
    { title: "অনেকগুলো value এক জায়গায়", paragraphs: ["একজন শিক্ষার্থীর পাঁচটি বিষয়ের নম্বর আলাদা variable-এ রাখার বদলে array/list-এ রাখা সুবিধাজনক। Collection দিয়ে loop চালানো, search ও transform করা যায়।", "Index কোন সংখ্যা থেকে শুরু হয় তা ভাষা অনুযায়ী আলাদা হতে পারে। ভুল index ব্যবহার করলে error বা ভুল ফল হতে পারে।"] },
    { title: "Code Example", paragraphs: ["একটি collection তৈরি করে তাতে নতুন item যোগ করা হচ্ছে।"], code: profile.collection, output: profile.collectionOutput, lineNotes: ["প্রথম লাইনে collection তৈরি হয়েছে।", "পরের লাইনে নতুন item যোগ হয়েছে।", "শেষ লাইনে একটি নির্দিষ্ট item পড়া হয়েছে।"] },
    { title: "Collection-এর ধরন", paragraphs: ["Array/List সাধারণত ordered item রাখে; map/dictionary key-value রাখে; set duplicate বাদ দেয়। প্রয়োজন অনুযায়ী structure বেছে নাও।"] }
  ], ["পাঁচটি নম্বরের collection তৈরি করে গড় বের করো।", "একটি তালিকা থেকে সবচেয়ে বড় ও সবচেয়ে ছোট মান খুঁজে বের করো।"], { question: "Collection ব্যবহারের সুবিধা কী?", options: ["একাধিক সম্পর্কিত value একসঙ্গে সংগঠিত রাখা", "সব error মুছে ফেলা", "Compiler-এর কাজ বন্ধ করা", "শুধু page style করা"], answer: 0, explanation: "Collection অনেক value-কে একটি কাঠামোর মধ্যে রাখে এবং loop/search/transform সহজ করে।" }));
  lessons.push(lesson("language-features", 9, profile.specialTitle, `${name}-এর নিজস্ব গুরুত্বপূর্ণ ধারণা`, [
    { title: "এই ভাষার বিশেষ বৈশিষ্ট্য", paragraphs: [profile.specialText, `এই ধারণাটি ${name} শেখার সময় গুরুত্বপূর্ণ, কারণ এটি code-এর গঠন, নিরাপত্তা, performance বা কাজের ধরনকে প্রভাবিত করে।`] },
    { title: "Code Example", paragraphs: ["এবার ছোট একটি example দেখো। Code-এর প্রতিটি অংশের দায়িত্ব খুঁজে বের করো।"], code: profile.specialCode, output: profile.specialOutput, lineNotes: ["প্রথমে data বা structure তৈরি হয়েছে।", "এরপর ভাষার বিশেষ feature প্রয়োগ হয়েছে।", "শেষে ফলাফল output হয়েছে।"] },
    { title: "কখন ব্যবহার করবে?", paragraphs: ["প্রতিটি feature সব সমস্যায় ব্যবহার করতে হয় না। Problem-এর প্রয়োজন, readability এবং maintainability দেখে সিদ্ধান্ত নাও।"] }
  ], ["এই lesson-এর special feature নিজের ভাষায় ব্যাখ্যা করো।", `${name}-এর special feature ব্যবহার করে একটি নতুন উদাহরণ তৈরি করো।`], { question: `${name}-এর এই পাঠে কোন ধারণাটি বিশেষভাবে শেখানো হয়েছে?`, options: [profile.specialTitle, "শুধু font styling", "Browser cache", "Image compression"], answer: 0, explanation: `${profile.specialTitle} এই ভাষার গুরুত্বপূর্ণ বৈশিষ্ট্য; এটি code-এর গঠন ও ব্যবহার বোঝাতে সাহায্য করে।` }));
  lessons.push(lesson("errors-and-debugging", 10, "Error, Debugging ও নিরাপদ অভ্যাস", "ভুল শনাক্ত, কারণ বোঝা এবং সমাধান যাচাই করতে শেখো।", [
    { title: "Error মানেই ব্যর্থতা নয়—এটি clue", paragraphs: ["Syntax error হলো লেখার নিয়ম ভাঙা; runtime error program চলার সময় ঘটে; logical error হলে program চলে কিন্তু ভুল ফল দেয়।", profile.errorText] },
    { title: "কোডের উদাহরণ", paragraphs: ["নিচের উদাহরণে input বা runtime error নিরাপদে সামলানোর একটি কৌশল দেখানো হয়েছে।"], code: profile.errorCode },
    { title: "Debugging checklist", paragraphs: ["Error message-এর প্রথম গুরুত্বপূর্ণ লাইন পড়ো। কোন file/line দেখাচ্ছে দেখো। input ছোট করো, একবারে একটি পরিবর্তন করো এবং একই test আবার চালাও।"] }
  ], ["একটি ইচ্ছাকৃত ভুল তৈরি করে error message পড়ো এবং ঠিক করো।", "খালি input, শূন্য, negative ও বড় value দিয়ে program পরীক্ষা করো।"], { question: "Logical error হলে সাধারণত কী ঘটে?", options: ["Program চলে কিন্তু ভুল ফল দেয়", "ফাইল সবসময় delete হয়", "Compiler নেই", "Keyboard বন্ধ হয়"], answer: 0, explanation: "Logical error-এ syntax ঠিক থাকতে পারে এবং program চলতে পারে, কিন্তু algorithm বা হিসাব ভুল হয়।" }));
  lessons.push(lesson("mini-project", 11, profile.projectTitle, `${name} দিয়ে নিজের প্রথম ছোট বাস্তব project`, [
    { title: "Project-এর লক্ষ্য", paragraphs: [profile.projectBrief, "Project শুরুর আগে input, processing, output এবং ভুল input-এর সম্ভাবনা লিখে নাও। ছোট feature দিয়ে শুরু করে ধীরে ধীরে বাড়াও।"] },
    { title: "করণীয় checklist", paragraphs: profile.projectRequirements },
    { title: "নিজে design করো", paragraphs: ["প্রথমে pseudocode বা ধাপ লেখো। এরপর ছোট function/module-এ কাজ ভাগ করো। Code লেখা শেষ হলে normal, boundary এবং invalid input দিয়ে পরীক্ষা করো।"] }
  ], profile.projectRequirements, { question: "Project শেষ হয়েছে বলার আগে কোন কাজটি করা জরুরি?", options: ["বিভিন্ন input দিয়ে test করে ভুল ঠিক করা", "শুধু title লেখা", "Code না চালিয়ে জমা দেওয়া", "সব comment মুছে ফেলা"], answer: 0, explanation: "বাস্তব project-এ correctness যাচাই ও edge-case testing গুরুত্বপূর্ণ।" }));
  return lessons;
}

function buildFromMasterCourse(language: Language): TutorialCourse | undefined {
  const chapterSlug = languageChapterMap[language.slug];
  if (!chapterSlug) return undefined;
  const chapter = getCourseChapter(chapterSlug);
  if (!chapter) return undefined;
  const lessons: TutorialLesson[] = chapter.lessons.map((item) => {
    const textBlocks = item.blocks.filter((block) => block.type !== "code").map((block) => block.text.trim()).filter(Boolean);
    const codeBlocks = item.blocks.filter((block) => block.type === "code").map((block) => block.text);
    const sections: TutorialSection[] = [];
    if (textBlocks.length) sections.push({ title: "পাঠের ব্যাখ্যা", paragraphs: textBlocks });
    codeBlocks.forEach((code, index) => sections.push({ title: `Code Example ${index + 1}`, paragraphs: ["নিচের উদাহরণটি নিজে টাইপ করো। প্রতিটি line-এর কাজ বোঝার চেষ্টা করো এবং output আগে অনুমান করো।"], code }));
    if (!sections.length) sections.push({ title: "ধাপে ধাপে শেখো", paragraphs: [item.title, "এই বিষয়টি নিজের ভাষায় লিখে ব্যাখ্যা করো; একটি নিজস্ব উদাহরণ তৈরি করে চালাও।"] });
    const cleanTitle = stripLessonPrefix(item.title);
    const exerciseBlocks = item.blocks.filter((block) => /অনুশীলন|প্রজেক্ট|নিজেকে যাচাই/i.test(block.text)).map((block) => block.text);
    return lesson(item.slug, item.number, cleanTitle, `${cleanTitle} বিষয়ে ধারণা, উদাহরণ ও অনুশীলন।`, sections,
      exerciseBlocks.length ? exerciseBlocks : [`${cleanTitle} বিষয়টি নিজের ভাষায় ব্যাখ্যা করো।`, "দেওয়া example-এ একটি পরিবর্তন করো এবং ফলাফল লিখে রাখো।"],
      { question: `${cleanTitle} শেখার পর কোন কাজটি নিজে করে দেখা উচিত?`, options: ["নিজস্ব উদাহরণ তৈরি করে চালানো", "শুধু title মুখস্থ করা", "কোনো test না করা", "সব code মুছে ফেলা"], answer: 0, explanation: "নিজে example তৈরি ও পরীক্ষা করলে ধারণা বাস্তবে বোঝা যায়।" }, "master-course");
  });
  const baseLessons = lessons;
  const references: TutorialReference[] = baseLessons.flatMap((item) => item.sections.filter((section) => section.code).slice(0, 1).map((section) => ({ term: item.title, meaning: section.paragraphs[0] ?? item.summary, example: (section.code ?? "").split("\n")[0] }))).slice(0, 20);
  const projects: TutorialProject[] = [
    { title: `${language.name} দিয়ে ছোট practical project`, level: "Beginner", brief: "এই chapter-এর ধারণা ব্যবহার করে বাস্তব সমস্যার ছোট সমাধান তৈরি করো।", requirements: ["Problem, input ও output নির্ধারণ করো।", "ছোট function/section-এ code ভাগ করো।", "ভুল input ও boundary case পরীক্ষা করো।"] },
    { title: `${language.name} revision challenge`, level: "Practice", brief: "এই course-এর ৩টি আলাদা lesson মিলিয়ে একটি ছোট কাজ তৈরি করো।", requirements: ["কমপক্ষে ৩টি lesson-এর ধারণা ব্যবহার করো।", "নিজের test case লেখো।", "কী শিখেছ README বা note-এ লেখো।"] }
  ];
  return { slug: language.slug, name: language.name, description: chapter.description, category: language.category, level: language.level, setup: `${language.name} শেখার জন্য official toolchain বা trusted editor ব্যবহার করো। প্রতিটি lesson-এ ব্যবহৃত command ও environment-এর version মিলিয়ে নাও।`, lessons: baseLessons, references, projects, sourceNote: "এই course-এর মূল ব্যাখ্যা CodeAtlas-এর বাংলা Master Course content থেকে নেওয়া এবং নতুন tutorial navigation ও practice অংশে সাজানো হয়েছে।" };
}

function buildOriginalCourse(language: Language): TutorialCourse {
  const profile = profiles[language.slug];
  const lessons = buildProfileLessons(language, profile);
  const projects: TutorialProject[] = [
    { title: profile.projectTitle, level: "Beginner", brief: profile.projectBrief, requirements: profile.projectRequirements },
    { title: `${language.name} শেখার চূড়ান্ত চ্যালেঞ্জ`, level: "Intermediate", brief: `${language.name}-এর variable, condition, loop, function ও collection ব্যবহার করে একটি ছোট command-line বা tool project তৈরি করো।`, requirements: ["Problem ও data structure নির্ধারণ করো।", "কমপক্ষে তিনটি পুনর্ব্যবহারযোগ্য function লেখো।", "ইনপুট যাচাই ও ত্রুটি সামলানোর ব্যবস্থা রাখো।", "README-তে setup, run ও test নির্দেশনা লিখে রাখো।"] },
    { title: `${language.name} ত্রুটি খুঁজে সমাধানের চ্যালেঞ্জ`, level: "Practice", brief: "ইচ্ছাকৃতভাবে ভুলসহ একটি ছোট program লিখে ত্রুটি খুঁজে ঠিক করো।", requirements: ["কমপক্ষে তিনটি আলাদা bug তৈরি করো।", "প্রতিটি bug-এর কারণ লেখো।", "একটি test দিয়ে fix যাচাই করো।"] }
  ];
  return { slug: language.slug, name: language.name, description: localizeLanguage(language).descriptionBn, category: language.category, level: language.level, setup: profile.setup, lessons, references: profile.references, projects, sourceNote: "এই ভাষার পাঠগুলো CodeAtlas-এর নিজস্ব বাংলা শিক্ষাসামগ্রী। ভাষার official documentation ও version-specific নির্দেশনা দিয়ে আরও বিস্তৃত করা হবে।" };
}

export function getTutorialCourse(slug: string): TutorialCourse | undefined {
  const language = languages.find((item) => item.slug === slug);
  if (!language) return undefined;
  const mapped = buildFromMasterCourse(language);
  if (mapped) return mapped;
  const profile = profiles[slug];
  if (!profile) return undefined;
  return buildOriginalCourse(language);
}

export const tutorialCourses: TutorialCourse[] = languages.map((language) => getTutorialCourse(language.slug)).filter((course): course is TutorialCourse => Boolean(course));
export const allTutorialLessonParams = tutorialCourses.flatMap((course) => course.lessons.map((item) => ({ slug: course.slug, lesson: item.slug })));
export function getTutorialLesson(courseSlug: string, lessonSlug: string) {
  const course = getTutorialCourse(courseSlug);
  const item = course?.lessons.find((entry) => entry.slug === lessonSlug);
  return course && item ? { course, lesson: item } : undefined;
}
export function tutorialBasePath(slug: string) { return `/tutorials/${slug}/`; }
export function tutorialResourceLinks(slug: string) {
  return [
    { key: "tutorial", label: "পাঠসমূহ", detail: "ধাপে ধাপে শেখার পাঠ", href: `/tutorials/${slug}/`, icon: "book" },
    { key: "examples", label: "উদাহরণ", detail: "Code দেখে শিখে পরীক্ষা করো", href: `/tutorials/${slug}/examples/`, icon: "code" },
    { key: "exercises", label: "অনুশীলন", detail: "নিজে সমস্যা সমাধান করো", href: `/tutorials/${slug}/exercises/`, icon: "pencil" },
    { key: "quizzes", label: "কুইজ", detail: "নিজের জ্ঞান যাচাই করো", href: `/tutorials/${slug}/quiz/`, icon: "help" },
    { key: "challenges", label: "চ্যালেঞ্জ ও প্রজেক্ট", detail: "বাস্তব কাজ তৈরি করো", href: `/tutorials/${slug}/challenges/`, icon: "target" },
    { key: "reference", label: "রেফারেন্স", detail: "Syntax ও keyword দ্রুত খুঁজে নাও", href: `/tutorials/${slug}/reference/`, icon: "list" },
  ];
}
export function tutorialDisplayTitle(course: TutorialCourse) { return `${course.name} Tutorial`; }
export { languages, courseChapters };
