import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api').get('/', async (c) => {
	return c.json({ hello: 'world' })
})

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app
