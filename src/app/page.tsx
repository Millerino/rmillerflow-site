import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Booking } from "@/components/Booking";
import { CheckIn } from "@/components/CheckIn";
import { Coaching } from "@/components/Coaching";
import { Content } from "@/components/Content";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Approach />
        <CheckIn />
        <Coaching />
        <Booking />
        <About />
        <Content />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
