import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.supplier.$post>
type RequestType = InferRequestType<typeof client.api.supplier.$post>['json']

export const useCreateSupplier = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createSupplier'],
		mutationFn: async (json) => {
			const response = await client.api.supplier.$post({ json })

			return await response.json()
		},
		onSuccess: () => {
			toast.success('Supplier created successfully')
			queryClient.invalidateQueries({ queryKey: ['suppliers'] })
		},
		onError: () => toast.error('Failed to create supplier')
	})

	return mutation
}
