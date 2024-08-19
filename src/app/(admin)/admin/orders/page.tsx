import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OrderColumns } from '@/features/order/components/order-columns'

const OrdersPage = () => {
	return (
		<div>
			<AdminTopbar title='Orders' />
			<div className='p-4'>
				<ScrollArea>
					<DataTable columns={OrderColumns} data={[]} />
				</ScrollArea>
			</div>
		</div>
	)
}

export default OrdersPage
