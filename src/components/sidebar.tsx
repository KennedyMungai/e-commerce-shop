'use client'

import { useFetchCategories } from '@/features/category/api/use-fetch-categories'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Sidebar = () => {
	const pathname = usePathname()

	const route = pathname.split('/')[1]

	const {
		data: categories,
		isPending: isCategoriesPending,
		isError: isCategoriesError
	} = useFetchCategories()

	if (isCategoriesPending) {
		return <div>Loading ...</div>
	}

	if (isCategoriesError) {
		return <div>Error</div>
	}

	return (
		<nav className='fixed top-32 left-5 w-60 h-[70vh] overflow-y-auto shadow-sm rounded-md border p-2'>
			<p className='text-center uppercase border-b py-2 font-semibold text-xl'>
				Categories
			</p>
			<div className='flex flex-col gap-y-2 py-2 overflow-y-auto'>
				{categories.map((category) => (
					<Link key={category.id} href={`/${category.id}`}>
						<Button
							variant={
								route === category.id ? 'default' : 'outline'
							}
							className='w-full'
						>
							{category.name}
						</Button>
					</Link>
				))}
			</div>
		</nav>
	)
}

export default Sidebar
