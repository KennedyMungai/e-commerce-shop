'use client'

import { Button } from '@/components/ui/button'
import { createProduct } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, UploadCloudIcon } from 'lucide-react'
import { z } from 'zod'

const productSchema = createProduct.pick({
	id: true,
	productName: true,
	price: true
})

type Product = z.input<typeof productSchema>

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: 'productName',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Name
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
					Price
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'id',
		header: 'Upload Image',
		cell: ({ row }) => <UploadCloudIcon className='size-8' />
	}
]
