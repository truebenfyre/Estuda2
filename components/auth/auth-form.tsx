"use client";
import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useStudy } from "../../context/study-context";
import type { AuthMode } from "../../lib/types";

interface AuthFormProps {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  setAuthMessage: (message: string) => void;
  authMessage: string;
  recovery: boolean;
}

export default function AuthForm({
  authMode,
  setAuthMode,
  authMessage,
  setAuthMessage,
  recovery,
}: AuthFormProps) {
  const { auth, configured, busy, setBusy, error, setError, navigate } = useStudy();

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setAuthMessage("");
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const method = recovery ? "updatePassword" : authMode;
    try {
      const result = await auth[method](data);
      if (result.error) setError(result.error);
      else if (result.message) {
        setAuthMessage(result.message);
        (event.target as HTMLFormElement).reset();
      } else if (result.ok) navigate("/meu-dia", true, true);
    } catch {
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submitAuth} aria-describedby={error ? "auth-error" : undefined}>
      {!recovery && (
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="voce@exemplo.com"
            disabled={!configured || busy}
          />
        </label>
      )}
      {(recovery || authMode !== "requestPasswordReset") && (
        <label>
          Senha
          <input
            type="password"
            name="password"
            autoComplete={authMode === "signIn" && !recovery ? "current-password" : "new-password"}
            required
            minLength={8}
            maxLength={128}
            disabled={!configured || busy}
          />
        </label>
      )}
      {(recovery || authMode === "signUp") && (
        <>
          <label>
            Confirme a senha
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={128}
              disabled={!configured || busy}
            />
          </label>
          <p className="em-help">Use pelo menos 8 caracteres.</p>
        </>
      )}
      {error && (
        <p id="auth-error" role="alert" className="em-error">
          {error}
        </p>
      )}
      {authMessage && (
        <p className="em-auth-success" role="status">
          {authMessage}
        </p>
      )}
      <button className="em-create em-enter" disabled={!configured || busy} type="submit">
        {busy
          ? "Aguarde…"
          : recovery
            ? "Salvar nova senha"
            : authMode === "signUp"
              ? "Criar conta"
              : authMode === "requestPasswordReset"
                ? "Enviar link"
                : "Entrar"}
        <ArrowRight />
      </button>
      {!recovery && (
        <div className="em-auth-links">
          <button
            className="em-link"
            type="button"
            onClick={() => {
              setAuthMode(authMode === "signUp" ? "signIn" : "signUp");
              setError("");
              setAuthMessage("");
            }}
          >
            {authMode === "signUp" ? "Já tenho uma conta" : "Criar uma conta"}
          </button>
          <button
            className="em-link"
            type="button"
            onClick={() => {
              setAuthMode(authMode === "requestPasswordReset" ? "signIn" : "requestPasswordReset");
              setError("");
              setAuthMessage("");
            }}
          >
            {authMode === "requestPasswordReset" ? "Voltar para entrar" : "Esqueci minha senha"}
          </button>
        </div>
      )}
    </form>
  );
}
