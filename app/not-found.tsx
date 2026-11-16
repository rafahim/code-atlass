import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="page-hero"><div className="shell page-hero-inner not-found-inner"><span className="section-kicker">৪০৪ / পেজ পাওয়া যায়নি</span><h1>এই পেজটি <span>খুঁজে পাওয়া যাচ্ছে না।</span></h1><p>ঠিকানাটি ভুল হতে পারে অথবা page সরানো হয়েছে। আবার শেখা শুরু করতে Language তালিকায় ফিরে যাও।</p><Link href="/languages/" className="button button-primary">সব Language দেখো <Mark name="arrow" size={17} /></Link></div></section>
  );
}
