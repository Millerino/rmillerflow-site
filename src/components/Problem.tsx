import { problem } from "@/content/site";
import { MarkX } from "./icons";

export function Problem() {
  return (
    <section className="section section--paper problem" aria-labelledby="problem-title">
      <div className="wrap">
        <div className="problem__head" data-reveal>
          <h2 id="problem-title" className="problem__title">
            {problem.title}
          </h2>
          <p className="problem__answer">{problem.answer}</p>
          <p className="problem__body">{problem.body}</p>
        </div>

        <ul className="problem__points">
          {problem.points.map((p, i) => (
            <li key={p.title} className="problem__point" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <MarkX className="problem__mark" />
              <div>
                <h3 className="problem__point-title">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
