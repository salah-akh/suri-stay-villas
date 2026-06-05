import { useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "hajazna:auth-user";
const AUTH_ACCOUNTS_STORAGE_KEY = "hajazna:auth-accounts";
const AUTH_CHANGED_EVENT = "hajazna:auth-changed";

export type AuthUser = {
  email: string;
  createdAt: string;
};

export type AuthResult = {
  ok: boolean;
  error?: string;
};

type AuthAccount = AuthUser & {
  password: string;
};

function normalizeUser(value: unknown): AuthUser | null {
  if (!value || typeof value !== "object") return null;

  const user = value as Partial<AuthUser>;
  if (typeof user.email !== "string" || !user.email.includes("@")) return null;

  return {
    email: user.email,
    createdAt: typeof user.createdAt === "string" ? user.createdAt : new Date().toISOString(),
  };
}

function normalizeAccount(value: unknown): AuthAccount | null {
  if (!value || typeof value !== "object") return null;

  const account = value as Partial<AuthAccount>;
  if (typeof account.email !== "string" || !account.email.includes("@")) return null;
  if (typeof account.password !== "string" || account.password.length < 4) return null;

  return {
    email: account.email.trim().toLowerCase(),
    password: account.password,
    createdAt: typeof account.createdAt === "string" ? account.createdAt : new Date().toISOString(),
  };
}

function normalizeCredentials(email: string, password: string) {
  return {
    email: email.trim().toLowerCase(),
    password: password.trim(),
  };
}

function validateCredentials(email: string, password: string): AuthResult {
  if (!email.includes("@")) {
    return { ok: false, error: "Gecerli bir mail adresi girin." };
  }

  if (password.length < 4) {
    return { ok: false, error: "Sifre en az 4 karakter olmali." };
  }

  return { ok: true };
}

export function readAuthUser() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return normalizeUser(JSON.parse(raw));
  } catch {
    return null;
  }
}

function readAuthAccounts() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item) => normalizeAccount(item)).filter((item): item is AuthAccount => !!item)
      : [];
  } catch {
    return [];
  }
}

function writeAuthAccounts(accounts: AuthAccount[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

function writeAuthUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(readAuthUser());
    const syncStorage = (event: StorageEvent) => {
      if (!event.key || event.key === AUTH_STORAGE_KEY) syncUser();
    };

    syncUser();
    window.addEventListener("storage", syncStorage);
    window.addEventListener(AUTH_CHANGED_EVENT, syncUser);

    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncUser);
    };
  }, []);

  const login = (email: string, password: string): AuthResult => {
    const credentials = normalizeCredentials(email, password);
    const validation = validateCredentials(credentials.email, credentials.password);

    if (!validation.ok) {
      return validation;
    }

    const account = readAuthAccounts().find((item) => item.email === credentials.email);

    if (!account) {
      return { ok: false, error: "Bu mail ile hesap yok. Once hesap olusturun." };
    }

    if (account.password !== credentials.password) {
      return { ok: false, error: "Sifre hatali." };
    }

    const nextUser = {
      email: account.email,
      createdAt: account.createdAt,
    };

    writeAuthUser(nextUser);
    setUser(nextUser);
    return { ok: true };
  };

  const register = (email: string, password: string): AuthResult => {
    const credentials = normalizeCredentials(email, password);
    const validation = validateCredentials(credentials.email, credentials.password);

    if (!validation.ok) {
      return validation;
    }

    const accounts = readAuthAccounts();
    const accountExists = accounts.some((item) => item.email === credentials.email);

    if (accountExists) {
      return { ok: false, error: "Bu mail zaten kayitli. Giris yapmayi deneyin." };
    }

    const account = {
      email: credentials.email,
      password: credentials.password,
      createdAt: new Date().toISOString(),
    };
    const nextUser = {
      email: account.email,
      createdAt: account.createdAt,
    };

    writeAuthAccounts([account, ...accounts]);
    writeAuthUser(nextUser);
    setUser(nextUser);
    return { ok: true };
  };

  const logout = () => {
    writeAuthUser(null);
    setUser(null);
  };

  return { user, login, register, logout };
}
