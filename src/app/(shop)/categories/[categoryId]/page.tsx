'use client'

import { useFetchCategory } from '@/features/category/api/use-fetch-category'
import { useFetchProducts } from '@/features/product/api/use-fetch-products'
import ItemCard from './_components/item-card'

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
		return <div>Loading ...</div>
	}

	if (isCategoryError) {
		return <div>Error</div>
	}

	return (
		<div>
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
