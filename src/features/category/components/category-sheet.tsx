import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import CategoryForm from '@/features/category/components/category-form'
import { useCreateCategorySheet } from '@/features/category/hooks/use-create-category-sheet'

const CategorySheet = () => {
	const { isOpen, onClose } = useCreateCategorySheet()

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create a new Category</SheetTitle>
				</SheetHeader>
				<CategoryForm />
			</SheetContent>
		</Sheet>
	)
}

export default CategorySheet
