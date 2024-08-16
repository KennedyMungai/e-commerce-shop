import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import category from './category'
import product from './product'
import inventory from './inventory'

export const runtime = 'edge'

const app = new Hono()
	.basePath('/api')
	.route('/category', category)
	.route('/product', product)
	.route('/inventory', inventory)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app
