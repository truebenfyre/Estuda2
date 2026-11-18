"use client";
import { BookOpen, Pencil } from "lucide-react";
import { useStudy } from "../../context/study-context";
import type { Subject } from "../../lib/types";

export default function SubjectCard({ subject: s }: { subject: Subject }) {
  const { state, setModal } = useStudy();
  const activeCount = state.missions.filter(
    (m) => m.subjectId === s.id && m.progress < m.goal,
  ).length;
  return (
    <article className="em-mission em-subject-row">
      <span className="em-mission-icon">
        <BookOpen />
      </span>
      <div>
        <h2>{s.name}</h2>
        <p>{activeCount} missões ativas</p>
      </div>
      <button
        className="em-icon-btn"
        aria-label={`Editar ${s.name}`}
        onClick={() => setModal({ type: "subject", item: s })}
      >
        <Pencil />
      </button>
    </article>
  );
}
