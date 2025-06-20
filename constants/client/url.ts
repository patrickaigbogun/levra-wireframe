

import { useMemo } from "react";
import { getClientEnv } from "@/config/env";

/**
 * Hook to access the base URL env var.
 * Cached on first render to avoid redundant calls.
 */
export function useBaseUrl(): string {
  const baseUrl = useMemo(() => {
    const { NEXT_PUBLIC_BASE_URL } = getClientEnv();
    const baseUrl = NEXT_PUBLIC_BASE_URL;
    return baseUrl;
  }, []);
console.log(baseUrl)
  return baseUrl;
}
