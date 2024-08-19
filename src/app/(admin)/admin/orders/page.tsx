import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OrderColumns } from '@/features/order/components/order-columns'

const OrdersPage = () => {
	// if (isSuppliersLoading) {
	// 	return (
	// 		<div>
	// 			<AdminTopbar title={'Loading'} isLoading={true} />
	// 			<div className='p-4 flex flex-col gap-y-4'>
	// 				<div className='w-full flex items-center justify-between'>
	// 					<Button variant={'outline'} onClick={onOpen} disabled>
	// 						Add Supplier
	// 					</Button>
	// 				</div>
	// 				<ScrollArea className='h-[80vh] p-4'>
	// 					<Skeleton className='w-[80vw] h-[70vh]' />
	// 				</ScrollArea>
	// 			</div>
	// 		</div>
	// 	)
	// }

	// if (isSuppliersError) {
	// 	return (
	// 		<div>
	// 			<AdminTopbar title={'Loading'} isLoading={true} />
	// 			<div className='p-4 flex flex-col gap-y-4'>
	// 				<div className='w-full flex items-center justify-between'>
	// 					<Button variant={'outline'} onClick={onOpen} disabled>
	// 						Add Supplier
	// 					</Button>
	// 				</div>
	// 				<ScrollArea className='h-[80vh] p-4'>
	// 					<Skeleton className='w-[80vw] h-[70vh]' />
	// 				</ScrollArea>
	// 			</div>
	// 		</div>
	// 	)
	// }

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
