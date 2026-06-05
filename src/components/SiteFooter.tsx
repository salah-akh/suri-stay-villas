import { Link } from "@tanstack/react-router";
import { Facebook, Home, Instagram, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Home className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xl font-extrabold">Hajazna</div>
              <div className="text-xs text-secondary-foreground/60">Premium Syrian stays</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-secondary-foreground/72">
            Curated villas, heritage homes, coastal escapes, and family retreats across Syria.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Explore</h4>
          <ul className="space-y-2.5 text-sm text-secondary-foreground/72">
            <li>
              <Link to="/listings" className="transition hover:text-white">
                All Villas
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Destinations</h4>
          <ul className="space-y-2.5 text-sm text-secondary-foreground/72">
            <li>Damascus</li>
            <li>Aleppo</li>
            <li>Latakia</li>
            <li>Palmyra</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/72">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-glow" /> +963 11 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-glow" /> hello@hajazna.com
            </li>
            <li className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/15"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/15"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-secondary-foreground/60">
        Copyright {new Date().getFullYear()} Hajazna. All rights reserved.
      </div>
    </footer>
  );
}
