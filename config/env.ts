import type { EnvKey, PublicEnvKey, PrivateEnvKey } from "@/types/env";

import { publicEnv } from "@/config/client-env";

/**
 * Get a public (NEXT_PUBLIC_*) environment variable.
 * Works on both client and server.
 */
export function getClientEnv() {
	for (const [key, value] of Object.entries(publicEnv)) {
		if (!value || typeof value !== "string") {
			throw new Error(`❌ Missing client env variable: ${key}`);
		}
	}

	return publicEnv;
}





/** Access server-only env vars only */
export function getServerEnv<K extends PrivateEnvKey>(key: K): string {
	if (typeof window !== "undefined") {
		throw new Error(
			`❌ Tried to access server-only env variable '${key}' on the client`
		);
	}

	return getEnv(key);
}



/** Raw getEnv used internally */
function getEnv<K extends EnvKey>(key: K): string {
	const value = process.env[key];
	if (!value) {
		throw new Error(`❌ Missing env variable: ${key}`);
	}
	return value;
}
