import { AppType } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

export const client = hc<AppType>(process.env.APPLICATION_URL!)
