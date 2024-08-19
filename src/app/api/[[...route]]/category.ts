import { db } from '@/db'
import { category, createCategory, product } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			createCategory.pick({
				name: true,
				description: true
			})
		),
		async (c) => {
			const auth = getAuth(c)

			const { name, description } = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const [data] = await db
				.insert(category)
				.values({
					name,
					description
				})
				.returning()

			if (!data)
				return c.json({ message: 'Failed to create category' }, 400)

			return c.json({ data })
		}
	)
	.get('/', clerkMiddleware(), async (c) => {
		const auth = getAuth(c)

		if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

		const data = await db.query.category.findMany({
			columns: {
				id: true,
				name: true,
				description: true
			},
			with: {
				products: {
					columns: {
						id: true,
						name: true,
						price: true,
						quantity: true
					}
				}
			}
		})

		return c.json({ data })
	})
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
					id: category.id,
					name: category.name,
					description: category.description
				})
				.from(category)
				.where(eq(category.id, id))

			if (!data) return c.json({ error: 'Category not found' }, 404)

			return c.json({ data })
		}
	)
	.patch(
		'/:id',
		clerkMiddleware(),
		zValidator('param', z.object({ id: z.string() })),
		zValidator(
			'json',
			createCategory.pick({ name: true, description: true })
		),
		async (c) => {
			const auth = getAuth(c)
			const { id } = c.req.valid('param')
			const { name, description } = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Not Authorized' }, 401)

			const [data] = await db
				.update(category)
				.set({ name, description })
				.where(eq(category.id, id))
				.returning()

			if (!data) return c.json({ error: 'Category not found' }, 404)

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
				.delete(category)
				.where(eq(category.id, id))
				.returning({ id: category.id })

			if (!data) return c.json({ error: 'Category not found' }, 404)

			return c.json({ data })
		}
	)

export default app
