'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import SuppliersForm from '@/features/supplier/components/suppliers-form'
import { useCreateSupplierSheet } from '@/features/supplier/hooks/use-create-supplier-sheet'

const SuppliersSheet = () => {
	const { isOpen, onClose } = useCreateSupplierSheet()

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Add a new supplier</SheetTitle>
				</SheetHeader>
				<SuppliersForm />
			</SheetContent>
		</Sheet>
	)
}

export default SuppliersSheet
