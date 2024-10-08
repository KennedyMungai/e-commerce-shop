'use client'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { useFetchCartItems } from '@/features/cart/api/use-fetch-cart-items'
import { ShoppingCartIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import CartItem from './cart-item'

type Props = {}

const Cart = () => {
	const {
		data: cartItems,
		isPending: isCartItemsPending,
		isError: isCartItemsError
	} = useFetchCartItems()

	if (isCartItemsPending) {
		return <div>Loading...</div>
	}

	if (isCartItemsError) {
		return <div>Error</div>
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size={'icon'} variant={'outline'}>
					<ShoppingCartIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-64 h-96 overflow-y-auto p-2 pb-6'>
				{cartItems?.map((item) => (
					<CartItem
						key={item.id}
						id={item.id}
						src={item.product.imageUrl!}
						name={item.product.name}
						quantity={Number(item.quantity)}
						price={Number(item.product.price)}
					/>
				))}
				<PopoverClose asChild>
					<Link href='/checkout'>
						<Button className='absolute bottom-0 left-0 right-0'>
							Go to Checkout
						</Button>
					</Link>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	)
}

export default Cart
