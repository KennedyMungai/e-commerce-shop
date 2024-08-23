'use client'

import { useFetchCategory } from '@/features/category/api/use-fetch-category'
import ItemCard from './_components/item-card'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
	params: {
		categoryId: string
	}
}

const CategoryPage = ({ params: { categoryId } }: Props) => {
	const {
		data: category,
		isPending: isCategoryPending,
		isError: isCategoryError
	} = useFetchCategory(categoryId)

	if (isCategoryPending) {
		return (
			<div className='h-full overflow-y-auto'>
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

	if (isCategoryError) {
		return (
			<div className='h-full overflow-y-auto'>
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
		<div className='p-2 overflow-y-auto h-full'>
			<h1 className='text-3xl font-semibold mb-4'>{category.name}</h1>
			<div className='grid grid-cols-3 gap-4'>
				{category.products
					.filter((item) => item.imageUrl !== '')
					.map((item) => (
						<ItemCard
							key={item.id}
							imageUrl={item.imageUrl!}
							name={item.name}
							description={item.description}
							href={`/categories/${categoryId}/productDetail/${item.id}`}
						/>
					))}
			</div>
		</div>
	)
}

export default CategoryPage
