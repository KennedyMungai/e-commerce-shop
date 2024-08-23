'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { inventoryColumns } from '@/features/inventory/components/inventory-columns'
import { useFetchAllProducts } from '@/features/product/api/use-fetch-all-products'

const InventoryProducts = () => {
	const {
		data: products,
		isPending: isProductsPending,
		isError: isProductsError
	} = useFetchAllProducts()

	if (isProductsPending) {
		return (
			<div>
				<AdminTopbar title={'Loading...'} isLoading={true} />
				<div className='p-4 flex flex-col gap-y-4'>
					<ScrollArea className='h-[80vh] p-4'>
						<Skeleton className='w-[80vw] h-[70vh]' />
					</ScrollArea>
				</div>
			</div>
		)
	}

	if (isProductsError) {
		return (
			<div>
				<AdminTopbar title={'Loading...'} isLoading={true} />
				<div className='p-4 flex flex-col gap-y-4'>
					<ScrollArea className='h-[80vh] p-4'>
						<Skeleton className='w-[80vw] h-[70vh]' />
					</ScrollArea>
				</div>
			</div>
		)
	}

	return (
		<div>
			<AdminTopbar title='All products inventory' />
			<div className='p-4'>
				<ScrollArea>
					<DataTable columns={inventoryColumns} data={products} />
				</ScrollArea>
			</div>
		</div>
	)
}

export default InventoryProducts
