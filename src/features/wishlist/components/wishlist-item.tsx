'use client'

import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'
import { useAddToWishlist } from '@/features/wishlist/api/use-add-to-wishlist'

type Props = {
	productId: string
}

// TODO: Find a way for the button to change color once it has been added to the wishlist

const WishlistItem = ({ productId }: Props) => {
	const { mutate, isPending } = useAddToWishlist()

	return (
		<div className='flex gap-x-4 items-center justify-center'>
			<Button
				size='icon'
				variant={'outline'}
				className='bg-transparent border-none text-black'
				onClick={() => mutate({ productId })}
				disabled={isPending}
			>
				{<HeartIcon />}
			</Button>
			<p className='text-rose-500'>Add to WishList </p>
		</div>
	)
}

export default WishlistItem
