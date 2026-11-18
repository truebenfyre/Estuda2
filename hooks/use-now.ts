import { useCallback, useEffect, useState } from "react";

export function useNow(intervalMs = 1000): [number, () => void] {
  const [now, setNow] = useState(0);
  const refresh = useCallback(() => setNow(Date.now()), []);
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, intervalMs);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [intervalMs, refresh]);
  return [now, refresh];
}
