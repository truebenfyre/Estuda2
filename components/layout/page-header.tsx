"use client";
import { Plus } from "lucide-react";
import { useStudy } from "../../context/study-context";
import { NAV, SUBTITLES } from "../../lib/navigation";
import { RULES } from "../../lib/model";
import ProgressBar from "../ui/progress-bar";

export default function PageHeader() {
  const { view, headingRef, stats, openMission, notice, error, modal } = useStudy();
  return (
    <>
      <div className="em-title-line">
        <h1 ref={headingRef} tabIndex={-1}>
          {NAV.find((item) => item.key === view)?.label}
        </h1>
        {(view === "dia" || view === "missoes") && (
          <button className="em-create" onClick={() => openMission()}>
            <Plus />
            Nova missão
          </button>
        )}
      </div>
      <p className="em-subtitle">{SUBTITLES[view]}</p>
      <div className="em-mobile-xp">
        <span>Nível {stats.level}</span>
        <ProgressBar value={stats.levelProgress} max={RULES.levelXp} label="XP do nível" xp />
        <span>
          {stats.levelProgress}/{RULES.levelXp} XP
        </span>
      </div>
      <div className="em-live" aria-live="polite">
        {notice}
      </div>
      {error && !modal && (
        <p id="form-error" className="em-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
