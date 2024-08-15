'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createCategory } from '@/db/schema'
import { useCreateCategory } from '@/features/category/api/use-create-category'
import { useCreateCategorySheet } from '@/features/category/hooks/use-create-category-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = createCategory.pick({
	categoryName: true,
	description: true
})

type FormValues = z.input<typeof formSchema>

const CategoryForm = () => {
	const { mutate, isPending, error } = useCreateCategory()

	const { onClose } = useCreateCategorySheet()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			categoryName: '',
			description: ''
		}
	})

	const onSubmit = (values: FormValues) => {
		mutate(values, { onSuccess: onClose })

		console.log(error)

		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='categoryName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Name</FormLabel>
							<FormControl>
								<Input
									placeholder='E.g. Electronics'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The name of the category
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='A simple summary of the category'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A simple description of the category
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full' disabled={isPending}>
					Create Category
				</Button>
			</form>
		</Form>
	)
}

export default CategoryForm
