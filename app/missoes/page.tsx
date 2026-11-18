import type { Metadata } from "next";
import MissoesScreen from "../../components/screens/missoes-screen";

export const metadata: Metadata = { title: "Missões · Estuda" };

export default function Page() {
  return <MissoesScreen />;
}
