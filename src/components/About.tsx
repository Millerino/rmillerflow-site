import Image from "next/image";
import { about, brand, images } from "@/content/site";

export function About() {
  const photo = images.avatar;

  return (
    <section className="section section--tallow about" id="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__side" data-reveal>
          <h2 id="about-title">{about.title}</h2>
          <div className="about__id">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="104px"
              className="about__avatar"
            />
            <div>
              <p className="about__name">{brand.name}</p>
              <a className="about__handle" href={brand.tiktokUrl} target="_blank" rel="noopener">
                {brand.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="about__text" data-reveal>
          {about.paragraphs.map((p, i) => (
            <p key={p} className={i === 0 ? "about__first" : undefined}>
              {p}
            </p>
          ))}
          <p className="about__signoff">{about.signoff}</p>
        </div>
      </div>
    </section>
  );
}
