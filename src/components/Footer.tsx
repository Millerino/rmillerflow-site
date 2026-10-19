import { brand, footer } from "@/content/site";
import { pixelEnabled } from "@/lib/tracking";
import { BookLink } from "./BookLink";
import { ConsentSettingsButton } from "./Consent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="footer__wordmark">{brand.name}</p>
          <p className="footer__statement">{footer.statement}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href={brand.tiktokUrl} target="_blank" rel="noopener">
            TikTok {brand.handle}
          </a>
          <BookLink source="footer">Book a session</BookLink>
        </nav>
        <div className="footer__small">
          <p>{footer.disclaimer}</p>
          <p>{pixelEnabled ? footer.privacyWithPixel : footer.privacyNoPixel}</p>
          <p className="footer__legal">
            <a href="/privacy">Privacy</a>
            <ConsentSettingsButton />
            <span>
              &copy; {year} {brand.name}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
