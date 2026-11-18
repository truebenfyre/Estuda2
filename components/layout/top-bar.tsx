"use client";
import { Coins, LogOut, Moon, Sun } from "lucide-react";
import { useStudy } from "../../context/study-context";

export default function TopBar() {
  const { account, state, stats, busy, mutate, setModal, exitAccount } = useStudy();
  const local = account?.mode === "local";
  return (
    <header className="em-top">
      <div className="em-greeting">
        <strong>Oi, {state.profile.name || "estudante"} 👋</strong>
        <span className={local ? "em-local-badge" : ""}>
          {local ? "Modo local" : "Seu espaço, seu ritmo."}
        </span>
      </div>
      <div className="em-top-right">
        <span className="em-account-label">
          {local ? "Modo local · neste computador" : "Sua conta"}
        </span>
        <span className="em-wallet">
          <Coins />
          {stats.gold} ouro
        </span>
        <button
          className="em-theme"
          aria-label={
            state.theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
          }
          aria-pressed={state.theme === "dark"}
          onClick={() =>
            mutate({
              type: "theme",
              value: state.theme === "light" ? "dark" : "light",
            })
          }
          disabled={busy}
        >
          {state.theme === "light" ? <Moon /> : <Sun />}
        </button>
        <button
          className="em-avatar-small"
          onClick={() => setModal({ type: "profile" })}
          aria-label="Editar perfil"
        >
          {state.profile.avatar}
        </button>
        <button
          className="em-exit"
          onClick={exitAccount}
          disabled={busy}
          aria-label="Sair da conta"
        >
          <LogOut />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
