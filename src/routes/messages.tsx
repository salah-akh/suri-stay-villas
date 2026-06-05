import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Inbox, Lock, Mail, MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/lib/auth-store";
import { useListingsCatalog } from "@/lib/listing-store";

const searchSchema = z.object({
  listing: z.string().optional(),
});

export const Route = createFileRoute("/messages")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Mesajlar - Hajazna" },
      { name: "description", content: "Ilan mesajlarinizi takip edin." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const search = Route.useSearch();
  const { listings } = useListingsCatalog();
  const selectedListing = listings.find((listing) => listing.id === search.listing);
  const [messageSent, setMessageSent] = useState(false);
  const { user, login } = useAuthUser();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex flex-1 justify-center px-4 py-6 sm:py-10">
        <section className="w-full max-w-md rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Mesajlar</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Mesaj gondermek ve mesajlari gormek icin hesap gerekir.
          </p>

          {!user ? (
            <AuthRequiredBox
              selectedListingTitle={selectedListing?.title}
              onAuth={login}
            />
          ) : selectedListing ? (
            <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="mb-3 rounded-md bg-muted/70 px-3 py-2 text-xs font-bold text-muted-foreground">
                Giriş yapan hesap: <span className="text-foreground">{user.email}</span>
              </p>
              <p className="text-xs font-extrabold text-primary">Mesaj gonderilecek ilan</p>
              <h2 className="mt-1 line-clamp-2 text-base font-extrabold text-foreground">
                {selectedListing.title}
              </h2>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {selectedListing.city} / {selectedListing.region}
              </p>
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-extrabold text-muted-foreground">Mesajin</span>
                <textarea
                  defaultValue={`Merhaba, ${selectedListing.title} ilani hakkinda bilgi almak istiyorum.`}
                  className="min-h-28 w-full rounded-md border border-border/80 bg-background p-3 text-sm font-medium text-foreground outline-none transition focus:border-primary"
                />
              </label>
              <Button
                type="button"
                onClick={() => setMessageSent(true)}
                className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" /> Mesaji gonder
              </Button>
              {messageSent && (
                <p className="mt-2 rounded-md bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
                  Mesaj taslak olarak gonderildi.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-border/80 bg-muted/60 p-4">
              <p className="text-sm font-bold text-foreground">Mesajlasmak icin bir ilan secin.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ilan detayindaki Mesaj gonder butonuyla bu ekrana gelebilirsiniz.
              </p>
            </div>
          )}
          {user && (
            <div className="mt-5 grid gap-3">
            <div className="rounded-md bg-muted/70 p-3">
              <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                <Inbox className="h-4 w-4 text-primary" /> Gelen mesajlar
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Ev sahibi oldugunuz ilanlardan gelenler.</p>
            </div>
            <div className="rounded-md bg-muted/70 p-3">
              <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                <Send className="h-4 w-4 text-primary" /> Gonderilen mesajlar
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Kiralamak istediginiz ilanlara yazdiklariniz.</p>
            </div>
          </div>
          )}
          <Button asChild className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">Ilanlara don</Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function AuthRequiredBox({
  selectedListingTitle,
  onAuth,
}: {
  selectedListingTitle?: string;
  onAuth: (email: string, password: string) => boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = onAuth(email, password);

    if (!ok) {
      setError("Gecerli bir mail ve en az 4 karakterli sifre girin.");
    }
  };

  return (
    <form onSubmit={submitAuth} className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
        <Lock className="h-4 w-4 text-primary" /> Mesaj icin hesap gerekli
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {selectedListingTitle
          ? `${selectedListingTitle} ilanina mesaj gondermek icin giris yapin veya hesap olusturun.`
          : "Mesajlari gormek icin giris yapin veya hesap olusturun."}
      </p>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-extrabold text-muted-foreground">Mail adresi</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            placeholder="ornek@mail.com"
            className="h-11 w-full rounded-md border border-border/80 bg-background pl-10 pr-3 text-sm font-medium text-foreground outline-none transition focus:border-primary"
          />
        </div>
      </label>

      <label className="mt-3 block">
        <span className="mb-1.5 block text-xs font-extrabold text-muted-foreground">Sifre</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder="En az 4 karakter"
            className="h-11 w-full rounded-md border border-border/80 bg-background pl-10 pr-3 text-sm font-medium text-foreground outline-none transition focus:border-primary"
          />
        </div>
      </label>

      {error && <p className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">{error}</p>}

      <Button type="submit" className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Giriş yap / hesap oluştur
      </Button>
    </form>
  );
}
