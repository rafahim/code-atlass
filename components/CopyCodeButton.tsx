"use client";

import { useState } from "react";
import { Mark } from "@/components/Mark";

export function CopyCodeButton({ code }: { code: string }) {
  const [label, setLabel] = useState("কপি করো");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setLabel("কপি হয়েছে");
      window.setTimeout(() => setLabel("কপি করো"), 1600);
    } catch {
      setLabel("কপি হয়নি");
      window.setTimeout(() => setLabel("কপি করো"), 1600);
    }
  }

  return <button type="button" className="copy-lesson-code" onClick={copy} aria-label="Code কপি করো"><Mark name="copy" size={13} /> {label}</button>;
}
