import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Mail, Clock, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Hajazna — Get in Touch" },
      { name: "description", content: "Reach the Hajazna team via WhatsApp, email, or our contact form. We respond quickly." },
      { property: "og:title", content: "Contact Hajazna" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch shortly.");
    setName(""); setPhone(""); setMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Contact</p>
            <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">We'd love to hear from you</h1>
            <p className="mt-4 text-muted-foreground">Have a question, a special request, or want to list your villa? Reach out.</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
            <form onSubmit={onSubmit} className="rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)]">
              <div className="grid gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Phone Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+963 ..." />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Message</label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} placeholder="How can we help?" />
                </div>
                <Button type="submit" size="lg" className="gap-2 rounded-xl">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </form>

            <aside className="space-y-4">
              <a href="https://wa.me/963000000000" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.62_0.16_155)]/10 text-[oklch(0.55_0.16_155)]"><MessageCircle className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">+963 11 000 0000</p>
                </div>
              </a>
              <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@hajazna.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Clock className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">Sun–Thu, 9:00 — 18:00<br />Damascus Time (GMT+3)</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}