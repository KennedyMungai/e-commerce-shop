import AdminTopbar from '@/components/admin/admin-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import InventoryCard from '@/features/inventory/components/inventory-card'

const InventoryPage = () => {
	return (
		<div>
			<AdminTopbar title={'Inventory'} />
			<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
				<div className='flex items-center justify-center gap-6 flex-wrap'>
					<InventoryCard
						href='/admin/inventory/products'
						label='Products'
					/>
					<InventoryCard
						href='/admin/inventory/suppliers'
						label='Suppliers'
					/>
					<InventoryCard
						href='/admin/inventory/categories'
						label='Categories'
					/>
				</div>
			</ScrollArea>
		</div>
	)
}

export default InventoryPage
