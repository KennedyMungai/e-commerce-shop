import * as schema from '@/db/schema'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

config({ path: '.env.local' })

const client = new Client({ connectionString: process.env.DATABASE_URL! })

export const db = drizzle(client, { schema })
