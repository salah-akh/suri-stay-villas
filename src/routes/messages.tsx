import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, MessageCircle, Send } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Mesajlar - Hajezna" },
      { name: "description", content: "Ilan mesajlarinizi takip edin." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Mesajlar</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Gelen ve gonderilen ilan mesajlari burada gorunecek.
          </p>
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
          <Button asChild className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">Ilanlara don</Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
