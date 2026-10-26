import { pricePromo, session } from "@/content/site";

/**
 * The session price as a small tag. Shows the promotion from `pricePromo` when one is set
 * ("Intro price", or a real struck-through before-price); otherwise just the price.
 */
export function PriceTag({ className = "" }: { className?: string }) {
  const promo = pricePromo;
  return (
    <span className={`pricetag ${className}`.trim()}>
      {promo?.kind === "intro" && <span className="pricetag__label">Intro price</span>}
      {promo?.kind === "sale" && (
        <span className="pricetag__was">
          <span className="sr-only">Was </span>
          <s>{promo.wasLabel}</s>
          <span className="sr-only">, now </span>
        </span>
      )}
      <span className="pricetag__now">{session.priceLabel}</span>
    </span>
  );
}
