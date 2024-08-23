'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
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

	if (isCategoryPending) {
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

	if (isCategoryError) {
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
