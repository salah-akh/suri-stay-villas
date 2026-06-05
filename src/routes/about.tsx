import { createFileRoute } from "@tanstack/react-router";
import { Heart, Shield, Sparkles, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SuriStay — Authentic Stays Across Syria" },
      { name: "description", content: "Our mission, why we built SuriStay, and our commitment to trust and safety for travelers in Syria." },
      { property: "og:title", content: "About SuriStay" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">About SuriStay</p>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Reconnecting travelers with Syria's beauty</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              SuriStay is a modern platform built to showcase the best villas and private stays across Syria — making it simple and safe to discover the country's timeless hospitality.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Sparkles className="h-6 w-6" /></div>
              <h2 className="mt-4 font-display text-2xl font-semibold">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To make exploring Syria effortless by connecting travelers with carefully chosen villas — whether you're returning home, visiting family, or discovering the country for the first time.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Heart className="h-6 w-6" /></div>
              <h2 className="mt-4 font-display text-2xl font-semibold">Why We Built SuriStay</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Syria's tourism market lacked a modern, trustworthy platform for villa rentals. We built SuriStay to fill that gap — combining premium design with local expertise.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Shield className="h-6 w-6" /></div>
              <h2 className="mt-4 font-display text-2xl font-semibold">Trust & Safety</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Every property on SuriStay is personally inspected. We verify hosts, check amenities, and stay in close contact with you throughout your booking and stay.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Phone className="h-6 w-6" /></div>
              <h2 className="mt-4 font-display text-2xl font-semibold">Contact Information</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                WhatsApp: +963 11 000 0000<br />
                Email: hello@suristay.com<br />
                Office: Damascus, Syria
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}