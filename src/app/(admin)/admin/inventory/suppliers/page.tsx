'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchSuppliers } from '@/features/supplier/api/use-fetch-suppliers'
import SupplierCard from '@/features/supplier/components/supplier-card'

const InventorySuppliers = () => {
	const {
		data: suppliers,
		isPending: isSuppliersPending,
		isError: isSuppliersError
	} = useFetchSuppliers()

	if (isSuppliersPending) {
		return (
			<div>
				<AdminTopbar title='Loading' isLoading={true} />
				<div className='max-h-[85vh] flex items-center justify-center p-4'>
					<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
						<div className='flex items-center justify-center gap-6 flex-wrap'>
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
						</div>
					</ScrollArea>
				</div>
			</div>
		)
	}

	if (isSuppliersError) {
		return (
			<div>
				<AdminTopbar title='Loading' isLoading={true} />
				<div className='max-h-[85vh] flex items-center justify-center p-4'>
					<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
						<div className='flex items-center justify-center gap-6 flex-wrap'>
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
							<Skeleton className='w-48 h-64' />
						</div>
					</ScrollArea>
				</div>
			</div>
		)
	}

	return (
		<div>
			<AdminTopbar title='Suppliers Inventory' />
			<div className='max-h-[85vh] flex items-center justify-center p-4'>
				<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
					<div className='flex items-center justify-center gap-6 flex-wrap'>
						{suppliers?.map((supplier) => (
							<SupplierCard
								key={supplier.id}
								name={supplier.name}
								id={supplier.id}
							/>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}

export default InventorySuppliers
