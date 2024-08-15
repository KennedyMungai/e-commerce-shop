import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
	(typeof client.api.category)[':id']['$delete']
>

export const useDeleteCategory = (id: string) => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error>({
		mutationKey: ['deleteCategory'],
		mutationFn: async () => {
			const response = await client.api.category[':id'].$delete({
				param: {
					id
				}
			})

			return await response.json()
		},
		onSuccess: () => {
			toast.success('Category deleted successfully')
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},
		onError: () => toast.error('Failed to delete category')
	})

	return mutation
}
