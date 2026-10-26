import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { BookingDialog } from "@/components/BookingDialog";
import { ConsentBanner } from "@/components/Consent";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeaveWith } from "@/components/LeaveWith";
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
        <LeaveWith />
        <HowItWorks />
        <About />
        <Booking />
        <Faq />
      </main>
      <Footer />
      <StickyBook />
      <BookingDialog />
      <ConsentBanner />
      <RevealObserver />
    </>
  );
}
