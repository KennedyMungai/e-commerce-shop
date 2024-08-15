'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { useFetchCategory } from '@/features/category/api/use-fetch-category'

type Props = {
	params: {
		categoryId: string
	}
}

const CategoryPage = ({ params: { categoryId } }: Props) => {
	const { data: category, isPending, isError } = useFetchCategory(categoryId)

	if (isPending) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error</p>
	}

	return (
		<div>
			<AdminTopbar title={category.name} />
		</div>
	)
}

export default CategoryPage
