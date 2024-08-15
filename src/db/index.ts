import * as schema from '@/db/schema'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

config({ path: '.env.local' })

export const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })