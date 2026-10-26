import Image from "next/image";
import { finalCta, flow, images, priceText, promoNote, session, type PricePromo } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowRight } from "./icons";

/** Closing invitation. Old /book links land here. */
export function FinalCta({ promo }: { promo: PricePromo | null }) {
  const photo = images.cliff;
  const note = promoNote(promo);

  return (
    <section className="section section--forest final" id="book" aria-labelledby="book-title">
      <div className="wrap final__grid">
        <div className="final__copy" data-reveal>
          <h2 id="book-title">{finalCta.title}</h2>
          <p className="final__text">{finalCta.text}</p>
          <BookLink className="btn btn--ivory final__btn" source="final">
            {finalCta.button}
            <ArrowRight className="btn__arrow" />
          </BookLink>
          <p className="final__price">
            {priceText(promo)}
            {note ? ` · ${note}` : ""}
          </p>
          <p className="final__terms">{session.reschedule}</p>
          <div className="final__fine">
            {flow.fine.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className="final__photo" data-reveal>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 960px) 380px, 0px"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
