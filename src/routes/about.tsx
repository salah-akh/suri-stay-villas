import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Heart, MapPin, Phone, Shield, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Hajazna - Authentic Stays Across Syria" },
      {
        name: "description",
        content:
          "Our mission, why we built Hajazna, and our commitment to trust and safety for travelers in Syria.",
      },
      { property: "og:title", content: "About Hajazna" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/70 bg-card text-foreground">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" /> About Hajazna
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
                A calmer way to discover private stays in Syria
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Hajazna brings carefully selected villas, heritage homes, and family retreats into one
                trusted place for travelers returning home, visiting family, or exploring Syria.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: BadgeCheck,
                title: "Our mission",
                text: "Make villa discovery simple, beautiful, and reliable across Syria's most loved destinations.",
              },
              {
                icon: Heart,
                title: "Why we built it",
                text: "Travelers needed a more trustworthy place to compare private stays and talk to real local help.",
              },
              {
                icon: Shield,
                title: "Trust and safety",
                text: "Listings are reviewed for property details, amenities, location clarity, and guest readiness.",
              },
              {
                icon: Phone,
                title: "Direct support",
                text: "Guests can confirm dates, ask questions, and complete the booking through a human conversation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-extrabold text-foreground">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border/70 bg-card">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPin className="h-4 w-4" /> Damascus, Syria
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground">Planning a stay or listing a villa?</h2>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">
                <Phone className="h-4 w-4" /> Contact us
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
