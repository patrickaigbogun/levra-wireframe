import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import { pgSqlDb } from './config/db/providers/client';
import { dbKeys } from './config/db/env';

// import { neonDbUrl } from '#/constants/db';
export default defineConfig({
	out: './db/drizzle',
	schema: './db/schema/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: dbKeys.url,
	},
});
