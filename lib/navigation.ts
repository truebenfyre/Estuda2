import {
  BookOpen,
  Gift,
  LayoutDashboard,
  ListChecks,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { View } from "./types";

export const NAV: ReadonlyArray<{ key: View; label: string; Icon: LucideIcon }> = [
  { key: "dia", label: "Meu dia", Icon: LayoutDashboard },
  { key: "missoes", label: "Missões", Icon: ListChecks },
  { key: "materias", label: "Matérias", Icon: BookOpen },
  { key: "recompensas", label: "Recompensas", Icon: Gift },
  { key: "conquistas", label: "Conquistas", Icon: Trophy },
];

export const SUBTITLES: Readonly<Record<View, string>> = {
  dia: "Escolha um próximo passo e estude no seu ritmo.",
  missoes: "Metas pequenas. Progresso de verdade.",
  materias: "Organize os assuntos que você quer aprender.",
  recompensas: "Escolha algo bom para celebrar seu esforço.",
  conquistas: "Cada selo conta uma parte do seu caminho.",
};

export const AVATARS = ["🌱", "🦊", "🐱", "🦉", "🚀", "🌻"] as const;
