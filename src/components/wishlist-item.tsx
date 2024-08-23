'use client'

import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'

type Props = {
	productId: string
}

const WishlistItem = ({ productId }: Props) => {
	return (
		<div className='flex gap-x-4 items-center justify-center'>
			<Button
				size='icon'
				variant={'outline'}
				className='bg-transparent border-none text-black'
			>
				<HeartIcon />
			</Button>
			<p className='text-rose-500'>Add to WishList </p>
		</div>
	)
}

export default WishlistItem
