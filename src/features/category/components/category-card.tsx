'use client'

import { Card } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'

type Props = {
	name: string
	description: string
}

const CategoryCard = ({ name, description }: Props) => {
	return (
		<Card className='w-48 h-64 p-4'>
			<p className='text-xl text-center pb-4'>{name}</p>
			<p className='text-xs text-muted-foreground text-center'>
				{description}
			</p>
		</Card>
	)
}

export default CategoryCard
