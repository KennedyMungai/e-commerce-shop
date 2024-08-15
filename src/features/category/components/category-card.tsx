'use client'

import { Card } from '@/components/ui/card'
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
				<p className='text-xl text-center pb-4'>{name}</p>
				<p className='text-xs text-muted-foreground text-center'>
					{description}
				</p>
			</Card>
		</Link>
	)
}

export default CategoryCard
