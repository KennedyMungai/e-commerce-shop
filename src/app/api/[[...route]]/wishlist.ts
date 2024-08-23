import { db } from '@/db'
import { createWishList, wishList } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get('/', clerkMiddleware(), async (c) => {
		const auth = getAuth(c)

		if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

		const data = await db.query.wishList.findMany({
			columns: {
				id: true
			},
			with: {
				product: {
					columns: {
						id: true,
						name: true,
						price: true,
						description: true,
						imageUrl: true
					}
				}
			},
			where: eq(wishList.userId, auth.userId)
		})

		return c.json({ data })
	})
	.post(
		'/',
		clerkMiddleware(),
		zValidator('json', createWishList.pick({ productId: true })),
		async (c) => {
			const auth = getAuth(c)
			const { productId } = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.insert(wishList)
				.values({
					productId,
					userId: auth.userId
				})
				.returning({
					id: wishList.id
				})

			if (!data)
				return c.json({ error: 'Failed to add to wishlist' }, 400)

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

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.delete(wishList)
				.where(
					and(eq(wishList.id, id), eq(wishList.userId, auth.userId))
				)
				.returning({
					id: wishList.id
				})

			if (!data)
				return c.json({ error: 'Failed to remove from wishlist' }, 400)

			return c.json({ data })
		}
	)

export default app
