import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.product.$post>
type RequestType = InferRequestType<typeof client.api.product.$post>['json']

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createProduct'],
		mutationFn: async (json) => {
			const response = await client.api.product.$post({ json })
			return await response.json()
		},
		onSuccess: () => {
			toast.success('Product created successfully')
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
		onError: () => toast.error('Failed to create product')
	})

	return mutation
}
