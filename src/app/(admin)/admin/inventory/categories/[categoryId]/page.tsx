'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchCategory } from '@/features/category/api/use-fetch-category'
import { inventoryColumns } from '@/features/inventory/components/inventory-columns'

type Props = {
	params: {
		categoryId: string
	}
}

const InventoryCategory = ({ params: { categoryId } }: Props) => {
	const {
		data: category,
		isPending: isCategoryPending,
		isError: isCategoryError
	} = useFetchCategory(categoryId)

	if (isCategoryError) {
		return <div>Error</div>
	}

	if (isCategoryPending) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<AdminTopbar title={`${category.name} Inventory`} />
			<div className='p-4'>
				<ScrollArea>
					<DataTable
						columns={inventoryColumns}
						data={category.products}
					/>
				</ScrollArea>
			</div>
		</div>
	)
}

export default InventoryCategory
