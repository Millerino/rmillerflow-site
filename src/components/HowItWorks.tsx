import { cta, howItWorks } from "@/content/site";
import { BookLink } from "./BookLink";

export function HowItWorks() {
  return (
    <section className="section section--beeswax how" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <h2 id="how-title" data-reveal>
          {howItWorks.title}
        </h2>
        <ol className="steps" data-reveal>
          {howItWorks.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="how__cta" data-reveal>
          <BookLink className="btn btn--dark" source="how">
            {cta.primary}
          </BookLink>
        </div>
      </div>
    </section>
  );
}
