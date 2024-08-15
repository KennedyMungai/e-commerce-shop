'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import AddCategoryButton from '@/features/category/components/add-category-button'
import CategorySheet from '@/features/category/components/category-sheet'
import { useCreateCategorySheet } from '@/features/category/hooks/use-create-category-sheet'

const ProductsPage = () => {
	const { onOpen } = useCreateCategorySheet()

	return (
		<>
			<div>
				<AdminTopbar title='Products' />
				<div className='max-h-[85vh] flex items-center justify-center p-4'>
					<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
						<AddCategoryButton onClick={onOpen} />
					</ScrollArea>
				</div>
			</div>
			<CategorySheet />
		</>
	)
}

export default ProductsPage
