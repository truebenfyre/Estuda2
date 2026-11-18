"use client";
import { Plus } from "lucide-react";
import { useStudy } from "../../context/study-context";
import SubjectCard from "../subjects/subject-card";
import EmptyState from "../ui/empty-state";

export default function MateriasScreen() {
  const { state, setModal } = useStudy();
  return (
    <>
      <button className="em-create em-spaced" onClick={() => setModal({ type: "subject" })}>
        <Plus />
        Adicionar matéria
      </button>
      {state.subjects.length ? (
        <div className="em-missions">
          {state.subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="O que você quer estudar?"
          description="Cadastre suas matérias para organizar as próximas missões."
        />
      )}
    </>
  );
}
