import { relations } from 'drizzle-orm'
import {
	geometry,
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
	quantity: integer('quantity').default(0).notNull(),
	categoryId: uuid('category_id')
		.references(() => category.id, { onDelete: 'cascade' })
		.notNull(),
	supplierId: uuid('supplier_id')
		.references(() => supplier.id, { onDelete: 'cascade' })
		.notNull(),
	description: text('description').notNull(),
	price: varchar('price').notNull(),
	imageUrl: varchar('image_url', { length: 512 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const productRelations = relations(product, ({ many, one }) => ({
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id]
	}),
	comments: many(comment),
	supplier: one(supplier, {
		fields: [product.supplierId],
		references: [supplier.id]
	}),
	order: one(order, {
		fields: [product.id],
		references: [order.productId]
	})
}))

export const createProduct = createInsertSchema(product)

export const category = pgTable('category', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
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
	quantity: integer('quantity').default(0),
	productId: uuid('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
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
		.notNull()
		.unique(), // Ensure one-to-one relationship
	quantity: integer('quantity').default(1).notNull(),
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
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phoneNumber: varchar('phone_number', {
		length: 13
	}).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const supplierRelations = relations(supplier, ({ many }) => ({
	products: many(product)
}))

export const createSupplier = createInsertSchema(supplier)

export const wishList = pgTable('wish_list', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: varchar('user_id').notNull(),
	productId: uuid('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const wishListRelations = relations(wishList, ({ one }) => ({
	product: one(product, {
		fields: [wishList.productId],
		references: [product.id]
	})
}))

export const createWishList = createInsertSchema(wishList)