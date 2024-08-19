import { db } from '@/db'
import { createSupplier, product, supplier } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get('/', clerkMiddleware(), async (c) => {
		const auth = getAuth(c)

		if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

		const data = await db.query.supplier.findMany({
			columns: {
				id: true,
				name: true,
				email: true,
				phoneNumber: true
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

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db.query.supplier.findFirst({
				columns: {
					id: true,
					name: true,
					email: true,
					phoneNumber: true
				},
				where: eq(supplier.id, id),
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

			if (!data) return c.json({ error: 'Supplier not found' }, 404)

			return c.json({ data })
		}
	)
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			createSupplier.omit({ id: true, createdAt: true, updatedAt: true })
		),
		async (c) => {
			const auth = getAuth(c)
			const { email, name, phoneNumber } =
				c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.insert(supplier)
				.values({
					email,
					name,
					phoneNumber
				})
				.returning({
					email: supplier.email,
					name: supplier.name,
					phoneNumber: supplier.phoneNumber
				})

			if (!data)
				return c.json({ error: 'Failed to create supplier' }, 400)

			return c.json({ data })
		}
	)
	.patch(
		'/:id',
		clerkMiddleware(),
		zValidator('param', z.object({ id: z.string() })),
		zValidator(
			'json',
			createSupplier.omit({ id: true, createdAt: true, updatedAt: true })
		),
		async (c) => {
			const auth = getAuth(c)
			const { id } = c.req.valid('param')
			const { email, name, phoneNumber } = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.update(supplier)
				.set({
					email,
					name,
					phoneNumber
				})
				.where(eq(supplier.id, id))
				.returning({ id: supplier.id })

			if (!data) return c.json({ error: 'Supplier not found' }, 404)

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
				.delete(supplier)
				.where(eq(supplier.id, id))
				.returning({ id: supplier.id })

			if (!data) return c.json({ error: 'Supplier not found' }, 404)

			return c.json({ data })
		}
	)

export default app
