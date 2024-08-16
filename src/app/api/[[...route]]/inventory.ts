import { db } from '@/db'
import { createInventory, inventory } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get('/', clerkMiddleware(), async (c) => {
		const auth = getAuth(c)

		if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

		const data = await db
			.select({
				id: inventory.id,
				productId: inventory.productId,
				quantity: inventory.quantity
			})
			.from(inventory)

		return c.json({ data })
	})
	.get(
		'/category/:categoryId',
		clerkMiddleware(),
		zValidator('param', z.object({ categoryId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { categoryId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db
				.select({
					id: inventory.id,
					productId: inventory.productId,
					quantity: inventory.quantity
				})
				.from(inventory)
				.where(eq(inventory.categoryId, categoryId))

			return c.json({ data })
		}
	)
	.get(
		'/supplier/:supplierId',
		clerkMiddleware(),
		zValidator('param', z.object({ supplierId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { supplierId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db
				.select({
					id: inventory.id,
					productId: inventory.productId,
					quantity: inventory.quantity
				})
				.from(inventory)
				.where(eq(inventory.supplierId, supplierId))

			return c.json({ data })
		}
	)
	.get(
		'/product/:productId',
		clerkMiddleware(),
		zValidator('param', z.object({ productId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { productId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.select({
					id: inventory.id,
					productId: inventory.productId,
					quantity: inventory.quantity
				})
				.from(inventory)
				.where(eq(inventory.productId, productId))

			if (!data)
				return c.json(
					{ error: 'Product Inventory Entry not found' },
					404
				)

			return c.json({ data })
		}
	)
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			createInventory.omit({
				id: true,
				createdAt: true,
				updatedAt: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { categoryId, supplierId, productId, quantity } =
				c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.insert(inventory)
				.values({
					categoryId,
					supplierId,
					productId,
					quantity
				})
				.returning({
					id: inventory.id
				})

			if (!data)
				return c.json(
					{ error: 'Failed to create a new inventory entry' },
					400
				)

			return c.json({ data })
		}
	)
	.patch(
		'/:id',
		clerkMiddleware(),
		zValidator('param', z.object({ id: z.string() })),
		zValidator(
			'json',
			createInventory.omit({
				id: true,
				createdAt: true,
				updatedAt: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { id } = c.req.valid('param')
			const { categoryId, productId, quantity, supplierId } =
				c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.update(inventory)
				.set({
					categoryId,
					supplierId,
					productId,
					quantity
				})
				.where(eq(inventory.id, id))
				.returning({
					id: inventory.id
				})

			if (!data)
				return c.json(
					{ error: 'Failed to update inventory entry' },
					400
				)

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
				.delete(inventory)
				.where(eq(inventory.id, id))
				.returning({
					id: inventory.id
				})

			if (!data)
				return c.json({ error: 'Could not find inventory entry' }, 404)

			return c.json({ data })
		}
	)

export default app
