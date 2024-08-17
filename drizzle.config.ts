import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

export default defineConfig({
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	extensionsFilters: ['postgis'],
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	strict: true,
	verbose: true
})
