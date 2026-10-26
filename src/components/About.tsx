import Image from "next/image";
import { about, brand, images } from "@/content/site";
import { ArrowUpRight } from "./icons";

/** A short, personal introduction with an authentic photo. */
export function About() {
  const photo = images.coast;

  return (
    <section className="section section--ivory" id="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__photo" data-reveal>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 960px) 420px, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
          />
        </div>
        <div className="about__copy" data-reveal>
          <h2 id="about-title">{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="about__text">
              {p}
            </p>
          ))}
          <a className="textlink about__link" href={brand.tiktokUrl} target="_blank" rel="noopener">
            {about.tiktok}
            <ArrowUpRight className="textlink__arrow textlink__arrow--diag" width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
