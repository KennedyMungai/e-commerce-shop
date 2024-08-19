'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { inventoryColumns } from '@/features/inventory/components/inventory-columns'
import { useFetchAllProducts } from '@/features/product/api/use-fetch-all-products'

const InventoryProducts = () => {
	const {
		data: products,
		isPending: isProductsPending,
		isError: isProductsError
	} = useFetchAllProducts()

	if (isProductsError) {
		return <div>Error</div>
	}

	if (isProductsPending) {
		return <div>Loading...</div>
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
