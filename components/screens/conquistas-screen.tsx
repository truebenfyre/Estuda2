"use client";
import { useMemo } from "react";
import { useStudy } from "../../context/study-context";
import { buildAchievements } from "../../lib/achievements";
import { formatDate } from "../../lib/format";
import AchievementCard from "../achievements/achievement-card";

export default function ConquistasScreen() {
  const { state, stats } = useStudy();
  const achievements = useMemo(() => buildAchievements(state, stats), [state, stats]);
  return (
    <>
      <div className="em-achievements">
        {achievements.map((a) => (
          <AchievementCard key={a.name} achievement={a} />
        ))}
      </div>
      <section className="em-panel em-spaced">
        <h2>Seu histórico de estudo</h2>
        <p className="em-help">
          {stats.completed} missões premiadas · {state.focusSessions.length} sessões de foco
          encerradas. Tempo de foco é apenas um registro do timer.
        </p>
        {state.awards.length ? (
          <ul className="em-history">
            {[...state.awards].reverse().map((a) => (
              <li key={a.missionId}>
                <strong>{a.title}</strong>
                <span>
                  +{a.xp} XP · +{a.gold} ouro · {formatDate(a.completedAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="em-help">Nenhuma missão concluída ainda. Seu primeiro passo conta.</p>
        )}
      </section>
    </>
  );
}
