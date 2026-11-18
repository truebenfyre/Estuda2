"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { StudyContext, type StudyContextValue } from "../context/study-context";
import { useNow } from "../hooks/use-now";
import { usePageFocus } from "../hooks/use-page-focus";
import { useStudentData } from "../hooks/use-student-data";
import { useTheme } from "../hooks/use-theme";
import { useTimerTick } from "../hooks/use-timer-tick";
import { downloadBackup } from "../lib/backup";
import {
  STORAGE_KEY,
  initialState,
  serialize,
  totals,
} from "../lib/model";
import { PATHS } from "../lib/routes";
import type {
  Account,
  AuthApi,
  LinkComponentType,
  Mission,
  ModalState,
  Navigate,
  Theme,
  Transport,
  View,
} from "../lib/types";
import LoginScreen from "./auth/login-screen";
import AppShell from "./layout/app-shell";
import { FatalScreen, LoadingScreen } from "./layout/app-states";
import { SCREENS } from "./screens";

export interface StudyAppProps {
  children?: ReactNode;
  pathname?: string;
  navigate: Navigate;
  LinkComponent?: LinkComponentType;
  account?: Account | null;
  configured?: boolean;
  localAvailable?: boolean;
  auth: AuthApi;
  transport?: Transport;
}

const ENTRY_PATHS = ["/", "/login", "/recuperar-senha"];

export default function StudyApp({
  children,
  pathname = "/login",
  navigate,
  LinkComponent = "a",
  account = null,
  configured = false,
  localAvailable = false,
  auth,
  transport,
}: StudyAppProps) {
  const [now, refreshNow] = useNow();
  const data = useStudentData({ account, transport, navigate, refreshNow });
  const { state, setState, ready, fatal, setError, setNotice, setBusy, mutate } = data;
  const [modal, setModal] = useState<ModalState | null>(null);
  const view: View =
    (Object.keys(PATHS) as View[]).find((key) => PATHS[key] === pathname) || "dia";
  const stats = useMemo(() => totals(state), [state]);

  useTheme(state.theme);
  const { contentRef, headingRef } = usePageFocus(pathname, () => {
    setNotice("");
    setError("");
  });
  useTimerTick({ ready, fatal, account, timer: state.timer, now, mutate });
  useEffect(() => {
    setError("");
  }, [modal?.type]);
  useEffect(() => {
    if (!ready || fatal) return;
    if (!account && pathname !== "/login") navigate("/login", true);
    else if (account && pathname === "/") navigate("/meu-dia", true);
  }, [ready, account?.id, pathname, fatal]);

  function go(next: View) {
    setModal(null);
    navigate(PATHS[next]);
  }
  function openMission(mission?: Mission) {
    setError("");
    if (!state.subjects.length) {
      go("materias");
      setModal({ type: "subject" });
      setNotice("Cadastre sua primeira matéria para criar uma missão.");
      return;
    }
    setModal({ type: "mission", item: mission });
  }
  function toggleTheme() {
    const value: Theme = state.theme === "light" ? "dark" : "light";
    if (account) mutate({ type: "theme", value });
    else {
      setState((s) => ({ ...s, theme: value }));
      try {
        localStorage.setItem("estuda.theme.v1", value);
      } catch {}
    }
  }
  async function exitAccount() {
    setBusy(true);
    setError("");
    try {
      const result = await auth.signOut();
      if (result.error) setError(result.error);
      else {
        setState(initialState());
        navigate("/login", true, true);
      }
    } catch {
      setError("Não foi possível sair. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  function exportBackup(legacy = false) {
    try {
      downloadBackup(
        legacy ? localStorage.getItem(STORAGE_KEY) || "{}" : serialize(state),
      );
    } catch {
      setError("Não foi possível acessar os dados para exportar.");
    }
  }

  const value: StudyContextValue = {
    account,
    configured,
    localAvailable,
    auth,
    pathname,
    navigate,
    LinkComponent,
    view,
    state,
    stats,
    now,
    busy: data.busy,
    setBusy,
    error: data.error,
    setError,
    notice: data.notice,
    legacyAvailable: data.legacyAvailable,
    modal,
    setModal,
    contentRef,
    headingRef,
    mutate,
    importLegacy: data.importLegacy,
    go,
    openMission,
    toggleTheme,
    exitAccount,
    exportBackup,
  };

  const entryPath = ENTRY_PATHS.includes(pathname);
  const Screen = SCREENS[view];
  let content: ReactNode;
  if (fatal) content = <FatalScreen message={fatal} />;
  else if (!account || entryPath)
    content = entryPath && children ? children : <LoginScreen />;
  else if (!ready) content = <LoadingScreen />;
  else content = <AppShell>{children ?? <Screen />}</AppShell>;

  return <StudyContext.Provider value={value}>{content}</StudyContext.Provider>;
}
