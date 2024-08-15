'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { Button } from '@/components/ui/button'
import { useFetchCategory } from '@/features/category/api/use-fetch-category'
import { useFetchProducts } from '@/features/product/api/use-fetch-products'
import ProductTable from '@/features/product/components/product-table'

type Props = {
	params: {
		categoryId: string
	}
}

const CategoryPage = ({ params: { categoryId } }: Props) => {
	const { data: category, isPending, isError } = useFetchProducts(categoryId)

	if (isPending) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error</p>
	}

	return (
		<div>
			<AdminTopbar title={category.name} />
			<div className='p-4 flex flex-col gap-y-4'>
				<div className='w-full flex items-center justify-between'>
					<Button variant={'outline'}>Add Product</Button>
				</div>
				<ProductTable />
			</div>
		</div>
	)
}

export default CategoryPage
