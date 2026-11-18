import type { View } from "./types";

export const PATHS: Readonly<Record<View, string>> = Object.freeze({
  dia: "/meu-dia",
  missoes: "/missoes",
  materias: "/materias",
  recompensas: "/recompensas",
  conquistas: "/conquistas",
});
