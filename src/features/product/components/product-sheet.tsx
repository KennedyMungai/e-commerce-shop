'use state'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useCreateProductSheet } from '@/features/product/hooks/use-create-product-sheet'
import ProductForm from './product-form'

type Props = {
	categoryId: string
}

const ProductSheet = ({ categoryId }: Props) => {
	const { isOpen, onClose } = useCreateProductSheet()

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create a new product</SheetTitle>
				</SheetHeader>
				<ProductForm categoryId={categoryId} />
			</SheetContent>
		</Sheet>
	)
}

export default ProductSheet
