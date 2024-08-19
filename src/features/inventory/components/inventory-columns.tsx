'use client'

import { Button } from '@/components/ui/button'
import { createProduct } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { z } from 'zod'

const productSchema = createProduct.omit({
	imageUrl: true,
	description: true,
	categoryId: true,
	supplierId: true,
	createdAt: true,
	updatedAt: true
})

export type Product = z.input<typeof productSchema>

export const inventoryColumns: ColumnDef<Product>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Product Name
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Product Price
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Product Quantity
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	}
]
