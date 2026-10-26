import { howItWorks } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowRight } from "./icons";

/** Three steps, from choosing a time to leaving with next steps. */
export function HowItWorks() {
  return (
    <section className="section section--sand" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <h2 id="how-title" data-reveal>
          {howItWorks.title}
        </h2>
        <ol className="steps">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="steps__item" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="steps__n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="steps__title">{step.title}</h3>
                <p className="steps__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <BookLink className="textlink steps__cta" source="how">
          {howItWorks.steps[0].title}
          <ArrowRight className="textlink__arrow" />
        </BookLink>
      </div>
    </section>
  );
}
