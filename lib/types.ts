import type { ElementType } from "react";

export type Theme = "light" | "dark";
export type View = "dia" | "missoes" | "materias" | "recompensas" | "conquistas";

export interface Profile {
  name: string;
  avatar: string;
}
export interface Subject {
  id: string;
  name: string;
}
export interface Mission {
  id: string;
  title: string;
  subjectId: string;
  goal: number;
  unit: string;
  progress: number;
  today: boolean;
  createdAt: number;
}
export interface Award {
  missionId: string;
  title: string;
  xp: number;
  gold: number;
  completedAt: number;
  day: string;
}
export interface Reward {
  id: string;
  name: string;
  price: number;
}
export interface Redemption {
  id: string;
  rewardId: string;
  name: string;
  price: number;
  redeemedAt: number;
}
export interface FocusSession {
  id: string;
  endedAt: number;
}
export interface TimerState {
  remainingMs: number;
  endsAt: number | null;
  sessionId: string | null;
}
export interface StudentState {
  version: 1;
  profile: Profile;
  theme: Theme;
  subjects: Subject[];
  missions: Mission[];
  awards: Award[];
  rewards: Reward[];
  redemptions: Redemption[];
  focusSessions: FocusSession[];
  timer: TimerState;
}
export interface Totals {
  xp: number;
  gold: number;
  level: number;
  levelProgress: number;
  completed: number;
}

export type Action =
  | { type: "profile"; name: string; avatar: string }
  | { type: "theme"; value: string }
  | { type: "subject"; id: string; name: string; edit?: boolean }
  | {
      type: "mission";
      id: string;
      title: string;
      subjectId: string;
      goal: number;
      unit: string;
      edit?: boolean;
    }
  | { type: "today"; id: string; value: boolean }
  | { type: "progress"; id: string; amount: number }
  | { type: "deleteMission"; id: string }
  | { type: "reward"; id: string; name: string; price: number; edit?: boolean }
  | { type: "deleteReward"; id: string }
  | { type: "redeem"; id: string; rewardId: string }
  | { type: "timerStart"; id: string }
  | { type: "timerPause" }
  | { type: "timerReset" }
  | { type: "tick" };

export interface Account {
  id: string;
  email: string;
  mode?: "local";
}
export interface Snapshot {
  state: StudentState;
  revision: number;
  userId: string;
}
export interface Transport {
  load(): Promise<Snapshot>;
  apply(action: Action, revision: number): Promise<Snapshot>;
  importLegacy(
    state: StudentState,
    revision: number,
    confirmEmail: string,
  ): Promise<Snapshot>;
}

export type AuthMode = "signIn" | "signUp" | "requestPasswordReset";
export interface AuthResult {
  ok?: boolean;
  error?: string;
  message?: string;
}
export interface AuthApi {
  signIn(data: FormData): Promise<AuthResult>;
  signUp(data: FormData): Promise<AuthResult>;
  requestPasswordReset(data: FormData): Promise<AuthResult>;
  updatePassword(data: FormData): Promise<AuthResult>;
  signOut(): Promise<AuthResult>;
  enterLocal(): Promise<AuthResult>;
}

export type Navigate = (
  path: string,
  replace?: boolean,
  refresh?: boolean,
) => void;
export type LinkComponentType = ElementType;

export type ModalState =
  | { type: "import" }
  | { type: "profile" }
  | { type: "subject"; item?: Subject }
  | { type: "mission"; item?: Mission }
  | { type: "reward"; item?: Reward }
  | { type: "progress"; item: Mission }
  | { type: "deleteMission"; item: Mission }
  | { type: "deleteReward"; item: Reward };
