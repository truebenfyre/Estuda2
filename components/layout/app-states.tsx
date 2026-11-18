"use client";
import { Sparkles } from "lucide-react";
import { useStudy } from "../../context/study-context";

export function FatalScreen({ message }: { message: string }) {
  const { legacyAvailable, exportBackup, exitAccount } = useStudy();
  return (
    <main id="estuda-app" className="em-loading">
      <h1>Seus dados precisam de atenção</h1>
      <p role="alert">{message}</p>
      <button className="em-create" onClick={() => location.reload()}>
        Tentar novamente
      </button>
      {legacyAvailable && (
        <button className="em-link" onClick={() => exportBackup(true)}>
          Exportar cópia local antiga
        </button>
      )}
      <button className="em-link" onClick={exitAccount}>
        Sair
      </button>
      <p>Nenhum dado foi substituído. Verifique a conexão e tente novamente.</p>
    </main>
  );
}

export function LoadingScreen() {
  return (
    <main id="estuda-app" className="em-loading" aria-busy="true">
      <Sparkles />
      <h1>Carregando seu espaço</h1>
      <p>Buscando seus dados com segurança…</p>
    </main>
  );
}
