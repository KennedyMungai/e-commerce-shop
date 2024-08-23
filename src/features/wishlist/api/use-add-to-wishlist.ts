import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.wishlist.$post>
type RequestType = InferRequestType<typeof client.api.wishlist.$post>['json']

export const useAddToWishlist = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['addToWishlist'],
		mutationFn: async (json) => {
			const response = await client.api.wishlist.$post({
				json
			})
			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['wishlistItems']
			})
			toast.success('Item added to wishlist')
		},
		onError: () => toast.error('Failed to add to wishlist')
	})

	return mutation
}
