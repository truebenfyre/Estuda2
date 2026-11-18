import type { StudentState, Totals } from "./types";

export interface Achievement {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: string;
}

export function buildAchievements(
  state: StudentState,
  stats: Totals,
): Achievement[] {
  const days = new Set(state.awards.map((a) => a.day)).size;
  return [
    {
      icon: "🌱",
      name: "Primeiro passo",
      description: "Conclua sua primeira missão.",
      unlocked: stats.completed >= 1,
      progress: `${Math.min(stats.completed, 1)}/1`,
    },
    {
      icon: "⭐",
      name: "Cinco pequenas vitórias",
      description: "Conclua cinco missões diferentes.",
      unlocked: stats.completed >= 5,
      progress: `${Math.min(stats.completed, 5)}/5`,
    },
    {
      icon: "📅",
      name: "Três dias de dedicação",
      description: "Conclua missões em três dias diferentes.",
      unlocked: days >= 3,
      progress: `${Math.min(days, 3)}/3`,
    },
  ];
}
