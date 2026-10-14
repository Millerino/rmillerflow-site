import { brand, footer } from "@/content/site";
import { BookLink } from "./BookLink";

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
          <BookLink>Book a session</BookLink>
        </nav>
        <div className="footer__small">
          <p>{footer.disclaimer}</p>
          <p>
            {footer.privacy}{" "}
            <a href={footer.calPrivacyUrl} target="_blank" rel="noopener">
              Cal.com privacy policy
            </a>
          </p>
          <p>
            &copy; {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
