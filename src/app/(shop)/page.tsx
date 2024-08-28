'use client'

import { useFetchAllProducts } from '@/features/product/api/use-fetch-all-products'
import ItemCard from './categories/[categoryId]/_components/item-card'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = () => {
	const {
		data: products,
		isPending: isProductsPending,
		isError: isProductsError
	} = useFetchAllProducts()

	if (isProductsPending) {
		return (
			<div>
				<h1 className='text-3xl font-semibold mb-4 animate-pulse'>
					Loading...
				</h1>
				<div className='grid grid-cols-3 gap-4'>
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
				</div>
			</div>
		)
	}

	if (isProductsError) {
		return (
			<div>
				<h1 className='text-3xl font-semibold mb-4 animate-pulse'>
					Loading...
				</h1>
				<div className='grid grid-cols-3 gap-4'>
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
					<Skeleton className='w-60 h-80' />
				</div>
			</div>
		)
	}

	return (
		<div className='container h-full overflow-y-auto'>
			<h1 className='text-3xl font-semibold mb-4'>All items</h1>
			<div className='grid grid-cols-3 gap-4'>
				{products
					.filter((item) => item.imageUrl !== null)
					.map((item) => (
						<ItemCard
							key={item.id}
							imageUrl={item.imageUrl!}
							name={item.name}
							description={item.description}
							href={`/productDetails/${item.id}`}
						/>
					))}
			</div>
		</div>
	)
}

export default HomePage
