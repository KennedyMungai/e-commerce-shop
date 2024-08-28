'use client'

import { useFetchWishlistItems } from '@/features/wishlist/api/use-fetch-wishlist-items'
import ItemCard from '../categories/[categoryId]/_components/item-card'

const WishlistPage = () => {
	const {
		data: products,
		isPending: isProductsPending,
		isError: isProductsError
	} = useFetchWishlistItems()

	if (isProductsPending) {
		return <div>Loading...</div>
	}

	if (isProductsError) {
		return <div>Error</div>
	}

	return (
		<div>
			<h1 className='text-3xl font-semibold mb-4'>Wishlist items</h1>

			<div className='grid grid-cols-3 gap-4'>
				{products
					.filter((item) => item.product.imageUrl !== null)
					.map((item) => (
						<ItemCard
							key={item.id}
							imageUrl={item.product.imageUrl!}
							name={item.product.name}
							description={item.product.description}
							href={`/productDetails/${item.id}`}
						/>
					))}
			</div>
		</div>
	)
}

export default WishlistPage
