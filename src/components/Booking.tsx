import { booking, pricePromo, promoLine, session } from "@/content/site";
import { CalendarEmbed } from "./CalendarEmbed";

/** Booking section lower on the page: offer details and the calendar together. */
export function Booking() {
  return (
    <section className="section section--oxblood booking" id="book" aria-labelledby="book-title">
      <div className="wrap booking__grid">
        <div className="booking__info" data-reveal>
          <h2 id="book-title">{booking.title}</h2>
          <p className="booking__intro">{booking.intro}</p>

          <div className="offer">
            <p className="offer__name">{session.name}</p>
            <p className="offer__price">
              {pricePromo?.kind === "sale" && (
                <s className="offer__was">
                  <span className="sr-only">Was </span>
                  {pricePromo.wasLabel}
                </s>
              )}
              <span className="offer__amount">{session.priceLabel}</span>
            </p>
            {promoLine() && <p className="offer__promo">{promoLine()}</p>}
            <dl className="offer__facts">
              <div>
                <dt>Length</dt>
                <dd>{session.durationMinutes} minutes</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{session.format}</dd>
              </div>
              <div>
                <dt>Rescheduling</dt>
                <dd>Free up to {session.rescheduleHours}h before</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="booking__calendar">
          <CalendarEmbed namespace="rm30" load="near" />
          <div className="booking__fine">
            {booking.fine.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
