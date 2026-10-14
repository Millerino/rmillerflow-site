import { booking, session } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowRight } from "./icons";

export function Booking() {
  const hasPrevious = typeof session.previousPrice === "number" && session.previousPrice > session.price;

  return (
    <section className="section section--paper booking" id="book" aria-labelledby="booking-title">
      <div className="wrap booking__grid">
        <div className="booking__copy" data-reveal>
          <h2 id="booking-title">{booking.title}</h2>
          <p className="lead">{booking.intro}</p>
        </div>

        <div className="offer" data-reveal>
          <p className="offer__name">{session.title}</p>
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
              <dd>1-on-1</dd>
            </div>
            <div>
              <dt>Reschedule</dt>
              <dd>Free up to {session.rescheduleHours}h before</dd>
            </div>
          </dl>
          <p className="offer__reassure">{booking.reassurance}</p>
          <BookLink className="btn btn--light btn--block">
            {booking.cta}
            <ArrowRight className="btn__icon btn__icon--right" />
          </BookLink>
          <p className="offer__fine">{booking.afterCta}</p>
          <p className="offer__fine">{booking.age}</p>
        </div>
      </div>
    </section>
  );
}
