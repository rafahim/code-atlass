import type { Metadata } from "next";
import Link from "next/link";
import { RetryButton } from "@/components/RetryButton";

export const metadata: Metadata = {
  title: "অফলাইন",
  description: "ইন্টারনেট সংযোগ নেই।",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="section offline-page">
      <div className="shell offline-inner">
        <span className="section-kicker">অফলাইন</span>
        <h1>ইন্টারনেট সংযোগ পাওয়া যাচ্ছে না</h1>
        <p>এই পাতাটি আগে খোলা হয়নি, তাই অফলাইনে সেভ নেই। যে পাঠগুলো আগে একবার খুলেছ সেগুলো ইন্টারনেট ছাড়াই খুলবে। সংযোগ ফিরলে আবার চেষ্টা করো।</p>
        <div className="offline-actions">
          <RetryButton />
          <Link href="/" className="button button-ghost">হোমে যাও</Link>
        </div>
      </div>
    </section>
  );
}
