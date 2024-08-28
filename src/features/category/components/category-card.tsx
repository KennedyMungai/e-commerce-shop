'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDeleteCategory } from '@/features/category/api/use-delete-category'
import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	name: string
	description: string
	categoryId: string
}

const CategoryCard = ({ name, description, categoryId }: Props) => {
	const { mutate } = useDeleteCategory(categoryId)

	return (
		<Card className='w-48 h-64 p-4 relative'>
			<div className='absolute top-0 right-0'>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button size='icon' variant={'ghost'}>
							<MoreVerticalIcon className='size-6' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start' className='w-20'>
						<DropdownMenuLabel>Options</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='flex gap-x-2'>
								<Button size='icon' variant={'outline'}>
									<PencilIcon className='size-4' />
								</Button>
								<span className='text-xs'>Edit</span>
							</DropdownMenuItem>
							<DropdownMenuItem className='flex gap-x-2'>
								<Button
									variant={'outline'}
									size='icon'
									onClick={() => mutate()}
								>
									<TrashIcon className='size-4' />
								</Button>
								<span className='text-xs'>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Link href={`/admin/products/${categoryId}`}>
				<p className='text-xl text-center pb-4'>{name}</p>
				<p className='text-xs text-muted-foreground text-center'>
					{description}
				</p>
			</Link>
		</Card>
	)
}

export default CategoryCard
