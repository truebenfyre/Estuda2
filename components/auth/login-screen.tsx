"use client";
import { Gift, ListChecks, Moon, Sun, Timer } from "lucide-react";
import { useStudy } from "../../context/study-context";
import Logo from "../ui/logo";
import EntryCard from "./entry-card";

export default function LoginScreen() {
  const { state, busy, toggleTheme } = useStudy();
  return (
    <div id="estuda-app" data-theme={state.theme} className="em-entry">
      <header className="em-entry-header">
        <Logo />
        <button
          className="em-theme"
          disabled={busy}
          aria-label={state.theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
          onClick={toggleTheme}
        >
          {state.theme === "light" ? <Moon /> : <Sun />}
        </button>
      </header>
      <main className="em-entry-main">
        <section className="em-entry-story">
          <span className="em-eyebrow">UM PASSO DE CADA VEZ</span>
          <h1>
            Seu esforço
            <br />
            vira <span>progresso.</span>
          </h1>
          <p>
            Organize seus estudos, acompanhe suas pequenas vitórias e celebre o que você
            aprendeu.
          </p>
          <div className="em-entry-points">
            <div>
              <ListChecks />
              <span>Missões que cabem no seu dia</span>
            </div>
            <div>
              <Timer />
              <span>Um tempo só para focar</span>
            </div>
            <div>
              <Gift />
              <span>Recompensas escolhidas por você</span>
            </div>
          </div>
        </section>
        <EntryCard />
      </main>
      <footer className="em-entry-footer">
        Seu espaço pessoal para aprender. <span>Estuda · nome provisório</span>
      </footer>
    </div>
  );
}
