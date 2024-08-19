'use client'

import AdminTopbar from '@/components/admin/admin-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchCategories } from '@/features/category/api/use-fetch-categories'
import AddCategoryCard from '@/features/category/components/add-category-card'
import CategoryCard from '@/features/category/components/category-card'
import CategorySheet from '@/features/category/components/category-sheet'
import { useCreateCategorySheet } from '@/features/category/hooks/use-create-category-sheet'

const ProductsPage = () => {
	const { onOpen } = useCreateCategorySheet()

	const {
		data: categories,
		isError: isCategoriesError,
		isPending: isCategoriesPending
	} = useFetchCategories()

	if (isCategoriesPending) {
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

	if (isCategoriesError) {
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
		<>
			<div>
				<AdminTopbar title='Products' />
				<div className='max-h-[85vh] flex items-center justify-center p-4'>
					<ScrollArea className='h-[80vh] m-2 flex items-center justify-center'>
						<div className='flex items-center justify-center gap-6 flex-wrap'>
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
