import { db } from '@/db'
import { createProduct, product } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get(
		'/category/:categoryId',
		clerkMiddleware(),
		zValidator('param', z.object({ categoryId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { categoryId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const data = await db
				.select({
					id: product.id,
					name: product.name,
					price: product.price
				})
				.from(product)
				.where(eq(product.categoryId, categoryId))

			return c.json({ data })
		}
	)
	.get(
		'/:id',
		clerkMiddleware(),
		zValidator('param', z.object({ id: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { id } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const [data] = await db
				.select({
					id: product.id,
					name: product.name,
					price: product.price
				})
				.from(product)
				.where(eq(product.id, id))

			if (!data) return c.json({ error: 'Product not found' }, 404)

			return c.json({ data })
		}
	)
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			createProduct.pick({
				name: true,
				price: true,
				description: true,
				categoryId: true
			})
		),
		async (c) => {}
	)
	.patch(
		'/:id',
		clerkMiddleware(),
		zValidator('param', z.object({ id: z.string() })),
		zValidator(
			'json',
			createProduct.pick({
				price: true,
				description: true,
				imageUrl: true,
				name: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { id } = c.req.valid('param')
			const { description, price, name, imageUrl } = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const [data] = await db
				.update(product)
				.set({
					description,
					price,
					name,
					imageUrl
				})
				.where(eq(product.id, id))
				.returning({ id: product.id })

			if (!data) return c.json({ error: 'Product not found' }, 404)

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
				.delete(product)
				.where(eq(product.id, id))
				.returning({ id: product.id })

			if (!data) return c.json({ error: 'Product not found' }, 404)

			return c.json({ data })
		}
	)

export default app
