'use client'

import { Card } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'

type Props = {
	name: string
	description: string
}

const CategoryCard = ({ name, description }: Props) => {
	return (
		<Card className='w-48 h-64 flex flex-col items-center justify-center'>
			<p className='text-2xl'>{name}</p>
			<p className='text-sm'>{description}</p>
		</Card>
	)
}

export default CategoryCard
