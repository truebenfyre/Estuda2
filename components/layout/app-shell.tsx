"use client";
import type { ReactNode } from "react";
import { UserRound } from "lucide-react";
import { useStudy } from "../../context/study-context";
import ModalHost from "../forms/modal-host";
import Navigation from "./navigation";
import PageHeader from "./page-header";
import Sidebar from "./sidebar";
import SidePanel from "./side-panel";
import TopBar from "./top-bar";

export default function AppShell({ children }: { children: ReactNode }) {
  const { state, account, legacyAvailable, setModal, contentRef, exportBackup } = useStudy();
  const pristine =
    !state.profile.name &&
    !state.missions.length &&
    !state.subjects.length &&
    !state.awards.length &&
    !state.rewards.length &&
    !state.redemptions.length;
  return (
    <div id="estuda-app" data-theme={state.theme}>
      <div className="em-shell">
        <Sidebar />
        <div className="em-main-shell">
          <TopBar />
          <div className="em-body" ref={contentRef}>
            <main className="em-center" id="main-content">
              <PageHeader />
              {legacyAvailable && pristine && (
                <section className="em-import-note">
                  <h2>Você tem dados da versão local</h2>
                  <p>
                    Eles não foram enviados para nenhuma conta. Importe somente se forem
                    seus; o destino será <strong>{account?.email}</strong>.
                  </p>
                  <button className="em-link" onClick={() => setModal({ type: "import" })}>
                    Revisar importação
                  </button>
                </section>
              )}
              {!state.profile.name && (
                <section className="em-onboard">
                  <h2>Comece com seu nome</h2>
                  <p>
                    Escolha como quer aparecer. Seu progresso começa do zero e fica
                    associado à sua conta.
                  </p>
                  <button className="em-create" onClick={() => setModal({ type: "profile" })}>
                    <UserRound />
                    Completar perfil
                  </button>
                </section>
              )}
              {children}
              <footer className="em-local-note">
                Dados associados a {account?.email}. Alterações só são confirmadas depois
                de salvas.{" "}
                <button className="em-link" onClick={() => exportBackup()}>
                  Exportar cópia
                </button>
              </footer>
            </main>
            <SidePanel />
          </div>
          <Navigation mobile />
        </div>
      </div>
      <ModalHost />
    </div>
  );
}
