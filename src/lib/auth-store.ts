import { useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "hajazna:auth-user";
const AUTH_CHANGED_EVENT = "hajazna:auth-changed";

export type AuthUser = {
  email: string;
  createdAt: string;
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

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail.includes("@") || normalizedPassword.length < 4) {
      return false;
    }

    const nextUser = {
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    };

    writeAuthUser(nextUser);
    setUser(nextUser);
    return true;
  };

  const logout = () => {
    writeAuthUser(null);
    setUser(null);
  };

  return { user, login, logout };
}
