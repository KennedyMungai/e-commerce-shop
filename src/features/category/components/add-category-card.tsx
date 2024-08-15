'use client'

import { Card } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'

type Props = {
	onClick: () => void
}

const AddCategoryCard = ({ onClick }: Props) => {
	return (
		<Card
			className='w-48 h-64 flex items-center justify-center'
			onClick={onClick}
		>
			<PlusIcon className='size-8' />
		</Card>
	)
}

export default AddCategoryCard
