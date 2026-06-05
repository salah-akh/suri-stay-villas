import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Home, ImagePlus, Mail, Phone, Ruler, Send, Shield, Sun, User } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { AuthPrompt } from "@/components/AuthPrompt";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  advertiserTypes,
  defaultCategoryPath,
  formatCategoryPath,
  listingCategories,
  roomOptions,
} from "@/lib/classifieds";
import { useAuthUser } from "@/lib/auth-store";
import {
  createListingFromDraft,
  type ListingDraft,
  useListingsCatalog,
} from "@/lib/listing-store";

const initialDraft: ListingDraft = {
  categoryPath: [...defaultCategoryPath],
  title: "",
  description: "",
  propertyType: "Villa",
  city: "",
  region: "",
  pricePerNight: 100,
  areaM2: 120,
  roomCount: roomOptions[2],
  advertiserType: advertiserTypes[0],
  contactName: "",
  contactPhone: "",
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
  const { user, login, register } = useAuthUser();
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

    if (!Number.isFinite(draft.areaM2) || draft.areaM2 <= 0) {
      toast.error("Gecerli bir m2 bilgisi yazin.");
      return;
    }

    if (!Number.isFinite(draft.pricePerNight) || draft.pricePerNight <= 0) {
      toast.error("Gecerli bir gecelik fiyat yazin.");
      return;
    }

    if (!draft.contactName.trim() || !draft.contactPhone.trim()) {
      toast.error("Ilan veren adi ve telefon alanlarini doldurun.");
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
              <Send className="h-4 w-4" /> Ucretsiz ilan ver
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              Villa veya yazligini yayinla
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {user
                ? "Once kategoriyi sec, sonra ilan bilgilerini gir. Yayinlandiktan sonra ilan listede gorunur."
                : "Ilan vermek icin once giris yapin. Hesabiniz yoksa alttaki hesap olustur yazisina basin."}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          {!user ? (
            <AuthPrompt
              title="Ilan vermek icin giris gerekli"
              loginDescription="Ilan yayinlamak icin once giris yapin."
              registerDescription="Hesabiniz yoksa mail ve sifreyle yeni hesap olusturun."
              onLogin={login}
              onRegister={register}
            />
          ) : (
            <>
              <div className="mb-4 rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)]">
                <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                  <Mail className="h-4 w-4 text-primary" /> Giris yapan hesap: {user.email}
                </p>
              </div>

              <div className="mb-4 grid gap-2 rounded-lg border border-border/80 bg-card p-4 text-sm shadow-[var(--shadow-card)] sm:grid-cols-3">
                {["1. Kategori sec", "2. Ilan bilgileri", "3. Fotograf ve iletisim"].map((step) => (
                  <div key={step} className="rounded-md bg-primary/10 px-3 py-2 font-extrabold text-primary">
                    {step}
                  </div>
                ))}
              </div>

              <form
                onSubmit={onSubmit}
                className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
              >
            <section className="mb-6">
              <h2 className="text-lg font-extrabold text-foreground">Kategori sec</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ilan listede bu kategori altinda gosterilir.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {listingCategories.map((category) => {
                  const active = formatCategoryPath(draft.categoryPath) === formatCategoryPath(category.path);
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        updateDraft("categoryPath", [...category.path]);
                        updateDraft("propertyType", category.type);
                      }}
                      className={`rounded-lg border p-3 text-left transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/80 bg-background text-foreground hover:border-primary/40"
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      <span className="mt-2 block text-sm font-extrabold">{category.title}</span>
                      <span className={`mt-1 block text-xs ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                        {formatCategoryPath(category.path)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="grid gap-5 border-t border-border/70 pt-6 md:grid-cols-2">
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

              <Field label="Ilan tipi" id="listing-type">
                <Select value={draft.propertyType} onValueChange={(value) => updateDraft("propertyType", value)}>
                  <SelectTrigger id="listing-type" className="h-11 rounded-md bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {listingCategories.map((category) => (
                      <SelectItem key={category.id} value={category.type}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="m2" id="listing-area">
                <Input
                  id="listing-area"
                  type="number"
                  min={1}
                  value={draft.areaM2}
                  onChange={(event) => updateDraft("areaM2", Number(event.target.value))}
                  className="h-11 rounded-md bg-background"
                />
              </Field>

              <Field label="Oda sayisi" id="listing-room">
                <Select value={draft.roomCount} onValueChange={(value) => updateDraft("roomCount", value)}>
                  <SelectTrigger id="listing-room" className="h-11 rounded-md bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              <Field label="Ilan veren tipi" id="listing-advertiser">
                <Select value={draft.advertiserType} onValueChange={(value) => updateDraft("advertiserType", value)}>
                  <SelectTrigger id="listing-advertiser" className="h-11 rounded-md bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {advertiserTypes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Ilan veren adi" id="listing-contact-name">
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    id="listing-contact-name"
                    value={draft.contactName}
                    onChange={(event) => updateDraft("contactName", event.target.value)}
                    placeholder="Ad soyad"
                    className="h-11 rounded-md bg-background pl-9"
                  />
                </div>
              </Field>

              <Field label="Telefon" id="listing-contact-phone">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    id="listing-contact-phone"
                    value={draft.contactPhone}
                    onChange={(event) => updateDraft("contactPhone", event.target.value)}
                    placeholder="+963 ..."
                    className="h-11 rounded-md bg-background pl-9"
                  />
                </div>
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

            <div className="mt-5 rounded-lg bg-muted/70 p-4 text-sm text-muted-foreground">
              <p className="font-extrabold text-foreground">Ozet</p>
              <p className="mt-2 flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" /> {formatCategoryPath(draft.categoryPath)}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" /> {draft.areaM2} m2 - {draft.roomCount} - ${draft.pricePerNight} / gece
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" /> Ilani yayinla
            </Button>
              </form>
            </>
          )}
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
