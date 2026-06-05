import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, Heart, Home, Menu, Plus, User, X } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AppBottomNav } from "@/components/AppBottomNav";
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
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-card/95 text-foreground shadow-[var(--shadow-card)] backdrop-blur">
        <AdSlot slotId="top" variant="top" />
        <div className="hidden border-b border-border/70 bg-muted/40 md:block">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-5 px-4 text-xs text-muted-foreground sm:px-6">
            <a href="#" className="transition hover:text-primary">
              {t("nav.help")}
            </a>
            <LangSwitcher lang={lang} setLang={setLang} />
            <Link to="/post-listing" className="transition hover:text-primary">
              {t("nav.listVilla")}
            </Link>
            <Link to="/admin" className="font-semibold transition hover:text-primary">
              Admin
            </Link>
          </div>
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
              <Home className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-extrabold">Hajazna</span>
              <span className="mt-1 text-[11px] font-medium text-muted-foreground">
                Villa kiralama app
              </span>
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                activeProps={{
                  className:
                    "rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary",
                }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <button className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary">
              <Heart className="h-4 w-4" /> {t("nav.favorites")}
            </button>
            <button className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary">
              <User className="h-4 w-4" /> {t("nav.signIn")}
            </button>
            <Button asChild size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/post-listing">
                <Plus className="h-4 w-4" /> {t("nav.postListing")}
              </Link>
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <button
              onClick={cycle}
              className="flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs font-semibold text-muted-foreground"
              aria-label="Language"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border/70 bg-card md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-2 py-3 text-sm font-semibold text-muted-foreground"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                to="/admin"
                className="rounded-md px-2 py-3 text-sm font-semibold text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
              <Button asChild className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/post-listing" onClick={() => setOpen(false)}>
                  <Plus className="h-4 w-4" /> {t("nav.postListing")}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
      <AppBottomNav />
    </>
  );
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (nextLang: Lang) => void }) {
  return (
    <div className="flex items-center gap-1">
      <Globe className="h-3.5 w-3.5" />
      {(["tr", "ar", "en"] as Lang[]).map((item, index) => (
        <span key={item} className="flex items-center gap-1">
          {index > 0 && <span className="text-border">/</span>}
          <button
            onClick={() => setLang(item)}
            className={`px-1 font-semibold transition ${
              lang === item ? "text-primary" : "hover:text-primary"
            }`}
          >
            {item.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
