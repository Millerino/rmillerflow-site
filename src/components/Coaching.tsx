import { booking, coaching, session } from "@/content/site";
import { CalendarEmbed } from "./CalendarEmbed";
import { MarkOk, MarkX, SwapArrow } from "./icons";

/** "How I help": what a session covers, what you leave with, the price and the booking calendar. */
export function Coaching() {
  const hasPrevious = typeof session.previousPrice === "number" && session.previousPrice > session.price;

  return (
    <section className="section section--beeswax coaching" id="coaching" aria-labelledby="coaching-title">
      <div className="wrap">
        <div className="coaching__head" data-reveal>
          <h2 id="coaching-title">{coaching.title}</h2>
          <p className="lead">{coaching.intro}</p>
          <div className="topics-row">
            <p className="topics-row__title">{coaching.topicsTitle}</p>
            <ul className="topics-row__list">
              {coaching.topics.map((t) => (
                <li key={t} className="pill">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="coaching__grid">
          <ol className="stages" data-reveal>
            {coaching.stages.map((s, i) => (
              <li key={s.title} className="stage">
                <span className="stage__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="leave" data-reveal>
            <h3 className="leave__title">{coaching.leaveTitle}</h3>
            <ul className="swaps">
              {coaching.leaveWith.map((item) => (
                <li key={item.to} className="swap">
                  <span className="swap__from">
                    <MarkX className="swap__mark swap__mark--x" />
                    <span>
                      <span className="sr-only">Instead of: </span>
                      {item.from}
                    </span>
                  </span>
                  <SwapArrow className="swap__arrow" />
                  <span className="swap__to">
                    <MarkOk className="swap__mark swap__mark--ok" />
                    <span>
                      <span className="sr-only">You leave with: </span>
                      {item.to}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="leave__note">{coaching.note}</p>
          </div>
        </div>

        <div className="pricing-head" data-reveal>
          <h3 id="book-title" className="pricing__summary">
            {booking.summary.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </h3>
          <p className="pricing__intro">{booking.intro}</p>
        </div>

        {/* Book buttons land here: price first, calendar right after. */}
        <div className="pricing" id="book" role="region" aria-labelledby="book-title">
          <div className="pricing__info">
            <div className="offer">
              <p className="offer__name">{session.name}</p>
              <p className="offer__price">
                {hasPrevious ? (
                  <s className="offer__was" aria-label={`Previously ${session.previousPrice} dollars`}>
                    ${session.previousPrice}
                  </s>
                ) : null}
                <span className="offer__amount">${session.price}</span>
                <span className="offer__currency">{session.currency}</span>
              </p>
              <dl className="offer__facts">
                <div>
                  <dt>Duration</dt>
                  <dd>{session.durationMinutes} minutes</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>{session.format}</dd>
                </div>
                <div>
                  <dt>Reschedule</dt>
                  <dd>Free up to {session.rescheduleHours}h before</dd>
                </div>
              </dl>
              <p className="offer__reassure">{booking.reassurance}</p>
            </div>
          </div>

          <div className="pricing__calendar">
            <p className="pricing__calendar-title">{booking.calendarTitle}</p>
            <CalendarEmbed />
            <p className="pricing__fine">{booking.afterCta}</p>
            <p className="pricing__fine">{booking.age}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
