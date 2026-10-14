import { approach } from "@/content/site";

export function Approach() {
  return (
    <section className="section section--tallow approach" id="approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="approach__head" data-reveal>
          <h2 id="approach-title">{approach.title}</h2>
          <p className="lead">{approach.intro}</p>
        </div>

        <ol className="principles" data-reveal>
          {approach.principles.map((p, i) => (
            <li key={p.title} className="principle">
              <span className="principle__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="principle__body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {"note" in p && p.note ? <p className="principle__note">{p.note}</p> : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="statement" data-reveal>
          <span>{approach.statement[0]}</span> <span className="statement__second">{approach.statement[1]}</span>
        </p>
      </div>
    </section>
  );
}
