export function getEnv(env: string): string | undefined{
	const rawEnv = process.env[env];
	if (!rawEnv) {
		console.error(
			`Couldn't find environment variable: ${env}`
		);
        return undefined
	} else {
		return rawEnv;
	}
};