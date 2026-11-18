import type { Metadata } from "next";
import LoginScreen from "../../components/auth/login-screen";

export const metadata: Metadata = { title: "Nova senha · Estuda" };

export default function Page() {
  return <LoginScreen />;
}
