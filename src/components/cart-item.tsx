'use client'

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { useDeleteFromCart } from '@/features/cart/api/use-delete-from-cart'

type Props = {
	id: string
	src: string
	name: string
	quantity: number
	price: number
}

const CartItem = ({ name, price, quantity, src, id }: Props) => {
	const { mutate, isPending } = useDeleteFromCart(id)

	return (
		<div>
			<div className='h-10 flex text-sm items-center py-2 justify-between'>
				<Image
					src={src}
					width={40}
					height={40}
					alt={name}
					className='mr-2'
				/>
				<div>
					{name} - {quantity * price}
				</div>
				<Button
					variant={'ghost'}
					size={'icon'}
					onClick={() => mutate()}
					disabled={isPending}
				>
					<Trash2Icon className='size-4' />
				</Button>
			</div>
			<Separator className='my-3' />
		</div>
	)
}

export default CartItem
