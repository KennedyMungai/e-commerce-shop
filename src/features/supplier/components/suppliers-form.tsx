'use client'

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
import { createSupplier } from '@/db/schema'
import { useCreateSupplier } from '@/features/supplier/api/use-create-supplier'
import { useCreateSupplierSheet } from '@/features/supplier/hooks/use-create-supplier-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = createSupplier.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

type FormValues = z.input<typeof formSchema>

const SuppliersForm = () => {
	const { onClose } = useCreateSupplierSheet()

	const { mutate, isPending } = useCreateSupplier()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			phoneNumber: ''
		}
	})

	const onSubmit = (values: FormValues) => {
		mutate(values, { onSuccess: () => onClose() })

		form.reset(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name={'name'}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='The name of the supplier'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='The email of the supplier'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phoneNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input
									placeholder='The phone number of the supplier'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full mt-6' disabled={isPending}>
					Add Supplier
				</Button>
			</form>
		</Form>
	)
}

export default SuppliersForm
