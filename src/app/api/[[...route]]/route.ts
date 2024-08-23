import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import category from './category'
import product from './product'
import supplier from './supplier'
import cart from './cart'
import wishlist from './wishlist'

export const runtime = 'edge'

const app = new Hono()
	.basePath('/api')
	.route('/category', category)
	.route('/product', product)
	.route('/supplier', supplier)
	.route('/cart', cart)
	.route('/wishlist', wishlist)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app
