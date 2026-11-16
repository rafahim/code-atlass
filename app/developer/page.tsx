import type { Metadata } from "next";
import Link from "next/link";
import { RedirectTo } from "@/components/RedirectTo";
import { absoluteUrl } from "@/lib/site";

// The profile page now lives at /ra-fahim/. This stub keeps old links, bookmarks and search results working.
export const metadata: Metadata = {
  title: "RA Fahim",
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/ra-fahim/") },
};

export default function DeveloperRedirectPage() {
  return (
    <section className="section">
      <meta httpEquiv="refresh" content="0; url=../ra-fahim/" />
      <RedirectTo to="../ra-fahim/" />
      <div className="shell" style={{ textAlign: "center", padding: "80px 0" }}>
        <p>পেজটি নতুন ঠিকানায় সরানো হয়েছে।</p>
        <p><Link href="/ra-fahim/" className="text-link">RA Fahim-এর পেজে যাও →</Link></p>
      </div>
    </section>
  );
}
