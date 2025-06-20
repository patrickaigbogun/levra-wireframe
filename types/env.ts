

// --- AUTO-GENERATED ENVKEY START ---
export type EnvKey =
  | "DB_URL_RELATIVE"
  | "EMAIL_KEY"
  | "NEON_SECRET"
  | "NEXT_PUBLIC_APP_NAME"
  | "NEXT_PUBLIC_BASE_URL";

export type PublicEnvKey = Extract<EnvKey, `NEXT_PUBLIC_${string}`>;
export type PrivateEnvKey = Exclude<EnvKey, PublicEnvKey>;
// --- AUTO-GENERATED ENVKEY END ---