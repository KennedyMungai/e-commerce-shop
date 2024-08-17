import { relations, sql } from 'drizzle-orm'
import {
	geometry,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const product = pgTable('product', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	categoryId: uuid('category_id')
		.references(() => category.id, { onDelete: 'cascade' })
		.notNull(),
	supplierId: uuid('supplier_id')
		.references(() => supplier.id, { onDelete: 'cascade' })
		.notNull(),
	description: text('description').notNull(),
	price: varchar('price').notNull(),
	imageUrl: varchar('image', { length: 512 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const productRelations = relations(product, ({ many, one }) => ({
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id]
	}),
	comments: many(comment),
	inventory: one(inventory, {
		fields: [product.id],
		references: [inventory.productId]
	}),
	supplier: one(supplier, {
		fields: [product.supplierId],
		references: [supplier.id]
	})
}))

export const createProduct = createInsertSchema(product)

export const category = pgTable('category', {
	id: uuid('id').defaultRandom().primaryKey(),
	categoryName: varchar('category_name', { length: 255 }).notNull(),
	description: text('description').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const categoryRelations = relations(category, ({ many }) => ({
	products: many(product)
}))

export const createCategory = createInsertSchema(category)

export const cart = pgTable('cart', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: varchar('user_id').notNull(),
	productId: uuid('product_id').references(() => product.id, {
		onDelete: 'cascade'
	}),
	quantity: integer('quantity').default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const cartRelations = relations(cart, ({ one }) => ({
	product: one(product, {
		fields: [cart.productId],
		references: [product.id]
	})
}))

export const createCart = createInsertSchema(cart)

export const order = pgTable('order', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: varchar('user_id').notNull(),
	productId: uuid('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
	quantity: integer('quantity').default(0).notNull(),
	location: geometry('location', {
		type: 'point',
		mode: 'xy',
		srid: 4326
	}).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const orderRelations = relations(order, ({ one }) => ({
	product: one(product, {
		fields: [order.productId],
		references: [product.id]
	})
}))

export const createOrder = createInsertSchema(order)

export const inventory = pgTable('inventory', {
	id: uuid('id').defaultRandom().primaryKey(),
	productId: uuid('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
	categoryId: uuid('category_id')
		.references(() => category.id, { onDelete: 'cascade' })
		.notNull(),
	supplierId: uuid('supplier_id')
		.references(() => supplier.id, { onDelete: 'cascade' })
		.notNull(),
	quantity: integer('quantity').default(0).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const inventoryRelations = relations(inventory, ({ one }) => ({
	product: one(product, {
		fields: [inventory.productId],
		references: [product.id]
	}),
	supplier: one(supplier, {
		fields: [inventory.supplierId],
		references: [supplier.id]
	}),
	category: one(category, {
		fields: [inventory.categoryId],
		references: [category.id]
	})
}))

export const createInventory = createInsertSchema(inventory)

export const comment = pgTable('comment', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: varchar('user_id').notNull(),
	productId: uuid('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
	commentText: text('comment').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const commentRelations = relations(comment, ({ one }) => ({
	comments: one(product, {
		fields: [comment.productId],
		references: [product.id]
	})
}))

export const createComment = createInsertSchema(comment)

export const productRating = pgTable('product_rating', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: varchar('user_id').notNull(),
	productId: uuid('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
	rating: integer('rating').default(0).notNull()
})

export const productRatingRelations = relations(productRating, ({ one }) => ({
	product: one(product, {
		fields: [productRating.productId],
		references: [product.id]
	})
}))

export const createProductRating = createInsertSchema(productRating)

export const supplier = pgTable('supplier', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('supplier_name', { length: 255 }).notNull(),
	email: varchar('supplier_email', { length: 255 }).notNull(),
	phoneNumber: varchar('supplier_phone_number', {
		length: 13
	}).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const supplierRelations = relations(supplier, ({ many }) => ({
	products: many(product)
}))

export const createSupplier = createInsertSchema(supplier)
