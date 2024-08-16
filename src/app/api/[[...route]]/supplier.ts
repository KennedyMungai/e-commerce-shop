import { db } from '@/db'
import { createSupplier, supplier } from '@/db/schema'
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
				id: supplier.id,
				name: supplier.supplierName,
				email: supplier.supplierEmail,
				phoneNumber: supplier.supplierPhoneNumber
			})
			.from(supplier)

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

			const [data] = await db
				.select({
					id: supplier.id,
					name: supplier.supplierName,
					email: supplier.supplierEmail,
					phoneNumber: supplier.supplierPhoneNumber
				})
				.from(supplier)
				.where(eq(supplier.id, id))

			if (!data) return c.json({ error: 'Supplier not found' }, 404)

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
			const { supplierEmail, supplierName, supplierPhoneNumber } =
				c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.update(supplier)
				.set({
					supplierEmail,
					supplierName,
					supplierPhoneNumber
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
