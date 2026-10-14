import Image from "next/image";
import type { CSSProperties } from "react";
import { hero, images } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowDown, ArrowUpRight } from "./icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__hello load-rise" style={delay(0)}>
            <Image src={images.avatar.src} alt="" width={36} height={36} className="hero__avatar" preload />
            {hero.hello}
          </p>
          <h1 id="hero-title" className="hero__title load-rise" style={delay(80)}>
            {hero.titleLines.map((line) => (
              <span key={line}>{line} </span>
            ))}
            <span className="hero__accent">{hero.titleAccent}</span>
          </h1>
          <p className="hero__lede load-rise" style={delay(160)}>
            {hero.lede}
          </p>
          <div className="hero__ctas load-rise" style={delay(240)}>
            <a className="btn btn--light" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowDown className="btn__icon btn__icon--down" />
            </a>
            <BookLink className="btn btn--ghost">
              {hero.secondaryCta}
              <ArrowUpRight className="btn__icon btn__icon--diag" />
            </BookLink>
          </div>
          <p className="hero__cred load-rise" style={delay(320)}>
            <span className="hero__cred-dot" aria-hidden="true" />
            {hero.credibility}
          </p>
        </div>

        <figure className="fan">
          <div className="fan__stage">
            {images.boards.map((img, i) => (
              <div key={img.src} className={`fan__card fan__card--${i + 1}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 340px, 64vw"
                  preload={i === 0}
                />
              </div>
            ))}
          </div>
          <figcaption className="fan__caption">{images.boardsCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
