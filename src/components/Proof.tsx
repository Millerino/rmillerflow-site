import Image from "next/image";
import { brand, proof } from "@/content/site";
import { ArrowUpRight } from "./icons";

export function Proof() {
  const hasStats = proof.stats.length > 0;
  const hasTestimonials = proof.testimonials.length > 0;

  return (
    <section className="section section--tallow proof" id="proof" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="proof__head" data-reveal>
          <h2 id="proof-title">{proof.title}</h2>
          <p className="lead">{proof.intro}</p>
        </div>

        {hasStats ? (
          <div data-reveal>
            <dl className="stats">
              {proof.stats.map((s) => (
                <div key={s.label} className="stat">
                  <dt className="stat__label">{s.label}</dt>
                  <dd className="stat__value">{s.value}</dd>
                </div>
              ))}
            </dl>
            {proof.statsNote ? <p className="stats__note">{proof.statsNote}</p> : null}
          </div>
        ) : null}

        <ul className="posts" data-reveal>
          {proof.images.map((img, i) => (
            <li key={img.src} className={`post post--${(i % 3) + 1}`}>
              <a href={brand.tiktokUrl} target="_blank" rel="noopener" className="post__link">
                <span className="post__frame">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 960px) 360px, 74vw"
                  />
                </span>
                <span className="post__caption">{img.caption}</span>
              </a>
            </li>
          ))}
        </ul>

        <a className="textlink proof__cta" href={brand.tiktokUrl} target="_blank" rel="noopener">
          {proof.cta}
          <ArrowUpRight className="textlink__icon textlink__icon--diag" width={18} height={18} />
        </a>

        {hasTestimonials ? (
          <div className="quotes" data-reveal>
            <h3 className="quotes__title">{proof.testimonialsTitle}</h3>
            <ul className="quotes__list">
              {proof.testimonials.map((t) => (
                <li key={t.quote} className="quote">
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <p className="quote__who">
                    {t.name}
                    {t.detail ? <span>, {t.detail}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
