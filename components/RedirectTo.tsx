"use client";

import { useEffect } from "react";

/** Sends visitors of an old URL to its new home (relative target keeps any base path intact). */
export function RedirectTo({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(new URL(to, window.location.href).toString());
  }, [to]);
  return null;
}
