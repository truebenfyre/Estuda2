"use client";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { useStudy } from "../../context/study-context";
import type { AuthMode } from "../../lib/types";
import AuthForm from "./auth-form";

export default function EntryCard() {
  const {
    account,
    auth,
    configured,
    localAvailable,
    pathname,
    navigate,
    busy,
    setBusy,
    setError,
    legacyAvailable,
    exportBackup,
    exitAccount,
  } = useStudy();
  const [authMode, setAuthMode] = useState<AuthMode>("signIn");
  const [authMessage, setAuthMessage] = useState("");
  const recovery = pathname === "/recuperar-senha";

  useEffect(() => {
    if (new URLSearchParams(location.search).get("error") === "confirmation")
      setAuthMessage(
        "O link de confirmação expirou ou não pôde ser verificado. Solicite um novo link de recuperação ou tente entrar novamente.",
      );
  }, []);

  async function enterLocal() {
    setBusy(true);
    setError("");
    try {
      const result = await auth.enterLocal();
      if (result.error) setError(result.error);
      else navigate("/meu-dia", true, true);
    } catch {
      setError("Não foi possível entrar no modo local.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="em-entry-card" aria-labelledby="entry-title">
      <span className="em-entry-symbol">
        <BookOpen />
      </span>
      <h2 id="entry-title">
        {recovery
          ? "Escolha uma nova senha"
          : authMode === "signUp"
            ? "Crie sua conta"
            : authMode === "requestPasswordReset"
              ? "Recupere seu acesso"
              : "Entre no seu espaço"}
      </h2>
      <p>
        {authMode === "requestPasswordReset"
          ? "Vamos enviar um link para seu email."
          : "Um lugar para organizar seus estudos e acompanhar seu progresso."}
      </p>
      {localAvailable && !account && !recovery && (
        <div className="em-local-entry">
          <button className="em-create em-enter" disabled={busy} onClick={enterLocal}>
            Entrar no modo local <ArrowRight />
          </button>
          <p>Sem senha. Seus dados ficam neste computador, separados das contas online.</p>
        </div>
      )}
      {!configured && (
        <div className="em-setup-note" role="status">
          <strong>Conexão de contas em preparação</strong>
          <p>
            O projeto Supabase ainda não foi configurado. Login e cadastro serão liberados
            após essa conexão. Nenhuma senha será enviada ou salva agora.
          </p>
        </div>
      )}
      {account && !recovery ? (
        <>
          <p className="em-account-email">{account.email}</p>
          <button className="em-create em-enter" onClick={() => navigate("/meu-dia", true)}>
            Continuar
            <ArrowRight />
          </button>
          <button className="em-link" onClick={exitAccount}>
            Sair desta conta
          </button>
        </>
      ) : (
        <AuthForm
          authMode={authMode}
          setAuthMode={setAuthMode}
          authMessage={authMessage}
          setAuthMessage={setAuthMessage}
          recovery={recovery}
        />
      )}
      <div className="em-entry-privacy">
        <ShieldCheck />
        <p>
          Acesso por email e senha. Seus dados ficam associados à sua conta; senhas não são
          salvas no armazenamento local.
        </p>
      </div>
      {legacyAvailable && (
        <p className="em-help">
          Os dados da versão local continuam preservados. Você poderá confirmar uma
          importação depois de entrar.{" "}
          <button className="em-link" onClick={() => exportBackup(true)}>
            Exportar cópia antiga
          </button>
        </p>
      )}
    </section>
  );
}
