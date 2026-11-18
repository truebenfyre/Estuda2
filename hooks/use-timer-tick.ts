import { useEffect, useRef } from "react";
import type { Account, Action, TimerState } from "../lib/types";

interface Options {
  ready: boolean;
  fatal: string;
  account: Account | null;
  timer: TimerState;
  now: number;
  mutate: (action: Action, message?: string) => Promise<boolean>;
}

export function useTimerTick({ ready, fatal, account, timer, now, mutate }: Options) {
  const nextAttempt = useRef(0);
  const ticking = useRef(false);
  useEffect(() => {
    if (
      ready &&
      account &&
      !fatal &&
      now >= nextAttempt.current &&
      timer.endsAt !== null &&
      now >= timer.endsAt &&
      !ticking.current
    ) {
      ticking.current = true;
      nextAttempt.current = now + 30000;
      mutate({ type: "tick" }, "Tempo de foco encerrado. Faça uma pausa.").finally(
        () => {
          ticking.current = false;
        },
      );
    }
  }, [now, timer.endsAt, ready, fatal]);
}
