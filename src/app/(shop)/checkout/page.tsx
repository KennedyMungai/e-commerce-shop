'use client'

import { Separator } from '@/components/ui/separator'
import { useFetchCartItems } from '@/features/cart/api/use-fetch-cart-items'
import Image from 'next/image'
import { Fragment } from 'react'

const CheckoutPage = () => {
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
		<div className='h-full grid grid-cols-2'>
			<div className='overflow-y-auto border-r'>
				{cartItems.map((item) => (
					<Fragment key={item.id}>
						<div className='flex text-sm items-center py-2'>
							<Image
								src={item.product.imageUrl!}
								width={120}
								height={120}
								alt={item.product.name}
							/>
							<div className='flex flex-col ml-4'>
								<p className='text-lg font-semibold mb-4'>
									Name:-{item.product.name}
								</p>
								<p className=''>Quantity:- {item.quantity}</p>
								<p className=''>Price:- {item.product.price}</p>
							</div>
						</div>
						<Separator />
					</Fragment>
				))}
			</div>
			<div className='h-full grid grid-rows-2'>
				<div className='h-full bg-rose-500'></div>
				<div className='h-full bg-teal-500'></div>
			</div>
		</div>
	)
}

export default CheckoutPage
