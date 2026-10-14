import { brand, finalCta } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowRight } from "./icons";

export function FinalCta() {
  return (
    <section className="section section--oxblood final" aria-labelledby="final-title">
      <div className="wrap final__inner" data-reveal>
        <h2 id="final-title">{finalCta.title}</h2>
        <p className="lead">{finalCta.text}</p>
        <BookLink className="btn btn--light">
          {finalCta.cta}
          <ArrowRight className="btn__icon btn__icon--right" />
        </BookLink>
        <p className="final__soft">
          {finalCta.soft}{" "}
          <a href={brand.tiktokUrl} target="_blank" rel="noopener">
            {finalCta.softLink}
          </a>
        </p>
      </div>
    </section>
  );
}
