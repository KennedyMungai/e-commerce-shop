'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchCategories } from '@/features/category/api/use-fetch-categories'
import InventoryCard from '@/features/inventory/components/inventory-card'

const InventoryCategories = () => {
	const {
		data: categories,
		isPending: isCategoriesPending,
		isError: isCategoriesError
	} = useFetchCategories()

	if (isCategoriesPending) {
		return <div>Loading...</div>
	}

	if (isCategoriesError) {
		return <div>Error</div>
	}

	return (
		<div>
			<AdminTopbar title='Categories Inventory' />
			<div className='max-h-[85vh] flex items-center justify-center p-4'>
				<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
					<div className='flex items-center justify-center gap-6 flex-wrap'>
						{categories?.map((category) => (
							<InventoryCard
								key={category.id}
								label={category.name}
								href={`/admin/inventory/categories/${category.id}`}
							/>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}

export default InventoryCategories
