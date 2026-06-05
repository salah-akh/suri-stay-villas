import { useState, type FormEvent } from "react";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AuthResult } from "@/lib/auth-store";

type AuthMode = "login" | "register";

type AuthPromptProps = {
  title: string;
  loginDescription: string;
  registerDescription: string;
  onLogin: (email: string, password: string) => AuthResult;
  onRegister: (email: string, password: string) => AuthResult;
};

export function AuthPrompt({
  title,
  loginDescription,
  registerDescription,
  onLogin,
  onRegister,
}: AuthPromptProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLogin = mode === "login";

  const submitAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = isLogin ? onLogin(email, password) : onRegister(email, password);

    if (!result.ok) {
      setError(result.error ?? "Bilgileri kontrol edip tekrar deneyin.");
    }
  };

  const switchMode = () => {
    setMode(isLogin ? "register" : "login");
    setError("");
  };

  return (
    <form onSubmit={submitAuth} className="mt-5 py-2">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sky/15 text-link">
        <Lock className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-xl font-extrabold text-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {isLogin ? loginDescription : registerDescription}
      </p>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-xs font-extrabold text-muted-foreground">Mail adresi</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <Input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            placeholder="ornek@mail.com"
            className="h-11 rounded-md bg-background pl-9"
          />
        </div>
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-extrabold text-muted-foreground">Sifre</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <Input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder="En az 4 karakter"
            className="h-11 rounded-md bg-background pl-9"
          />
        </div>
      </label>

      {error && (
        <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
        {isLogin ? "Giris yap" : "Hesap olustur"}
      </Button>
      <button
        type="button"
        onClick={switchMode}
        className="mt-3 w-full text-center text-xs font-bold text-primary"
      >
        {isLogin ? "Hesabin yok mu? Hesap olustur" : "Zaten hesabin var mi? Giris yap"}
      </button>
    </form>
  );
}
