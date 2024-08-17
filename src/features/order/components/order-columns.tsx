'use client'

import { Button } from '@/components/ui/button'
import { createOrder } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { z } from 'zod'

const orderSchema = createOrder.omit({
	id: true,
	location: true,
	updatedAt: true
})

export type Order = z.input<typeof orderSchema>

// TODO: Use the info given to find the actual product

export const OrderColumns: ColumnDef<Order>[] = [
	{
		accessorKey: 'userId',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					User Name
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'productId',
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
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Date Ordered
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	}
]
