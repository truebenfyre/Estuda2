"use client";
import { BookOpen, Check, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useStudy } from "../../context/study-context";
import { RULES } from "../../lib/model";
import type { Mission } from "../../lib/types";
import ProgressBar from "../ui/progress-bar";

export default function MissionCard({ mission: m }: { mission: Mission }) {
  const { state, busy, mutate, setModal, openMission } = useStudy();
  const subject = state.subjects.find((x) => x.id === m.subjectId);
  const awarded = state.awards.some((a) => a.missionId === m.id);
  const done = m.progress >= m.goal;
  return (
    <article className="em-mission">
      <div className="em-mission-head">
        <span className="em-mission-icon">
          <BookOpen aria-hidden="true" />
        </span>
        <div className="em-mission-text">
          <div className="em-subject">{subject?.name}</div>
          <h3>{m.title}</h3>
          <p>
            Complete {m.goal} {m.unit}.
          </p>
        </div>
        <div className="em-prize">
          <span className="em-star">
            <Star aria-hidden="true" />
          </span>
          <div>
            {awarded ? "Recebido" : `+${RULES.xp} XP`}
            <small>{awarded ? "Prêmio único" : `+${RULES.gold} ouro`}</small>
          </div>
        </div>
      </div>
      <div className="em-progress-row">
        <span className="em-fraction">
          {m.progress}/{m.goal}
        </span>
        <ProgressBar value={m.progress} max={m.goal} label={`Progresso de ${m.title}`} />
        <button
          className="em-plus"
          disabled={busy || done}
          onClick={() =>
            mutate({ type: "progress", id: m.id, amount: 1 }, done ? "" : "Progresso salvo.")
          }
          aria-label={`Registrar mais uma unidade em ${m.title}`}
        >
          {done ? <Check /> : <Plus />}
        </button>
      </div>
      <div className="em-row-actions">
        {!done && (
          <button className="em-link" onClick={() => setModal({ type: "progress", item: m })}>
            Registrar quantidade
          </button>
        )}
        <label className="em-check">
          <input
            type="checkbox"
            checked={m.today}
            onChange={(e) => mutate({ type: "today", id: m.id, value: e.target.checked })}
            disabled={busy}
          />
          Na lista do dia
        </label>
        <button className="em-link" onClick={() => openMission(m)}>
          <Pencil />
          Editar
        </button>
        <button
          className="em-link"
          disabled={busy || m.progress === 0}
          onClick={() =>
            mutate(
              { type: "progress", id: m.id, amount: -1 },
              "Passo desfeito. Uma missão só recebe o prêmio uma vez.",
            )
          }
        >
          Desfazer passo
        </button>
        <button
          className="em-icon-btn"
          aria-label={`Excluir ${m.title}`}
          onClick={() => setModal({ type: "deleteMission", item: m })}
          disabled={busy}
        >
          <Trash2 />
        </button>
      </div>
    </article>
  );
}
