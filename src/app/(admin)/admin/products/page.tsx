'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchCategories } from '@/features/category/api/use-fetch-categories'
import AddCategoryCard from '@/features/category/components/add-category-card'
import CategoryCard from '@/features/category/components/category-card'
import CategorySheet from '@/features/category/components/category-sheet'
import { useCreateCategorySheet } from '@/features/category/hooks/use-create-category-sheet'

const ProductsPage = () => {
	const { onOpen } = useCreateCategorySheet()

	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isPending: isCategoriesPending
	} = useFetchCategories()

	return (
		<>
			<div>
				<AdminTopbar title='Products' />
				<div className='max-h-[85vh] flex items-center justify-center p-4'>
					<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
						<div className='flex items-center justify-center gap-4'>
							{categories?.map((category) => (
								<CategoryCard
									key={category.id}
									name={category.name}
									description={category.description}
									categoryId={category.id}
								/>
							))}
							<AddCategoryCard onClick={onOpen} />
						</div>
					</ScrollArea>
				</div>
			</div>
			<CategorySheet />
		</>
	)
}

export default ProductsPage
