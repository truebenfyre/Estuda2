"use client";
import { useMemo } from "react";
import { useStudy } from "../../context/study-context";
import { localDate } from "../../lib/model";
import DaySummary from "../missions/day-summary";
import FocusTimer from "../missions/focus-timer";
import MissionCard from "../missions/mission-card";
import EmptyState from "../ui/empty-state";

export default function DiaScreen() {
  const { state, stats, now, go, openMission } = useStudy();
  const active = useMemo(
    () => state.missions.filter((m) => m.progress < m.goal),
    [state.missions],
  );
  const today = useMemo(() => active.filter((m) => m.today), [active]);
  const completedToday = state.awards.filter(
    (a) => a.day === localDate(now || Date.now()),
  ).length;
  return (
    <>
      <DaySummary todayCount={today.length} completedToday={completedToday} xp={stats.xp} />
      <FocusTimer />
      <div className="em-section-head">
        <h2>Seu próximo estudo</h2>
        <button className="em-link" onClick={() => go("missoes")}>
          Ver todas as missões →
        </button>
      </div>
      {today.length ? (
        <div className="em-missions">
          <MissionCard mission={today[0]} />
        </div>
      ) : (
        <EmptyState
          title="Um espaço para seu próximo passo"
          description="Crie uma missão ou marque uma existente para sua lista do dia."
          buttonLabel={active.length ? "Escolher missão" : "Criar missão"}
          onAction={() => (active.length ? go("missoes") : openMission())}
        />
      )}
      {today.length > 1 && (
        <section className="em-panel em-day-list">
          <h2>Também na sua lista</h2>
          <ul>
            {today.slice(1, 4).map((m) => (
              <li key={m.id}>
                <span>{m.title}</span>
                <small>
                  {m.progress}/{m.goal} {m.unit}
                </small>
              </li>
            ))}
          </ul>
          {today.length > 4 && (
            <p className="em-help">Mais {today.length - 4} na tela de Missões.</p>
          )}
        </section>
      )}
      <p className="em-help">
        Sua lista do dia mantém o que você marcou até concluir ou remover da lista.
        Agendamento por data virá depois.
      </p>
    </>
  );
}
