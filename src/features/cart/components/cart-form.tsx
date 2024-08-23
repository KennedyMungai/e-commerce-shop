'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAddToCart } from '@/features/cart/api/use-add-to-cart'
import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from 'lucide-react'

type Props = {
	productId: string
}

const formSchema = z.object({ quantity: z.number(), productId: z.string() })

type CartSchema = z.input<typeof formSchema>

const CartForm = ({ productId }: Props) => {
	const { mutate, isPending } = useAddToCart()

	const form = useForm<CartSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			quantity: 1,
			productId
		}
	})

	const onSubmit = (values: CartSchema) => {
		mutate(values)

		form.reset()
	}

	// TODO: Look into the weird thing that happens when you update product quantity

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex gap-x-6'>
					<FormField
						control={form.control}
						name='quantity'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='number'
										className='w-16 p-2 ring-0 hover:ring-0 outline-none hover:outline'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button className='flex gap-x-4' disabled={isPending}>
						<ShoppingCartIcon /> Add to Cart
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default CartForm
