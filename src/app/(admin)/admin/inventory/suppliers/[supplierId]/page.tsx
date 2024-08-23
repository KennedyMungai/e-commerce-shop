'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { inventoryColumns } from '@/features/inventory/components/inventory-columns'
import { useFetchSupplier } from '@/features/supplier/api/use-fetch-supplier'

type Props = {
	params: {
		supplierId: string
	}
}

const SupplierInventory = ({ params: { supplierId } }: Props) => {
	const {
		data: supplier,
		isPending: isSupplierPending,
		isError: isSupplierError
	} = useFetchSupplier(supplierId)

	if (isSupplierPending) {
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

	if (isSupplierError) {
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
			<AdminTopbar title={`${supplier.name} Inventory`} />
			<div className='p-4'>
				<ScrollArea>
					<DataTable
						columns={inventoryColumns}
						data={supplier.products}
					/>
				</ScrollArea>
			</div>
		</div>
	)
}

export default SupplierInventory
