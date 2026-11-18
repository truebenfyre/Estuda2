"use client";
import { Gift } from "lucide-react";
import { useStudy } from "../../context/study-context";
import { RULES } from "../../lib/model";
import ProgressBar from "../ui/progress-bar";

export default function SidePanel() {
  const { state, stats, setModal, go } = useStudy();
  const nextReward = state.rewards[0];
  return (
    <aside className="em-side" aria-label="Seu progresso">
      <section className="em-panel">
        <div className="em-profile-header">
          <div className="em-avatar">
            {state.profile.avatar}
            <span className="em-level-badge">{stats.level}</span>
          </div>
          <div>
            <div className="em-person-name">{state.profile.name || "Seu perfil"}</div>
            <div className="em-level-name">Nível {stats.level}</div>
          </div>
        </div>
        <div className="em-xp-label">
          <span>Próximo nível</span>
          <span>
            {stats.levelProgress}/{RULES.levelXp} XP
          </span>
        </div>
        <ProgressBar value={stats.levelProgress} max={RULES.levelXp} label="Experiência no nível" xp />
        <p className="em-help">
          Faltam {RULES.levelXp - stats.levelProgress} XP para o nível {stats.level + 1}.
        </p>
        <button className="em-link" onClick={() => setModal({ type: "profile" })}>
          Editar perfil →
        </button>
      </section>
      <section className="em-panel">
        <h2>Seu caminho</h2>
        <p className="em-help">{stats.completed} missões premiadas.</p>
        <p className="em-help">
          {new Set(state.awards.map((a) => a.day)).size} dias com conclusões.
        </p>
        <p className="em-help">{state.focusSessions.length} sessões de foco encerradas.</p>
      </section>
      <section className="em-panel">
        <h2>Uma recompensa sua</h2>
        <div className="em-reward-icon">
          <Gift />
        </div>
        <div className="em-reward-line">
          <span>{nextReward?.name || "Você escolhe"}</span>
          {nextReward && <span>{nextReward.price} ouro</span>}
        </div>
        <p className="em-help">
          {nextReward
            ? stats.gold >= nextReward.price
              ? "Seu saldo já permite esse resgate."
              : `Faltam ${nextReward.price - stats.gold} ouro.`
            : "Crie sua primeira recompensa pessoal."}
        </p>
        <button className="em-link" onClick={() => go("recompensas")}>
          Ver recompensas →
        </button>
      </section>
      <p className="em-help">
        Regras iniciais: {RULES.xp} XP + {RULES.gold} ouro por missão; um nível a cada{" "}
        {RULES.levelXp} XP. Valores do protótipo, sujeitos a revisão.
      </p>
    </aside>
  );
}
