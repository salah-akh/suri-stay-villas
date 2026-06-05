import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Heart, Home, Languages, LogOut, Mail, User } from "lucide-react";
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
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Hesabim</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Profil, dil secimi ve kendi ilanlariniz burada yonetilecek.
          </p>
          <div className="mt-5 rounded-md bg-primary/5 p-3">
            <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              {user ? user.email : "Henuz giris yapilmadi"}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {user
                ? "Mesaj gonderebilir, mesajlarinizi gorebilir ve ilan verebilirsiniz."
                : "Mesaj gondermek veya ilan vermek istediginizde mail ve sifre ile hesap olusturmaniz istenecek."}
            </p>
          </div>
          <div className="mt-5 grid gap-3">
            <AccountItem icon={<Languages className="h-4 w-4" />} title="Dil" text="Arapca / Ingilizce secimi" />
            <AccountItem icon={<Home className="h-4 w-4" />} title="Ilanlarim" text="Yayindaki ilanlarinizi takip edin" />
            <AccountItem icon={<Heart className="h-4 w-4" />} title="Favoriler" text="Kaydettiginiz ilanlara gidin" />
          </div>
          {user ? (
            <Button
              type="button"
              variant="outline"
              onClick={logout}
              className="mt-5 w-full bg-background"
            >
              <LogOut className="h-4 w-4" /> Cikis yap
            </Button>
          ) : (
            <Button asChild className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/messages">Giris / hesap olustur</Link>
            </Button>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function AccountItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md bg-muted/70 p-3">
      <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{text}</p>
    </div>
  );
}
