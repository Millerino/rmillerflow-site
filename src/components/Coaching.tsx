import { coaching } from "@/content/site";
import { MarkOk, MarkX, SwapArrow } from "./icons";

export function Coaching() {
  return (
    <section className="section section--beeswax coaching" id="coaching" aria-labelledby="coaching-title">
      <div className="wrap">
        <div className="coaching__head" data-reveal>
          <h2 id="coaching-title">{coaching.title}</h2>
          <p className="lead">{coaching.intro}</p>
        </div>

        <ol className="stages" data-reveal>
          {coaching.stages.map((s, i) => (
            <li key={s.title} className="stage">
              <span className="stage__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="coaching__summary" data-reveal>
          {coaching.summary.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </p>

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
    </section>
  );
}
