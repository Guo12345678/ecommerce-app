/** Utilities for the client only. */

import create from 'zustand';

/** Send a JSON-serializable payload to `path`. */
export function fetchJson(
  path: string,
  data: any,
  options: RequestInit & { fetch?: typeof fetch } = {}
) {
  const headers = { ...options.headers, 'content-type': 'application/json' };
  return (options.fetch || fetch)(path, { ...options, body: JSON.stringify(data), headers });
}

export const useGlobalFetch = create((set: Function) => ({
  loading: false,
  fetch(..._: Parameters<typeof fetch>) {
    set({ loading: true });
    return fetch(..._).finally(() => set({ loading: false }));
  },
}));
