'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchCategory } from '@/features/category/api/use-fetch-category'
import { useFetchProducts } from '@/features/product/api/use-fetch-products'
import { productColumns } from '@/features/product/components/product-columns'
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

	if (isCategoryPending || isProductsPending) {
		return (
			<div>
				<AdminTopbar title={'Loading'} isLoading={true} />
				<div className='p-4 flex flex-col gap-y-4'>
					<div className='w-full flex items-center justify-between'>
						<Button variant={'outline'} onClick={onOpen} disabled>
							Add Supplier
						</Button>
					</div>
					<ScrollArea className='h-[80vh] p-4'>
						<Skeleton className='w-[80vw] h-[70vh]' />
					</ScrollArea>
				</div>
			</div>
		)
	}

	if (isCategoryError || isProductsError) {
		return (
			<div>
				<AdminTopbar title={'Loading'} isLoading={true} />
				<div className='p-4 flex flex-col gap-y-4'>
					<div className='w-full flex items-center justify-between'>
						<Button variant={'outline'} onClick={onOpen} disabled>
							Add Supplier
						</Button>
					</div>
					<ScrollArea className='h-[80vh] p-4'>
						<Skeleton className='w-[80vw] h-[70vh]' />
					</ScrollArea>
				</div>
			</div>
		)
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
					<DataTable columns={productColumns} data={products} />
				</div>
			</div>

			<ScrollArea className='h-[80vh] p-4'>
				<ProductSheet categoryId={categoryId} />
			</ScrollArea>
		</>
	)
}

export default CategoryPage
