import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Megaphone, RotateCcw, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { AdSlotPreview } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  adSlots,
  defaultAdSettings,
  type AdSettings,
  type AdSlotConfig,
  type AdSlotId,
  useAdSettings,
} from "@/lib/ads";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin - Reklam Yonetimi" },
      {
        name: "description",
        content: "Hajazna reklam alanlarini yonetmek icin admin ayarlari.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [settings, setSettings] = useAdSettings();

  const updateSettings = (updater: (current: AdSettings) => AdSettings) => {
    setSettings(updater);
  };

  const updateSlot = <Field extends keyof AdSlotConfig>(
    slotId: AdSlotId,
    field: Field,
    value: AdSlotConfig[Field],
  ) => {
    updateSettings((current) => ({
      ...current,
      slots: {
        ...current.slots,
        [slotId]: {
          ...current.slots[slotId],
          [field]: value,
        },
      },
    }));
  };

  const resetSettings = () => {
    setSettings(defaultAdSettings);
    toast.success("Reklam ayarlari sifirlandi.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Settings className="h-4 w-4" /> Admin ayarlari
              </p>
              <h1 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
                Reklam yonetimi
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Ust bant ve site icindeki reklam alanlarini buradan acip kapatabilir, iceriklerini
                duzenleyebilirsiniz.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link to="/">
                  <Eye className="h-4 w-4" /> Siteyi gor
                </Link>
              </Button>
              <Button variant="secondary" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4" /> Sifirla
              </Button>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-36">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-extrabold text-foreground">Genel ayar</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ana anahtar kapaliysa tum reklam alanlari sitede gizlenir.
                </p>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(enabled) =>
                  updateSettings((current) => ({ ...current, enabled }))
                }
                aria-label="Tum reklamlari ac veya kapat"
              />
            </div>

            <div className="mt-5 rounded-lg border border-border/70 bg-muted/50 p-4">
              <p className="text-xs font-bold uppercase tracking-normal text-muted-foreground">
                Durum
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {settings.enabled ? "Reklamlar aktif" : "Reklamlar kapali"}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Degisiklikler tarayici hafizasina otomatik kaydedilir.
              </p>
            </div>
          </aside>

          <div className="space-y-5">
            {adSlots.map((slotMeta) => {
              const slot = settings.slots[slotMeta.id];
              const previewVariant =
                slotMeta.id === "top"
                  ? "top"
                  : slotMeta.id === "listing-sidebar"
                    ? "compact"
                    : "wide";

              return (
                <section
                  key={slotMeta.id}
                  className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Megaphone className="h-4 w-4" /> {slotMeta.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {slotMeta.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/40 px-3 py-2">
                      <span className="text-sm font-semibold text-foreground">
                        {slot.enabled ? "Acik" : "Kapali"}
                      </span>
                      <Switch
                        checked={slot.enabled}
                        onCheckedChange={(enabled) => updateSlot(slotMeta.id, "enabled", enabled)}
                        aria-label={`${slotMeta.name} ac veya kapat`}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <Field label="Etiket" id={`${slotMeta.id}-eyebrow`}>
                      <Input
                        id={`${slotMeta.id}-eyebrow`}
                        value={slot.eyebrow}
                        onChange={(event) =>
                          updateSlot(slotMeta.id, "eyebrow", event.target.value)
                        }
                        className="h-10 rounded-md bg-background"
                      />
                    </Field>
                    <Field label="Buton yazisi" id={`${slotMeta.id}-cta-label`}>
                      <Input
                        id={`${slotMeta.id}-cta-label`}
                        value={slot.ctaLabel}
                        onChange={(event) =>
                          updateSlot(slotMeta.id, "ctaLabel", event.target.value)
                        }
                        className="h-10 rounded-md bg-background"
                      />
                    </Field>
                    <Field label="Baslik" id={`${slotMeta.id}-headline`}>
                      <Input
                        id={`${slotMeta.id}-headline`}
                        value={slot.headline}
                        onChange={(event) =>
                          updateSlot(slotMeta.id, "headline", event.target.value)
                        }
                        className="h-10 rounded-md bg-background"
                      />
                    </Field>
                    <Field label="Buton linki" id={`${slotMeta.id}-cta-href`}>
                      <Input
                        id={`${slotMeta.id}-cta-href`}
                        value={slot.ctaHref}
                        onChange={(event) =>
                          updateSlot(slotMeta.id, "ctaHref", event.target.value)
                        }
                        placeholder="/contact veya https://..."
                        className="h-10 rounded-md bg-background"
                      />
                    </Field>
                    <Field label="Metin" id={`${slotMeta.id}-body`} className="md:col-span-2">
                      <Textarea
                        id={`${slotMeta.id}-body`}
                        value={slot.body}
                        onChange={(event) => updateSlot(slotMeta.id, "body", event.target.value)}
                        rows={3}
                        className="rounded-md bg-background"
                      />
                    </Field>
                    <Field label="Gorsel URL" id={`${slotMeta.id}-image`} className="md:col-span-2">
                      <Input
                        id={`${slotMeta.id}-image`}
                        value={slot.imageUrl}
                        onChange={(event) =>
                          updateSlot(slotMeta.id, "imageUrl", event.target.value)
                        }
                        placeholder="https://..."
                        className="h-10 rounded-md bg-background"
                      />
                    </Field>
                  </div>

                  <div className="mt-5 border-t border-border/70 pt-5">
                    <p className="mb-3 text-sm font-bold text-foreground">Onizleme</p>
                    {settings.enabled && slot.enabled ? (
                      <AdSlotPreview
                        settings={settings}
                        slotId={slotMeta.id}
                        variant={previewVariant}
                      />
                    ) : (
                      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-5 text-sm font-semibold text-muted-foreground">
                        Bu reklam alani su anda kapali.
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  id,
  className,
  children,
}: {
  label: string;
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
