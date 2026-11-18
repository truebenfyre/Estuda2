"use client";
import { useMemo } from "react";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useStudy } from "../../context/study-context";
import { formatClock, newId } from "../../lib/format";
import { RULES, remaining } from "../../lib/model";

export default function FocusTimer() {
  const { state, now, busy, mutate } = useStudy();
  const running = state.timer.endsAt !== null;
  const clock = useMemo(
    () => formatClock(remaining(state.timer, now || Date.now())),
    [state.timer, now],
  );
  return (
    <section className="em-focus" aria-label="Timer de foco">
      <span className="em-focus-icon">
        <Timer />
      </span>
      <div className="em-focus-copy">
        <strong>Seu momento de foco</strong>
        <small>25 minutos, uma coisa de cada vez.</small>
        <small>O timer não valida o estudo nem concede XP.</small>
      </div>
      <div className="em-timer-controls">
        <output aria-label="Tempo restante">{clock}</output>
        <button
          disabled={busy}
          onClick={() =>
            mutate(running ? { type: "timerPause" } : { type: "timerStart", id: newId() })
          }
        >
          {running ? <Pause /> : <Play />}
          {running
            ? "Pausar"
            : state.timer.remainingMs < RULES.focusMs && state.timer.remainingMs > 0
              ? "Retomar"
              : "Iniciar"}
        </button>
        <button
          disabled={busy}
          aria-label="Reiniciar timer em 25 minutos"
          onClick={() => mutate({ type: "timerReset" })}
        >
          <RotateCcw />
        </button>
      </div>
    </section>
  );
}
