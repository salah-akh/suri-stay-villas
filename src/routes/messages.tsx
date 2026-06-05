import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Inbox, MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { AuthPrompt } from "@/components/AuthPrompt";
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
  const { user, login, register } = useAuthUser();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1 px-4 py-5 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Mesajlar</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Mesaj gondermek ve mesajlari gormek icin hesap gerekir.
          </p>

          {!user ? (
            <AuthPrompt
              title="Mesaj icin giris gerekli"
              loginDescription={
                selectedListing
                  ? `${selectedListing.title} ilanina mesaj gondermek icin once giris yapin.`
                  : "Mesajlari gormek icin once giris yapin."
              }
              registerDescription="Hesabiniz yoksa mail ve sifreyle yeni hesap olusturun."
              onLogin={login}
              onRegister={register}
            />
          ) : selectedListing ? (
            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="text-xs font-bold text-muted-foreground">
                Giris yapan hesap: <span className="text-foreground">{user.email}</span>
              </p>
              <p className="mt-5 text-xs font-extrabold text-primary">Mesaj gonderilecek ilan</p>
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
            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="text-sm font-bold text-foreground">Mesajlasmak icin bir ilan secin.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ilan detayindaki Mesaj gonder butonuyla bu ekrana gelebilirsiniz.
              </p>
            </div>
          )}

          {user && (
            <div className="mt-6 divide-y divide-border/70 border-y border-border/70">
              <MessageMenuRow
                icon={<Inbox className="h-4 w-4" />}
                title="Gelen mesajlar"
                text="Ev sahibi oldugunuz ilanlardan gelenler."
              />
              <MessageMenuRow
                icon={<Send className="h-4 w-4" />}
                title="Gonderilen mesajlar"
                text="Kiralamak istediginiz ilanlara yazdiklariniz."
              />
            </div>
          )}

          <Button asChild className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">Ilanlara don</Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function MessageMenuRow({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 py-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-extrabold text-foreground">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{text}</span>
      </span>
    </div>
  );
}
