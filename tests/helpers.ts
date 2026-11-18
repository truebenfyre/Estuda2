import type { AuthApi, Transport } from "../lib/types";

export function makeAuth(overrides: Partial<AuthApi> = {}): AuthApi {
  const unused = async () => ({});
  return {
    signIn: unused,
    signUp: unused,
    requestPasswordReset: unused,
    updatePassword: unused,
    signOut: unused,
    enterLocal: unused,
    ...overrides,
  };
}

export function makeTransport(
  parts: Pick<Transport, "load" | "apply">,
): Transport {
  return {
    ...parts,
    importLegacy: async () => {
      throw new Error("importLegacy não é usado neste teste.");
    },
  };
}
