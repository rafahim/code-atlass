import { CopyCodeButton } from "@/components/CopyCodeButton";

export function TutorialCodeExample({ title, code, output, language }: { title: string; code: string; output?: string; language: string }) {
  return <div className="atlas-example-box">
    <div className="atlas-example-head"><div><span className="atlas-example-dot" /> <strong>{title}</strong><small>{language}</small></div><CopyCodeButton code={code} /></div>
    <pre className="atlas-example-code"><code>{code}</code></pre>
    {output && <div className="atlas-example-output"><strong>প্রত্যাশিত ফলাফল</strong><pre>{output}</pre></div>}
  </div>;
}
