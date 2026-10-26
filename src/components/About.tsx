import Image from "next/image";
import { about, brand } from "@/content/site";
import { ArrowUpRight } from "./icons";

/** Short personal introduction to coach Miller, with the two lifestyle photos. */
export function About() {
  return (
    <section className="section section--tallow about" id="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__photos" data-reveal>
          {about.photos.map((photo, i) => (
            <figure key={photo.src} className={`snap snap--${i + 1}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 960px) 300px, 56vw"
              />
            </figure>
          ))}
        </div>

        <div className="about__text" data-reveal>
          <h2 id="about-title">{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="about__p">
              {p}
            </p>
          ))}
          <a className="textlink about__tiktok" href={brand.tiktokUrl} target="_blank" rel="noopener">
            {about.tiktokCta}
            <ArrowUpRight className="textlink__icon textlink__icon--diag" width={18} height={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
