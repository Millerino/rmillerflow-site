import { leaveWith } from "@/content/site";

/** What a visitor gets from the call, in three short lines. */
export function LeaveWith() {
  return (
    <section className="section section--ivory section--ruled" id="cover" aria-labelledby="cover-title">
      <div className="wrap">
        <h2 id="cover-title" data-reveal>
          {leaveWith.title}
        </h2>
        <ol className="benefits">
          {leaveWith.items.map((item, i) => (
            <li key={item.title} className="benefits__item" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="benefits__n" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="benefits__title">{item.title}</h3>
              <p className="benefits__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
