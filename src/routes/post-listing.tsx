import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, Send, Sun, Shield } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createListingFromDraft,
  type ListingDraft,
  useListingsCatalog,
} from "@/lib/listing-store";

const initialDraft: ListingDraft = {
  title: "",
  description: "",
  propertyType: "Villa",
  city: "",
  region: "",
  pricePerNight: 100,
  imageUrl: "",
  hasSolarPower: false,
  isConservativePrivate: false,
};

const maxImageSizeBytes = 2 * 1024 * 1024;

export const Route = createFileRoute("/post-listing")({
  head: () => ({
    meta: [
      { title: "Ilan Ver - Hajazna" },
      {
        name: "description",
        content: "Villa veya yazlik ilaninizi direkt Hajazna uzerinden yayinlayin.",
      },
    ],
  }),
  component: PostListingPage,
});

function PostListingPage() {
  const navigate = Route.useNavigate();
  const { addUserListing } = useListingsCatalog();
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [imageName, setImageName] = useState("");

  const updateDraft = <Field extends keyof ListingDraft>(
    field: Field,
    value: ListingDraft[Field],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Lutfen bir fotograf dosyasi secin.");
      event.target.value = "";
      return;
    }

    if (file.size > maxImageSizeBytes) {
      toast.error("Fotograf en fazla 2 MB olabilir.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        toast.error("Fotograf okunamadi.");
        return;
      }

      updateDraft("imageUrl", reader.result);
      setImageName(file.name);
      toast.success("Fotograf yuklendi.");
    };
    reader.onerror = () => toast.error("Fotograf okunamadi.");
    reader.readAsDataURL(file);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.title.trim() || !draft.city.trim() || !draft.region.trim()) {
      toast.error("Baslik, sehir ve bolge alanlarini doldurun.");
      return;
    }

    if (!draft.description.trim()) {
      toast.error("Ilan aciklamasi ekleyin.");
      return;
    }

    if (!draft.propertyType.trim()) {
      toast.error("Konaklama tipini yazin.");
      return;
    }

    if (!Number.isFinite(draft.pricePerNight) || draft.pricePerNight <= 0) {
      toast.error("Gecerli bir gecelik fiyat yazin.");
      return;
    }

    if (!draft.imageUrl.trim()) {
      toast.error("Kapak fotografi yukleyin.");
      return;
    }

    const listing = createListingFromDraft(draft);
    addUserListing(listing);
    toast.success("Ilan yayina alindi.");
    navigate({ to: "/listings/$id", params: { id: listing.id } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Ana sayfa
            </Link>
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Send className="h-4 w-4" /> Direkt ilan ver
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              Villa veya yazligini yayinla
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Formu doldurun, ilaniniz bu uygulamada hemen listelensin.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <div className="mb-4 grid gap-2 rounded-lg border border-border/80 bg-card p-4 text-sm shadow-[var(--shadow-card)] sm:grid-cols-3">
            {["1. Bilgileri yaz", "2. Fotograf yukle", "3. Ilani yayinla"].map((step) => (
              <div key={step} className="rounded-md bg-primary/10 px-3 py-2 font-extrabold text-primary">
                {step}
              </div>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Ilan basligi" id="listing-title" className="md:col-span-2">
                <Input
                  id="listing-title"
                  value={draft.title}
                  onChange={(event) => updateDraft("title", event.target.value)}
                  placeholder="Ornek: Deniz manzarali yazlik villa"
                  className="h-11 rounded-md bg-background"
                />
              </Field>

              <Field label="Sehir" id="listing-city">
                <Input
                  id="listing-city"
                  value={draft.city}
                  onChange={(event) => updateDraft("city", event.target.value)}
                  placeholder="Latakia"
                  className="h-11 rounded-md bg-background"
                />
              </Field>

              <Field label="Bolge / Mahalle" id="listing-region">
                <Input
                  id="listing-region"
                  value={draft.region}
                  onChange={(event) => updateDraft("region", event.target.value)}
                  placeholder="Ras al-Bassit"
                  className="h-11 rounded-md bg-background"
                />
              </Field>

              <Field label="Konaklama tipi" id="listing-type">
                <Input
                  id="listing-type"
                  value={draft.propertyType}
                  onChange={(event) => updateDraft("propertyType", event.target.value)}
                  placeholder="Villa, Yazlik, Chalet..."
                  className="h-11 rounded-md bg-background"
                />
              </Field>

              <Field label="Gecelik fiyat" id="listing-price">
                <Input
                  id="listing-price"
                  type="number"
                  min={1}
                  value={draft.pricePerNight}
                  onChange={(event) =>
                    updateDraft("pricePerNight", Number(event.target.value))
                  }
                  className="h-11 rounded-md bg-background"
                />
              </Field>

              <div className="md:col-span-2">
                <Label htmlFor="listing-image" className="mb-2 block text-sm font-semibold text-foreground">
                  Kapak fotografi
                </Label>
                <label
                  htmlFor="listing-image"
                  className="flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/35 bg-primary/5 p-4 text-center transition hover:border-primary hover:bg-primary/10"
                >
                  {draft.imageUrl.trim() ? (
                    <img
                      src={draft.imageUrl}
                      alt=""
                      className="h-44 w-full rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <ImagePlus className="h-6 w-6" />
                      </span>
                      <span className="mt-3 text-sm font-extrabold text-foreground">
                        Fotograf yukle
                      </span>
                      <span className="mt-1 text-xs leading-5 text-muted-foreground">
                        JPG, PNG veya WebP. En fazla 2 MB.
                      </span>
                    </>
                  )}
                  <input
                    id="listing-image"
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="sr-only"
                  />
                </label>
                {imageName && (
                  <p className="mt-2 text-xs font-semibold text-muted-foreground">
                    Secilen fotograf: {imageName}
                  </p>
                )}
              </div>

              <Field label="Aciklama" id="listing-description" className="md:col-span-2">
                <Textarea
                  id="listing-description"
                  value={draft.description}
                  onChange={(event) => updateDraft("description", event.target.value)}
                  rows={6}
                  placeholder="Villa hakkinda konum, oda bilgisi, havuz, bahce ve misafir kurallarini yazin."
                  className="rounded-md bg-background"
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-3 border-t border-border/70 pt-5 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-lg border border-border/80 bg-background p-4 text-sm font-semibold text-foreground">
                <Checkbox
                  checked={draft.hasSolarPower}
                  onCheckedChange={(value) => updateDraft("hasSolarPower", !!value)}
                />
                <Sun className="h-4 w-4 text-primary" /> Gunes enerjisi var
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-border/80 bg-background p-4 text-sm font-semibold text-foreground">
                <Checkbox
                  checked={draft.isConservativePrivate}
                  onCheckedChange={(value) => updateDraft("isConservativePrivate", !!value)}
                />
                <Shield className="h-4 w-4 text-primary" /> Aileye uygun / ozel
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" /> Ilani yayinla
            </Button>
          </form>
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
