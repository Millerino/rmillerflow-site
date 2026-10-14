import Image from "next/image";
import { about, brand, images } from "@/content/site";

export function About() {
  const photo = images.portrait ?? images.avatar;
  const isPortrait = images.portrait !== null;

  return (
    <section className="section section--tallow about" id="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__side" data-reveal>
          <h2 id="about-title">{about.title}</h2>
          <div className={isPortrait ? "about__portrait" : "about__id"}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={isPortrait ? "(min-width: 1024px) 420px, 90vw" : "120px"}
              className={isPortrait ? "about__portrait-img" : "about__avatar"}
            />
            {!isPortrait ? (
              <div>
                <p className="about__name">{brand.name}</p>
                <a className="about__handle" href={brand.tiktokUrl} target="_blank" rel="noopener">
                  {brand.handle}
                </a>
              </div>
            ) : null}
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
