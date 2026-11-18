"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import StudyApp from "./study-app";
import { PATHS } from "../lib/routes";
import * as auth from "../app/auth/actions";
import { cloud, local } from "../lib/cloud";
import type { Account, AuthApi } from "../lib/types";

interface RouterAppProps {
  children: ReactNode;
  account: Account | null;
  configured: boolean;
  localAvailable: boolean;
}

export default function RouterApp({
  children,
  account,
  configured,
  localAvailable,
}: RouterAppProps) {
  const pathname = usePathname();
  const router = useRouter();
  if (
    !(Object.values(PATHS) as string[]).includes(pathname) &&
    pathname !== "/" &&
    pathname !== "/login" &&
    pathname !== "/recuperar-senha"
  )
    return children;
  const authApi: AuthApi = {
    ...auth,
    enterLocal: async () => (await fetch("/api/local/session", { method: "POST" })).json(),
    signOut:
      account?.mode === "local"
        ? async () => (await fetch("/api/local/session", { method: "DELETE" })).json()
        : auth.signOut,
  };
  return (
    <StudyApp
      key={account?.id || "signed-out"}
      account={account}
      configured={configured}
      localAvailable={localAvailable}
      auth={authApi}
      transport={account?.mode === "local" ? local : cloud}
      pathname={pathname}
      navigate={(path, replace = false, refresh = false) => {
        router[replace ? "replace" : "push"](path, { scroll: false });
        if (refresh) router.refresh();
      }}
      LinkComponent={Link}
    >
      {children}
    </StudyApp>
  );
}
