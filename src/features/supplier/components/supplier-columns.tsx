'use client'

import { Button } from '@/components/ui/button'
import { createSupplier } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, MoreVerticalIcon } from 'lucide-react'
import { z } from 'zod'

const supplierSchema = createSupplier.omit({
	createdAt: true,
	updatedAt: true
})

export type Supplier = z.input<typeof supplierSchema>

export const supplierColumns: ColumnDef<Supplier>[] = [
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
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Email
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'phoneNumber',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Phone Number
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'id',
		header: 'Options ',
		cell: ({ row }) => (
			<Button variant={'outline'} size='icon'>
				<MoreVerticalIcon className='size-6' />
			</Button>
		)
	}
]
