import { createContext, useContext } from "react";
import type {
  Account,
  Action,
  AuthApi,
  LinkComponentType,
  Mission,
  ModalState,
  Navigate,
  StudentState,
  Totals,
  View,
} from "../lib/types";
import type { RefObject } from "react";

export interface StudyContextValue {
  account: Account | null;
  configured: boolean;
  localAvailable: boolean;
  auth: AuthApi;
  pathname: string;
  navigate: Navigate;
  LinkComponent: LinkComponentType;
  view: View;
  state: StudentState;
  stats: Totals;
  now: number;
  busy: boolean;
  setBusy: (value: boolean) => void;
  error: string;
  setError: (value: string) => void;
  notice: string;
  legacyAvailable: boolean;
  modal: ModalState | null;
  setModal: (modal: ModalState | null) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  mutate: (action: Action, message?: string) => Promise<boolean>;
  importLegacy: (confirmEmail: string) => Promise<boolean>;
  go: (view: View) => void;
  openMission: (mission?: Mission) => void;
  toggleTheme: () => void;
  exitAccount: () => Promise<void>;
  exportBackup: (legacy?: boolean) => void;
}

export const StudyContext = createContext<StudyContextValue | null>(null);

export function useStudy(): StudyContextValue {
  const value = useContext(StudyContext);
  if (!value) throw new Error("useStudy precisa ser usado dentro de <StudyApp>.");
  return value;
}
