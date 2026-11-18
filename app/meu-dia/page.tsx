import type { Metadata } from "next";
import DiaScreen from "../../components/screens/dia-screen";

export const metadata: Metadata = { title: "Meu dia · Estuda" };

export default function Page() {
  return <DiaScreen />;
}
