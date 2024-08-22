'use client'

import { Button } from '@/components/ui/button'
import { useFetchProduct } from '@/features/product/api/use-fetch-product'
import { ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'

type Props = {
	params: {
		productId: string
	}
}

const ProductPage = ({ params: { productId } }: Props) => {
	const {
		data: product,
		isPending: isProductPending,
		isError: isProductError
	} = useFetchProduct(productId)

	if (isProductPending) {
		return <div>Loading...</div>
	}

	if (isProductError) {
		return <div>Error</div>
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
			</div>
			<div className='h-full w-full flex flex-col items-center justify-center p-4'>
				<p className='text-3xl font-semibold'>{product.name}</p>
				<p className='text-neutral-600 dark:text-neutral-300'>
					{product.description}
				</p>
				<Button className=' absolute bottom-2 animate-bounce hover:animate-none'>
					<ShoppingCartIcon className='mr-4' />
					Add To Cart
				</Button>
			</div>
		</div>
	)
}

export default ProductPage
