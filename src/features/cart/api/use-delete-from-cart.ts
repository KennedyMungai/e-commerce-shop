import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
	(typeof client.api.cart)[':id']['$delete']
>

export const useDeleteFromCart = (id: string) => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error>({
		mutationKey: ['deleteFromCart'],
		mutationFn: async () => {
			const response = await client.api.cart[':id'].$delete({
				param: {
					id
				}
			})

			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cartItems'] })
			toast.success('Item removed from cart')
		},
		onError: () => toast.error('Failed to remove item from cart')
	})

	return mutation
}
