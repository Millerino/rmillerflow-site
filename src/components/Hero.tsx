import Image from "next/image";
import type { CSSProperties } from "react";
import { hero, images, priceText, session, type PricePromo } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowRight, Compass } from "./icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * First screen: who, what, price and one obvious next step. The portrait sits beside the
 * headline on phones so the booking button stays on the first screen.
 */
export function Hero({ promo }: { promo: PricePromo | null }) {
  const photo = images.portrait;

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <p className="eyebrow hero__eyebrow rise" style={delay(0)}>
          {hero.eyebrow}
        </p>

        <h1 id="hero-title" className="hero__title rise" style={delay(60)}>
          {hero.title} <em>{hero.titleAccent}</em>
        </h1>

        <figure className="hero__figure rise" style={delay(30)}>
          <div className="hero__photo">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 960px) 440px, 42vw"
              preload
            />
            <span className="hero__tag" aria-hidden="true">
              {hero.photoTag}
            </span>
          </div>
          <figcaption className="hero__caption">
            <strong>{hero.photoTag}</strong>
            <span>{hero.photoCaption}</span>
          </figcaption>
        </figure>

        <p className="hero__text rise" style={delay(120)}>
          {hero.text}
        </p>

        <div className="hero__actions rise" style={delay(170)}>
          <BookLink id="hero-cta" className="btn btn--forest btn--block hero__cta" source="hero">
            {hero.book}
            <ArrowRight className="btn__arrow" />
          </BookLink>
          <p className="hero__meta">
            {priceText(promo)} · {session.durationMinutes} min · {session.format}
          </p>
          <BookLink className="hero__guided" source="hero-guided" mode="guided">
            <Compass />
            {hero.guided}
          </BookLink>
        </div>
      </div>
    </section>
  );
}
