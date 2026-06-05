import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "ar" | "en";

type Dict = Record<string, { tr: string; ar: string; en: string }>;

export const translations: Dict = {
  "nav.home": { tr: "Ana Sayfa", ar: "الرئيسية", en: "Home" },
  "nav.villas": { tr: "Villalar", ar: "الفلل", en: "Villas" },
  "nav.about": { tr: "Hakkımızda", ar: "من نحن", en: "About" },
  "nav.contact": { tr: "İletişim", ar: "اتصل بنا", en: "Contact" },
  "nav.help": { tr: "Yardım", ar: "مساعدة", en: "Help" },
  "nav.listVilla": { tr: "Villanı Yayınla", ar: "أضف فيلتك", en: "List your villa" },
  "nav.favorites": { tr: "Favoriler", ar: "المفضلة", en: "Favorites" },
  "nav.signIn": { tr: "Giriş Yap", ar: "تسجيل الدخول", en: "Sign In" },
  "nav.postListing": { tr: "İlan Ver", ar: "أضف إعلان", en: "Post Listing" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "tr" || stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: keyof typeof translations) => translations[key]?.[lang] ?? String(key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}