import type { Mission } from "./types";

export const FILTERS = ["ativas", "concluídas", "todas"] as const;
export type MissionFilterKey = (typeof FILTERS)[number];

export function matchesFilter(m: Mission, filter: MissionFilterKey): boolean {
  return (
    filter === "todas" ||
    (filter === "ativas" ? m.progress < m.goal : m.progress === m.goal)
  );
}
