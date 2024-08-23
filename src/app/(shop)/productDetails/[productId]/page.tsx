'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import WishlistItem from '@/components/wishlist-item'
import CartForm from '@/features/cart/components/cart-form'
import { useFetchProduct } from '@/features/product/api/use-fetch-product'
import { HeartIcon } from 'lucide-react'
import Image from 'next/image'

type Props = {
	params: {
		productId: string
	}
}

const ProductDetail = ({ params: { productId } }: Props) => {
	const {
		data: product,
		isPending: isProductPending,
		isError: isProductError
	} = useFetchProduct(productId)

	if (isProductPending) {
		return (
			<div className='h-full w-full grid grid-cols-2'>
				<div className='h-full w-full flex items-center justify-center bg-white rounded-md'>
					<div className='absolute bottom-4 flex gap-2 items-center justify-center'>
						<Skeleton className='w-36 h-10' />
					</div>
				</div>
				<div className='h-full w-full flex flex-col items-center justify-center p-4'>
					<p className='text-3xl font-semibold animate-pulse'>
						Loading Product Name ...
					</p>
					<p className='text-neutral-600 dark:text-neutral-300 animate-pulse'>
						Loading Product Description ...
					</p>
					<div className='absolute bottom-4'>
						<Skeleton className='w-36 h-10 animate-bounce' />
					</div>
				</div>
			</div>
		)
	}

	if (isProductError) {
		return (
			<div className='h-full w-full grid grid-cols-2'>
				<div className='h-full w-full flex items-center justify-center bg-white rounded-md'>
					<div className='absolute bottom-4 flex gap-2 items-center justify-center'>
						<Skeleton className='w-36 h-10' />
					</div>
				</div>
				<div className='h-full w-full flex flex-col items-center justify-center p-4'>
					<p className='text-3xl font-semibold animate-pulse'>
						Loading Product Name ...
					</p>
					<p className='text-neutral-600 dark:text-neutral-300 animate-pulse'>
						Loading Product Description ...
					</p>
					<div className='absolute bottom-4'>
						<Skeleton className='w-36 h-10 animate-bounce' />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='h-full w-full grid grid-cols-2'>
			<div className='h-full w-full flex items-center justify-center bg-white rounded-md'>
				<Image
					src={product.imageUrl!}
					alt={product.name}
					width={300}
					height={500}
					className='rounded-md object-contain'
				/>
				<div className='absolute bottom-4'>
					<WishlistItem productId={productId} />
				</div>
			</div>
			<div className='h-full w-full flex flex-col items-center justify-center p-4'>
				<p className='text-3xl font-semibold'>{product.name}</p>
				<p className='text-neutral-600 dark:text-neutral-300'>
					{product.description}
				</p>
				<div className='absolute bottom-4 flex gap-x-4'>
					<CartForm productId={productId} />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail
