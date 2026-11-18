"use client";
import type { FormEvent } from "react";
import { useStudy } from "../../context/study-context";
import { newId } from "../../lib/format";
import type { Action, ModalState } from "../../lib/types";
import Modal from "../ui/modal";
import {
  DeleteFields,
  ImportFields,
  MissionFields,
  ProfileFields,
  ProgressFields,
  RewardFields,
  SubjectFields,
} from "./modal-fields";

function modalTitle(modal: ModalState): string {
  switch (modal.type) {
    case "progress":
      return "Registrar progresso";
    case "import":
      return "Importar dados locais";
    case "deleteMission":
      return "Excluir missão?";
    case "deleteReward":
      return "Excluir recompensa?";
    case "profile":
      return "Seu perfil";
    case "subject":
      return modal.item ? "Editar matéria" : "Nova matéria";
    case "mission":
      return modal.item ? "Editar missão" : "Nova missão";
    case "reward":
      return modal.item ? "Editar recompensa" : "Nova recompensa";
  }
}

export default function ModalHost() {
  const { modal, setModal, account, state, busy, error, mutate, importLegacy } = useStudy();
  if (!modal) return null;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (modal.type === "import") {
      if (await importLegacy(data.confirmEmail)) setModal(null);
      return;
    }
    let action: Action;
    switch (modal.type) {
      case "deleteMission":
        action = { type: "deleteMission", id: modal.item.id };
        break;
      case "deleteReward":
        action = { type: "deleteReward", id: modal.item.id };
        break;
      case "progress":
        action = { type: "progress", id: modal.item.id, amount: Number(data.amount) };
        break;
      case "profile":
        action = { type: "profile", name: data.name, avatar: data.avatar };
        break;
      case "subject":
        action = {
          type: "subject",
          id: modal.item?.id || newId(),
          name: data.name,
          edit: !!modal.item,
        };
        break;
      case "mission":
        action = {
          type: "mission",
          id: modal.item?.id || newId(),
          edit: !!modal.item,
          title: data.title,
          subjectId: data.subjectId,
          goal: Number(data.goal ?? modal.item?.goal),
          unit: data.unit,
        };
        break;
      case "reward":
        action = {
          type: "reward",
          id: modal.item?.id || newId(),
          edit: !!modal.item,
          name: data.name,
          price: Number(data.price),
        };
        break;
    }
    const message =
      account?.mode === "local"
        ? "Alteração salva neste computador."
        : "Alteração salva na sua conta.";
    if (await mutate(action, message)) setModal(null);
  };

  const missionItem = modal.type === "mission" ? modal.item : undefined;
  return (
    <Modal title={modalTitle(modal)} close={() => setModal(null)}>
      <form onSubmit={submit} aria-describedby={error ? "form-error" : undefined}>
        {modal.type === "import" && <ImportFields email={account?.email} />}
        {(modal.type === "deleteMission" || modal.type === "deleteReward") && (
          <DeleteFields item={modal.item} />
        )}
        {modal.type === "progress" && <ProgressFields item={modal.item} />}
        {modal.type === "profile" && (
          <ProfileFields
            profile={state.profile}
            email={account?.email}
            local={account?.mode === "local"}
          />
        )}
        {modal.type === "subject" && <SubjectFields item={modal.item} />}
        {modal.type === "mission" && (
          <MissionFields
            item={missionItem}
            subjects={state.subjects}
            goalLocked={
              !!missionItem && state.awards.some((a) => a.missionId === missionItem.id)
            }
          />
        )}
        {modal.type === "reward" && <RewardFields item={modal.item} />}
        {error && (
          <p id="form-error" className="em-error" role="alert">
            {error}
          </p>
        )}
        <div className="em-dialog-actions">
          <button className="em-create" type="submit" disabled={busy}>
            {busy
              ? "Salvando…"
              : modal.type.startsWith("delete")
                ? "Confirmar exclusão"
                : "Salvar"}
          </button>
          <button className="em-cancel" type="button" onClick={() => setModal(null)}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
