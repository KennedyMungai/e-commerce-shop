import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import category from './category'

const app = new Hono().basePath('/api').route('/category', category)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app
