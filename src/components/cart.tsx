'use client'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { useFetchCartItems } from '@/features/cart/api/use-fetch-cart-items'
import { ShoppingCartIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Separator } from '@/components/ui/separator'

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
			<PopoverContent className='w-56 h-96 overflow-y-auto p-2'>
				{cartItems?.map((item) => (
					<Fragment key={item.id}>
						<div>
							{item.product.name} -{' '}
							{Number(item.product.price) * item.quantity!}
						</div>
						<Separator />
					</Fragment>
				))}
			</PopoverContent>
		</Popover>
	)
}

export default Cart
