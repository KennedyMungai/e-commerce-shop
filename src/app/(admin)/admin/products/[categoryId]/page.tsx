'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { Button } from '@/components/ui/button'
import { useFetchCategory } from '@/features/category/api/use-fetch-category'
import { useFetchProducts } from '@/features/product/api/use-fetch-products'
import { columns } from '@/features/product/components/columns'
import { DataTable } from '@/components/data-table'
import ProductSheet from '@/features/product/components/product-sheet'
import { useCreateProductSheet } from '@/features/product/hooks/use-create-product-sheet'

type Props = {
	params: {
		categoryId: string
	}
}

const CategoryPage = ({ params: { categoryId } }: Props) => {
	const {
		data: products,
		isPending: isProductsPending,
		isError: isProductsError
	} = useFetchProducts(categoryId)

	const { onOpen } = useCreateProductSheet()

	const {
		data: category,
		isPending: isCategoryPending,
		isError: isCategoryError
	} = useFetchCategory(categoryId)

	if (isProductsPending || isCategoryPending) {
		return <p>Loading...</p>
	}

	if (isProductsError || isCategoryError) {
		return <p>Error</p>
	}

	return (
		<>
			<div>
				<AdminTopbar title={category.name} />
				<div className='p-4 flex flex-col gap-y-4'>
					<div className='w-full flex items-center justify-between'>
						<Button variant={'outline'} onClick={onOpen}>
							Add Product
						</Button>
					</div>
					<DataTable columns={columns} data={products} />
				</div>
			</div>
			<ProductSheet categoryId={categoryId} />
		</>
	)
}

export default CategoryPage
