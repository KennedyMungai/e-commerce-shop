'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchSuppliers } from '@/features/supplier/api/use-fetch-suppliers'
import { supplierColumns } from '@/features/supplier/components/supplier-columns'
import SuppliersSheet from '@/features/supplier/components/suppliers-sheet'
import { useCreateSupplierSheet } from '@/features/supplier/hooks/use-create-supplier-sheet'
const SuppliersPage = () => {
	const { onOpen } = useCreateSupplierSheet()

	const {
		data: suppliers,
		isPending: isSuppliersLoading,
		isError: isSuppliersError
	} = useFetchSuppliers()

	if (isSuppliersLoading) {
		return (
			<div>
				<AdminTopbar title={'Loading...'} isLoading={true} />
				<div className='p-4 flex flex-col gap-y-4'>
					<div className='w-full flex items-center justify-between'>
						<Button variant={'outline'} onClick={onOpen} disabled>
							Add Supplier
						</Button>
					</div>
					<ScrollArea className='h-[80vh] p-4'>
						<Skeleton className='w-[80vw] h-[70vh]' />
					</ScrollArea>
				</div>
			</div>
		)
	}

	if (isSuppliersError) {
		return (
			<div>
				<AdminTopbar title={'Loading...'} isLoading={true} />
				<div className='p-4 flex flex-col gap-y-4'>
					<div className='w-full flex items-center justify-between'>
						<Button variant={'outline'} onClick={onOpen} disabled>
							Add Supplier
						</Button>
					</div>
					<ScrollArea className='h-[80vh] p-4'>
						<Skeleton className='w-[80vw] h-[70vh]' />
					</ScrollArea>
				</div>
			</div>
		)
	}

	return (
		<>
			<div>
				<AdminTopbar title={'Suppliers'} />
				<div className='p-4 flex flex-col gap-y-4'>
					<div className='w-full flex items-center justify-between'>
						<Button variant={'outline'} onClick={onOpen}>
							Add Supplier
						</Button>
					</div>
					<ScrollArea className='h-[80vh] p-4'>
						<DataTable columns={supplierColumns} data={suppliers} />
					</ScrollArea>
				</div>
			</div>
			<SuppliersSheet />
		</>
	)
}

export default SuppliersPage
