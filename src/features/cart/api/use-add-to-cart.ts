import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type RequestType = InferRequestType<typeof client.api.cart.$post>['json']
type ResponseType = InferResponseType<typeof client.api.cart.$post>

export const useAddToCart = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['addToCart'],
		mutationFn: async (json) => {
			const response = await client.api.cart.$post({ json })

			if (response.status !== 200)
				throw new Error('Failed to add to cart')

			return await response.json()
		},
		onSuccess: () => toast.success('Item added to cart'),
		onError: () => toast.error('Failed to add item to cart')
	})

	return mutation
}
