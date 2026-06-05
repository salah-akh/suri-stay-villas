import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-display font-bold">Hajazna</span>
          </div>
          <p className="mt-3 text-sm opacity-80">
            Premium villas and vacation rentals across Syria. Discover authentic stays from Damascus to the Mediterranean coast.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-90">Explore</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/listings">All Villas</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-90">Destinations</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Damascus</li>
            <li>Aleppo</li>
            <li>Latakia</li>
            <li>Palmyra</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-90">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +963 11 000 0000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@hajazna.com</li>
            <li className="mt-3 flex gap-3">
              <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} حجزنا. All rights reserved.
      </div>
    </footer>
  );
}