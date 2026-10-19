import Image from "next/image";
import { about } from "@/content/site";

/** Who I am: the two lifestyle photos next to what I care about. Placed right after the hero. */
export function About() {
  return (
    <section className="section section--paper about" id="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__photos" data-reveal>
          {about.photos.map((photo, i) => (
            <figure key={photo.src} className={`snap snap--${i + 1}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 960px) 340px, 60vw"
              />
            </figure>
          ))}
        </div>

        <div className="about__text">
          <div data-reveal>
            <h2 id="about-title">{about.title}</h2>
            <p className="lead about__intro">{about.intro}</p>
          </div>

          <ul className="values" data-reveal>
            {about.values.map((v) => (
              <li key={v.title} className="value">
                <h3 className="value__title">{v.title}</h3>
                <p className="value__text">{v.text}</p>
              </li>
            ))}
          </ul>

          <div data-reveal>
            <p className="about__closing">{about.closing}</p>
            <p className="about__signoff">{about.signoff}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
