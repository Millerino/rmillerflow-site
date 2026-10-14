import { brand, content } from "@/content/site";
import { ArrowUpRight, TopicIcon } from "./icons";

export function Content() {
  return (
    <section className="section section--iron content" id="content" aria-labelledby="content-title">
      <div className="wrap">
        <div className="content__head" data-reveal>
          <h2 id="content-title">{content.title}</h2>
          <p className="lead">{content.intro}</p>
        </div>

        <ul className="topics" data-reveal>
          {content.topics.map((t) => (
            <li key={t.id} className={`topic topic--${t.id}`}>
              <TopicIcon name={t.icon} className="topic__icon" />
              <h3 className="topic__title">{t.title}</h3>
              <p className="topic__text">{t.text}</p>
              {"swaps" in t ? (
                <ul className="topic__swaps">
                  {t.swaps.map(([from, to]) => (
                    <li key={from}>
                      <s>{from}</s>
                      <span aria-hidden="true" className="topic__swap-arrow" />
                      <span className="sr-only">swapped for</span>
                      <b>{to}</b>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <a className="textlink textlink--light" href={brand.tiktokUrl} target="_blank" rel="noopener" data-reveal>
          {content.cta}
          <ArrowUpRight className="textlink__icon textlink__icon--diag" width={18} height={18} />
        </a>
      </div>
    </section>
  );
}
