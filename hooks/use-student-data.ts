import { useEffect, useRef, useState } from "react";
import {
  STORAGE_KEY,
  deserialize,
  initialState,
} from "../lib/model";
import type {
  Account,
  Action,
  Navigate,
  Snapshot,
  StudentState,
  Transport,
} from "../lib/types";

interface Options {
  account: Account | null;
  transport?: Transport;
  navigate: Navigate;
  refreshNow: () => void;
}

export function useStudentData({ account, transport, navigate, refreshNow }: Options) {
  const [state, setState] = useState<StudentState>(initialState);
  const [ready, setReady] = useState(false);
  const [fatal, setFatal] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [legacyAvailable, setLegacyAvailable] = useState(false);
  const revisionRef = useRef(0);
  const queue = useRef<Promise<unknown>>(Promise.resolve());

  function needTransport(): Transport {
    if (!transport) throw new Error("Conexão com os dados indisponível.");
    return transport;
  }
  function adopt(snapshot: Snapshot) {
    if (snapshot.userId !== account?.id)
      throw new Error("A conta mudou. Entre novamente antes de continuar.");
    revisionRef.current = snapshot.revision;
    setState(deserialize(JSON.stringify(snapshot.state)));
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (account) {
          const snapshot = await needTransport().load();
          if (!cancelled) adopt(snapshot);
        } else {
          let theme: StudentState["theme"] = "light";
          try {
            theme =
              localStorage.getItem("estuda.theme.v1") === "dark"
                ? "dark"
                : "light";
          } catch {}
          if (!cancelled) setState({ ...initialState(), theme });
        }
        if (!cancelled) setFatal("");
      } catch (e) {
        if (!cancelled) setFatal((e as Error).message);
      } finally {
        if (!cancelled) setReady(true);
      }
    }
    try {
      setLegacyAvailable(!!localStorage.getItem(STORAGE_KEY));
    } catch {}
    load();
    const visible = () => {
      if (document.visibilityState === "visible" && account) load();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", visible);
    };
  }, [account?.id]);

  function mutate(action: Action, message = ""): Promise<boolean> {
    const run = async () => {
      if (!account) return false;
      setBusy(true);
      setError("");
      try {
        const snapshot = await needTransport().apply(action, revisionRef.current);
        adopt(snapshot);
        refreshNow();
        setNotice(message);
        return true;
      } catch (e) {
        const failure = e as Error & { status?: number };
        setError(failure.message);
        if (failure.status === 401) navigate("/login", true, true);
        if (failure.status === 409) {
          try {
            adopt(await needTransport().load());
          } catch {}
        }
        return false;
      } finally {
        setBusy(false);
      }
    };
    const pending = queue.current.then(run, run);
    queue.current = pending;
    return pending;
  }

  async function importLegacy(confirmEmail: string): Promise<boolean> {
    setBusy(true);
    setError("");
    try {
      const legacy = deserialize(localStorage.getItem(STORAGE_KEY));
      const result = await needTransport().importLegacy(
        legacy,
        revisionRef.current,
        confirmEmail,
      );
      adopt(result);
      setNotice(
        "Dados locais importados para sua conta. A cópia antiga foi preservada.",
      );
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  return {
    state,
    setState,
    ready,
    fatal,
    error,
    setError,
    notice,
    setNotice,
    busy,
    setBusy,
    legacyAvailable,
    mutate,
    importLegacy,
  };
}
