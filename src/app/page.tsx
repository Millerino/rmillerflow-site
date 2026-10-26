import { About } from "@/components/About";
import { BookingFlow } from "@/components/BookingFlow";
import { ConsentBanner } from "@/components/Consent";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeaveWith } from "@/components/LeaveWith";
import { RevealObserver } from "@/components/RevealObserver";
import { StickyBook } from "@/components/StickyBook";
import { activePromo } from "@/content/site";

// Rebuild the page hourly so the intro price note switches off by itself when it ends.
export const revalidate = 3600;

export default function Home() {
  const promo = activePromo();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero promo={promo} />
        <LeaveWith />
        <HowItWorks />
        <About />
        <Faq promo={promo} />
        <FinalCta promo={promo} />
      </main>
      <Footer />
      <StickyBook />
      <BookingFlow promo={promo} />
      <ConsentBanner />
      <RevealObserver />
    </>
  );
}
