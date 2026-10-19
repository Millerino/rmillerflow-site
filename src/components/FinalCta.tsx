import { brand, finalCta } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowUpRight, ArrowUp } from "./icons";

export function FinalCta() {
  return (
    <section className="section section--oxblood final" aria-labelledby="final-title">
      <div className="wrap final__inner" data-reveal>
        <h2 id="final-title">{finalCta.title}</h2>
        <p className="lead">{finalCta.text}</p>
        <BookLink className="btn btn--light" source="final">
          {finalCta.cta}
          <ArrowUp className="btn__icon btn__icon--up" />
        </BookLink>
        <p className="final__soft">
          {finalCta.soft}{" "}
          <a href={brand.tiktokUrl} target="_blank" rel="noopener">
            {finalCta.softLink}
            <ArrowUpRight className="final__soft-icon" width={14} height={14} />
          </a>
        </p>
      </div>
    </section>
  );
}
