import Image from "next/image";
import type { CSSProperties } from "react";
import { brand, hero, images, session } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowDown } from "./icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const photo = images.portrait ?? images.avatar;
  const isPortrait = images.portrait !== null;

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className={`hero__photo${isPortrait ? "" : " hero__photo--interim"} load-rise`} style={delay(0)}>
          <Image
            src={photo.src}
            alt={`${brand.name}`}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 960px) 440px, 34vw"
            preload
          />
        </div>

        <div className="hero__who load-rise" style={delay(60)}>
          <p className="hero__hello">{hero.hello}</p>
          <p className="hero__name">{brand.name}</p>
          <p className="hero__intro">{hero.intro}</p>
        </div>

        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title load-rise" style={delay(120)}>
            {hero.titleLines.map((line) => (
              <span key={line}>{line} </span>
            ))}
            <span className="hero__accent">{hero.titleAccent}</span>
          </h1>

          <div className="hero__session load-rise" style={delay(180)}>
            <p className="hero__session-name">{session.name}</p>
            <p className="hero__session-text">{hero.sessionText}</p>
          </div>

          <div className="hero__ctas load-rise" style={delay(240)}>
            <BookLink className="btn btn--light hero__book" id="hero-cta" source="hero">
              {hero.primaryCta}
              <ArrowDown className="btn__icon btn__icon--down" />
            </BookLink>
            <p className="hero__trust">{session.trustLine}</p>
          </div>
          <a className="hero__more load-rise" style={delay(300)} href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
