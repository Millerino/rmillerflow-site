import Image from "next/image";
import type { CSSProperties } from "react";
import { cta, hero, images, promoLine, session } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowRight } from "./icons";
import { PriceTag } from "./PriceTag";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * First screen: a short intro, then a few clear choices. The big button opens the booking
 * calendar straight away; the smaller options jump to the parts of the page that explain more.
 * On phones the photo stays small beside the intro so the button is always on the first screen.
 */
export function Hero() {
  const photo = images.portrait;
  const promo = promoLine();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__photo load-rise" style={delay(0)}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 960px) 400px, 92px"
            preload
          />
        </div>

        <div className="hero__who load-rise" style={delay(40)}>
          <p className="hero__kicker">{hero.kicker}</p>
          <p className="hero__intro">{hero.intro}</p>
        </div>

        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title load-rise" style={delay(80)}>
            <span>{hero.title} </span>
            <span className="hero__accent">{hero.titleAccent}</span>
          </h1>
          <p className="hero__text load-rise" style={delay(120)}>
            {hero.text}
          </p>

          <div className="hero__start load-rise" style={delay(160)}>
            <BookLink className="startbtn" id="hero-cta" source="hero">
              <span className="startbtn__text">
                <span className="startbtn__main">{cta.start}</span>
                <span className="startbtn__sub">
                  {cta.startSub}
                  <ArrowRight className="startbtn__arrow" />
                </span>
              </span>
              <PriceTag className="startbtn__price" />
            </BookLink>
            <div className="hero__facts">
              <p className="hero__details">{session.details}</p>
              {promo && <p className="hero__promo">{promo}</p>}
              <p className="hero__reschedule">{session.reschedule}</p>
            </div>
          </div>

          <nav className="hero__options load-rise" style={delay(200)} aria-labelledby="hero-options-title">
            <p id="hero-options-title" className="hero__options-title">
              {hero.optionsTitle}
            </p>
            <ul>
              {hero.options.map((o) => (
                <li key={o.href}>
                  <a className="option" href={o.href}>
                    <span>{o.label}</span>
                    <ArrowRight className="option__arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
