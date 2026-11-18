import type { Metadata } from "next";
import MateriasScreen from "../../components/screens/materias-screen";

export const metadata: Metadata = { title: "Matérias · Estuda" };

export default function Page() {
  return <MateriasScreen />;
}
