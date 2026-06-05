import { ExternalLink, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AdSettings, type AdSlotConfig, type AdSlotId, useAdSettings } from "@/lib/ads";

type AdSlotVariant = "top" | "wide" | "compact";

type AdSlotBaseProps = {
  slotId: AdSlotId;
  variant?: AdSlotVariant;
  className?: string;
};

type AdSlotPreviewProps = AdSlotBaseProps & {
  settings: AdSettings;
};

export function AdSlot(props: AdSlotBaseProps) {
  const [settings] = useAdSettings();

  return <AdSlotView {...props} settings={settings} />;
}

export function AdSlotPreview(props: AdSlotPreviewProps) {
  return <AdSlotView {...props} />;
}

function AdSlotView({ settings, slotId, variant = "wide", className }: AdSlotPreviewProps) {
  const slot = settings.slots[slotId];

  if (!settings.enabled || !slot.enabled) return null;

  if (variant === "top") return <TopAd slot={slot} className={className} />;
  if (variant === "compact") return <CompactAd slot={slot} className={className} />;

  return <WideAd slot={slot} className={className} />;
}

function TopAd({ slot, className }: { slot: AdSlotConfig; className?: string }) {
  const href = slot.ctaHref.trim();

  return (
    <aside
      aria-label="Advertisement"
      className={cn("border-b border-primary/15 bg-primary/10 text-foreground", className)}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Megaphone className="h-3.5 w-3.5" />
          </span>
          <span className="rounded-md border border-primary/20 bg-card px-2 py-1 font-bold text-primary">
            {slot.eyebrow}
          </span>
          <strong className="max-w-full truncate text-sm text-foreground">{slot.headline}</strong>
          <span className="hidden max-w-md truncate text-muted-foreground md:inline">
            {slot.body}
          </span>
        </div>
        {href && slot.ctaLabel.trim() && <AdLink href={href} label={slot.ctaLabel} />}
      </div>
    </aside>
  );
}

function WideAd({ slot, className }: { slot: AdSlotConfig; className?: string }) {
  const href = slot.ctaHref.trim();
  const imageUrl = slot.imageUrl.trim();

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "overflow-hidden rounded-lg border border-primary/20 bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-normal text-primary">
            <Megaphone className="h-3.5 w-3.5" /> {slot.eyebrow}
          </p>
          <h3 className="mt-2 break-words text-xl font-extrabold text-foreground">
            {slot.headline}
          </h3>
          <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-muted-foreground">
            {slot.body}
          </p>
          {href && slot.ctaLabel.trim() && (
            <div className="mt-4">
              <AdLink href={href} label={slot.ctaLabel} subtle />
            </div>
          )}
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="hidden h-24 w-40 rounded-md object-cover sm:block"
          />
        )}
      </div>
    </aside>
  );
}

function CompactAd({ slot, className }: { slot: AdSlotConfig; className?: string }) {
  const href = slot.ctaHref.trim();
  const imageUrl = slot.imageUrl.trim();

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "overflow-hidden rounded-lg border border-primary/20 bg-primary/5 p-4",
        className,
      )}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className="mb-4 aspect-[16/9] w-full rounded-md object-cover"
        />
      )}
      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-normal text-primary">
        <Megaphone className="h-3.5 w-3.5" /> {slot.eyebrow}
      </p>
      <h3 className="mt-2 break-words text-base font-extrabold text-foreground">
        {slot.headline}
      </h3>
      <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">{slot.body}</p>
      {href && slot.ctaLabel.trim() && (
        <div className="mt-4">
          <AdLink href={href} label={slot.ctaLabel} subtle />
        </div>
      )}
    </aside>
  );
}

function AdLink({ href, label, subtle = false }: { href: string; label: string; subtle?: boolean }) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex min-h-9 max-w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm font-bold leading-5 transition",
        subtle
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-primary/25 bg-card text-primary hover:bg-primary/10",
      )}
    >
      {label}
      {external && <ExternalLink className="h-3.5 w-3.5" />}
    </a>
  );
}
