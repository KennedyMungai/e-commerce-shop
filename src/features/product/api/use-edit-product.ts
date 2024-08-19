import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
	(typeof client.api.product)[':id']['$patch']
>

type RequestType = InferRequestType<
	(typeof client.api.product)[':id']['$patch']
>['json']

export const useEditProduct = (id: string) => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['editProduct', { id }],
		mutationFn: async (json) => {
			const response = await client.api.product[':id'].$patch({
				param: {
					id
				},
				json
			})
			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['products', 'all_products']
			}),
				toast.success('Product updated successfully')
		},
		onError: () => toast.error('Failed to update product')
	})

	return mutation
}
