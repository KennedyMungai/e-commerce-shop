import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProduct } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProduct } from '@/features/product/api/use-create-product'
import { useCreateProductSheet } from '../hooks/use-create-product-sheet'
import { useFetchSuppliers } from '../../supplier/api/use-fetch-suppliers'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
type Props = {
	categoryId: string
}

const formSchema = createProduct.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

type FormValues = z.input<typeof formSchema>

const ProductForm = ({ categoryId }: Props) => {
	const { mutate, isPending } = useCreateProduct()
	const { onClose } = useCreateProductSheet()

	const {
		data: suppliers,
		isPending: isSuppliersPending,
		isError: isSuppliersError
	} = useFetchSuppliers()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			price: '',
			description: '',
			supplierId: '',
			categoryId
		}
	})

	const onSubmit = (values: FormValues) => {
		mutate(values, { onSuccess: onClose })

		form.reset()
	}

	if (isSuppliersPending) {
		return <div>Loading</div>
	}

	if (isSuppliersError) {
		return <div>Error</div>
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='e.g. T-Shirt, Hoodie'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									placeholder='e.g. 1000'
									type='number'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='e.g. This is a nice product'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='supplierId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Supplier</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select the supplier' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{suppliers.map((supplier) => (
											<SelectItem
												key={supplier.id}
												value={supplier.id}
											>
												{supplier.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full mt-6'
					disabled={isPending}
				>
					Create Product
				</Button>
			</form>
		</Form>
	)
}

export default ProductForm
