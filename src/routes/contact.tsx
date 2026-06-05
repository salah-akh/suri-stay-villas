import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Hajazna - Get in Touch" },
      {
        name: "description",
        content: "Reach the Hajazna team via WhatsApp, email, or our contact form. We respond quickly.",
      },
      { property: "og:title", content: "Contact Hajazna" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Message sent! We will be in touch shortly.");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <p className="text-sm font-semibold text-primary">Contact Hajazna</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-foreground sm:text-5xl">
              Talk to us about a stay, a villa, or a special request
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Send the details and our team will help you confirm availability, location, and booking
              questions.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] sm:p-7"
          >
            <div className="grid gap-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">Name</span>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Your name"
                  className="h-11 rounded-md bg-background"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">Phone number</span>
                <Input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="+963 ..."
                  className="h-11 rounded-md bg-background"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">Message</span>
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={7}
                  placeholder="How can we help?"
                  className="rounded-md bg-background"
                />
              </label>

              <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4" /> Send message
              </Button>
            </div>
          </form>

          <aside className="space-y-4">
            <a
              href="https://wa.me/963000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-price/10 text-price">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">WhatsApp</h3>
                <p className="mt-1 text-sm text-muted-foreground">+963 11 000 0000</p>
              </div>
            </a>

            {[
              { icon: Mail, title: "Email", text: "hello@hajazna.com" },
              { icon: Clock, title: "Business hours", text: "Sun-Thu, 9:00-18:00" },
              { icon: MapPin, title: "Office", text: "Damascus, Syria" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
