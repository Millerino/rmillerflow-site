import { leaveWith } from "@/content/site";
import { MarkOk } from "./icons";

export function LeaveWith() {
  return (
    <section className="section section--paper leave" id="cover" aria-labelledby="cover-title">
      <div className="wrap leave__grid">
        <div className="leave__head" data-reveal>
          <h2 id="cover-title">{leaveWith.title}</h2>
          <p className="lead">{leaveWith.intro}</p>
        </div>

        <div data-reveal>
          <ul className="outcomes">
            {leaveWith.items.map((item) => (
              <li key={item.title} className="outcome">
                <MarkOk className="outcome__mark" />
                <div>
                  <h3 className="outcome__title">{item.title}</h3>
                  <p className="outcome__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="topics">
            <p className="topics__title">{leaveWith.topicsTitle}</p>
            <ul className="topics__list">
              {leaveWith.topics.map((t) => (
                <li key={t} className="pill">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
