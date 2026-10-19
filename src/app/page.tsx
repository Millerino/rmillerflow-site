import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { CheckIn } from "@/components/CheckIn";
import { Coaching } from "@/components/Coaching";
import { ConsentBanner } from "@/components/Consent";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Proof } from "@/components/Proof";
import { RevealObserver } from "@/components/RevealObserver";
import { StickyBook } from "@/components/StickyBook";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Proof />
        <Problem />
        <Approach />
        <CheckIn />
        <Coaching />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBook />
      <ConsentBanner />
      <RevealObserver />
    </>
  );
}
