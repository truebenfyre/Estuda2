import type { Action, Snapshot, StudentState, Transport } from "./types";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
async function request(
  endpoint: string,
  options?: RequestInit,
): Promise<Snapshot> {
  let response;
  try {
    response = await fetch(endpoint, {
      cache: "no-store",
      credentials: "same-origin",
      ...options,
    });
  } catch {
    throw new Error(
      "Sem conexão com o servidor. A alteração não foi salva; tente novamente.",
    );
  }
  const result = await response.json();
  if (!response.ok) {
    throw new ApiError(
      result.error || "Não foi possível acessar seus dados.",
      response.status,
    );
  }
  return result;
}
export const createTransport = (endpoint: string): Transport => ({
  load: () => request(endpoint),
  apply: (action: Action, revision: number) =>
    request(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, revision }),
    }),
  importLegacy: (
    state: StudentState,
    revision: number,
    confirmEmail: string,
  ) =>
    request(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ importState: state, revision, confirmEmail }),
    }),
});
export const cloud = createTransport("/api/state");
export const local = createTransport("/api/local/state");
