import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const product = pgTable('product', {
	id: uuid('id').defaultRandom().primaryKey(),
	productName: varchar('product_name', { length: 255 }).notNull()
})
