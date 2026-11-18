import type { Metadata } from "next";
import ConquistasScreen from "../../components/screens/conquistas-screen";

export const metadata: Metadata = { title: "Conquistas · Estuda" };

export default function Page() {
  return <ConquistasScreen />;
}
