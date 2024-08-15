import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.category.$post>
type RequestType = InferRequestType<typeof client.api.category.$post>['json']

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createCategory'],
		mutationFn: async (json) => {
			const response = await client.api.category.$post({ json })
			return await response.json()
		},
		onSuccess: () =>
			toast.success('Category created successfully', {
				className: 'text-green-500'
			}),
		onError: () =>
			toast.error('Failed to create category', {
				className: 'text-red-500'
			})
	})

	return mutation
}
