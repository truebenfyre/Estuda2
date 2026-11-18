"use client";
import { Download } from "lucide-react";
import { useStudy } from "../../context/study-context";
import Logo from "../ui/logo";
import Navigation from "./navigation";

export default function Sidebar() {
  const { setModal, exportBackup } = useStudy();
  return (
    <aside className="em-rail">
      <Logo />
      <Navigation />
      <div className="em-rail-foot">
        Seu esforço vira progresso.
        <br />
        <br />
        Sua conta · nome provisório
        <button className="em-link" onClick={() => setModal({ type: "profile" })}>
          Editar perfil
        </button>
        <button className="em-link" onClick={() => exportBackup()}>
          <Download />
          Exportar dados
        </button>
      </div>
    </aside>
  );
}
