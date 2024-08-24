'use client'

import { Button } from '@/components/ui/button'
import { UploaderButton } from '@/components/uploader-button'
import { createProduct } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import Image from 'next/image'
import { z } from 'zod'

const productSchema = createProduct.omit({
	createdAt: true,
	updatedAt: true,
	categoryId: true,
	supplierId: true
})

export type Product = z.input<typeof productSchema>

export const productColumns: ColumnDef<Product>[] = [
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
	// TODO: FInd a way to render the image and not the imageUrl
	{
		accessorKey: 'id',
		header: 'Image',
		cell: ({ row }) => {
			const product = row.original
			const productImage = product.imageUrl
			const id = product.id

			return productImage === null ? (
				<UploaderButton id={id!} />
			) : (
				<Image
					src={productImage!}
					width={40}
					height={40}
					alt='Product Image'
				/>
			)
		}
	}
]
