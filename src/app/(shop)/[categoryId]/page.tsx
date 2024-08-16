'use client'

import { useFetchCategory } from '@/features/category/api/use-fetch-category'

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

	return <div>{category.name}</div>
}

export default CategoryPage
