import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight, Heart, Home, Languages, LogOut, Mail, User } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/lib/auth-store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Hesabim - Hajazna" },
      { name: "description", content: "Profil, dil ve ilan ayarlarinizi yonetin." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, logout } = useAuthUser();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1 px-4 py-5 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Hesabim</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Profil, dil secimi ve kendi ilanlarinizi buradan yonetin.
          </p>

          <div className="mt-5 border-y border-border/70 py-4">
            <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              {user ? user.email : "Henuz giris yapilmadi"}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {user
                ? "Mesaj gonderebilir, mesajlarinizi gorebilir ve ilan verebilirsiniz."
                : "Mesaj gondermek veya ilan vermek istediginizde once giris yapmaniz istenecek."}
            </p>
          </div>

          <div className="divide-y divide-border/70 border-b border-border/70">
            <AccountItem icon={<Languages className="h-4 w-4" />} title="Dil" text="Arapca / Ingilizce secimi" tone="sky" />
            <AccountItem icon={<Home className="h-4 w-4" />} title="Ilanlarim" text="Yayindaki ilanlarinizi takip edin" tone="sand" />
            <AccountItem icon={<Heart className="h-4 w-4" />} title="Favoriler" text="Kaydettiginiz ilanlara gidin" tone="coral" />
          </div>

          {user ? (
            <Button
              type="button"
              variant="outline"
              onClick={logout}
              className="mt-6 w-full bg-background"
            >
              <LogOut className="h-4 w-4" /> Cikis yap
            </Button>
          ) : (
            <>
              <Button asChild className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/messages">Giris yap</Link>
              </Button>
              <p className="mt-2 text-center text-xs font-semibold text-muted-foreground">
                Hesap olustur secenegi giris ekraninin altinda.
              </p>
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function AccountItem({
  icon,
  title,
  text,
  tone,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  tone: "sky" | "sand" | "coral";
}) {
  const iconClass = {
    sky: "bg-sky/15 text-link",
    sand: "bg-sand/20 text-sand-foreground",
    coral: "bg-coral/15 text-coral",
  }[tone];

  return (
    <div className="flex items-start gap-3 py-4">
      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${iconClass}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-foreground">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{text}</span>
      </span>
      <ChevronRight className="mt-3 h-4 w-4 shrink-0 text-muted-foreground" />
    </div>
  );
}
