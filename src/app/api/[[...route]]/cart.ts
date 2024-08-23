import { db } from '@/db'
import { cart, createCart } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get('/', clerkMiddleware(), async (c) => {
		const auth = getAuth(c)

		if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

		const data = await db.query.cart.findMany({
			columns: {
				id: true,
				quantity: true
			},
			with: {
				product: {
					columns: {
						name: true,
						price: true
					}
				}
			},
			where: eq(cart.userId, auth.userId)
		})

		return c.json({ data })
	})
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			createCart.omit({
				id: true,
				createdAt: true,
				updatedAt: true,
				userId: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { quantity, productId } = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const [data] = await db
				.insert(cart)
				.values({ userId: auth?.userId, quantity, productId })
				.returning()

			if (!data)
				return c.json({ message: 'Failed to create cart item' }, 400)

			return c.json({ data })
		}
	)
	.delete(
		'/:id',
		clerkMiddleware(),
		zValidator('param', z.object({ id: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { id } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const [data] = await db
				.delete(cart)
				.where(eq(cart.id, id))
				.returning()

			if (!data)
				return c.json({ message: 'Failed to delete cart item' }, 400)

			return c.json({ data })
		}
	)

export default app
