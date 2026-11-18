import type { ComponentType } from "react";
import type { View } from "../../lib/types";
import ConquistasScreen from "./conquistas-screen";
import DiaScreen from "./dia-screen";
import MateriasScreen from "./materias-screen";
import MissoesScreen from "./missoes-screen";
import RecompensasScreen from "./recompensas-screen";

export const SCREENS: Record<View, ComponentType> = {
  dia: DiaScreen,
  missoes: MissoesScreen,
  materias: MateriasScreen,
  recompensas: RecompensasScreen,
  conquistas: ConquistasScreen,
};
