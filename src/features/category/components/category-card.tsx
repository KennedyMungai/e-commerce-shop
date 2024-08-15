'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { EllipsisVerticalIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	name: string
	description: string
	categoryId: string
}

const CategoryCard = ({ name, description, categoryId }: Props) => {
	return (
		<Link href={`/admin/products/${categoryId}`}>
			<Card className='w-48 h-64 p-4'>
				<CardContent className='h-auto'>
					<p className='text-xl text-center pb-4'>{name}</p>
					<p className='text-xs text-muted-foreground text-center'>
						{description}
					</p>
				</CardContent>

				<CardFooter className='h-fit'>
					<Button className='' size='icon' variant={'outline'}>
						<EllipsisVerticalIcon className='size-4' />
					</Button>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default CategoryCard
