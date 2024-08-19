'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SuppliersInventoryColumns } from '@/features/inventory/components/suppliers-inventory-columns'
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

	if (isSupplierError) {
		return <div>Error</div>
	}

	if (isSupplierPending) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<AdminTopbar title={supplier.name} />
			<div className='p-4'>
				<ScrollArea>
					<DataTable
						columns={SuppliersInventoryColumns}
						data={supplier.products}
					/>
				</ScrollArea>
			</div>
		</div>
	)
}

export default SupplierInventory
