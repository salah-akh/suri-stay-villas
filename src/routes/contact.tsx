import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Destek - Hajazna" },
      {
        name: "description",
        content: "Villa, ilan veya rezervasyon sorulari icin Hajazna destek ekibiyle iletisime gecin.",
      },
      { property: "og:title", content: "Destek - Hajazna" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    toast.success("Mesaj alindi. En kisa surede donus yapilacak.");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
            <p className="text-sm font-semibold text-primary">Destek</p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              Yardim mi lazim?
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ilan, rezervasyon veya reklam icin bize yazin.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-3xl gap-4 px-4 py-6 sm:px-6">
          <a
            href="https://wa.me/963000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)] transition hover:border-primary/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-foreground">WhatsApp destek</h2>
              <p className="mt-1 text-sm text-muted-foreground">+963 11 000 0000</p>
            </div>
          </a>

          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">Adiniz</span>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Adiniz"
                  className="h-11 rounded-md bg-background"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">Telefon</span>
                <Input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="+963 ..."
                  className="h-11 rounded-md bg-background"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">Mesaj</span>
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={5}
                  placeholder="Nasil yardimci olabiliriz?"
                  className="rounded-md bg-background"
                />
              </label>

              <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4" /> Gonder
              </Button>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
