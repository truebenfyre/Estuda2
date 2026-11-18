"use client";
import { useMemo, useState } from "react";
import { useStudy } from "../../context/study-context";
import { FILTERS, matchesFilter, type MissionFilterKey } from "../../lib/missions";
import { RULES } from "../../lib/model";
import MissionCard from "../missions/mission-card";
import EmptyState from "../ui/empty-state";

export default function MissoesScreen() {
  const { state, openMission } = useStudy();
  const [filter, setFilter] = useState<MissionFilterKey>("ativas");
  const visible = useMemo(
    () => state.missions.filter((m) => matchesFilter(m, filter)),
    [state.missions, filter],
  );
  return (
    <>
      <div className="em-tabs" aria-label="Filtrar missões">
        {FILTERS.map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f[0].toUpperCase() + f.slice(1)} (
            {state.missions.filter((m) => matchesFilter(m, f)).length})
          </button>
        ))}
      </div>
      <p className="em-help">
        Regra inicial do protótipo: cada missão concede {RULES.xp} XP e {RULES.gold} ouro
        uma única vez, ao atingir a meta.
      </p>
      {visible.length ? (
        <div className="em-missions">
          {visible.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhuma missão por aqui"
          description="Comece com uma meta simples e possível."
          buttonLabel="Nova missão"
          onAction={() => openMission()}
        />
      )}
    </>
  );
}
