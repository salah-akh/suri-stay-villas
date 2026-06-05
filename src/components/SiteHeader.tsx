import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, User, Heart, Plus, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, type Lang } from "@/lib/i18n";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/listings", key: "nav.villas" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const cycle = () => setLang(lang === "tr" ? "ar" : lang === "ar" ? "en" : "tr");
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card">
      {/* Top utility bar */}
      <div className="hidden border-b border-border bg-muted/60 md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-end gap-5 px-4 text-xs text-muted-foreground sm:px-6">
          <a href="#" className="hover:text-link">{t("nav.help")}</a>
          <LangSwitcher lang={lang} setLang={setLang} />
          <a href="#" className="hover:text-link">{t("nav.listVilla")}</a>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <span className="bg-primary px-2.5 py-1 text-lg font-extrabold tracking-tight text-primary-foreground">
            حجزنا<span className="text-price">.com</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-sm px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted"
              activeProps={{ className: "rounded-sm px-3 py-1.5 text-sm font-semibold text-link bg-muted" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
            <Heart className="h-4 w-4" /> {t("nav.favorites")}
          </button>
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
            <User className="h-4 w-4" /> {t("nav.signIn")}
          </button>
          <Button asChild size="sm" className="h-8 gap-1.5 rounded-sm bg-price text-white hover:bg-price/90">
            <Link to="/contact"><Plus className="h-4 w-4" /> {t("nav.postListing")}</Link>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <button
            onClick={cycle}
            className="flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-xs font-semibold"
            aria-label="Language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-1">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border-b border-border/60 py-3 text-sm font-semibold text-foreground last:border-0"
                onClick={() => setOpen(false)}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1">
      <Globe className="h-3.5 w-3.5" />
      <button
        onClick={() => setLang("tr")}
        className={`px-1 font-semibold ${lang === "tr" ? "text-link" : "hover:text-link"}`}
      >
        TR
      </button>
      <span className="text-muted-foreground/60">/</span>
      <button
        onClick={() => setLang("ar")}
        className={`px-1 font-semibold ${lang === "ar" ? "text-link" : "hover:text-link"}`}
      >
        AR
      </button>
      <span className="text-muted-foreground/60">/</span>
      <button
        onClick={() => setLang("en")}
        className={`px-1 font-semibold ${lang === "en" ? "text-link" : "hover:text-link"}`}
      >
        EN
      </button>
    </div>
  );
}