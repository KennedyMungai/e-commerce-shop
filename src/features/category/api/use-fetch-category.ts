import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchCategory = (categoryId: string) =>
	useQuery({
		enabled: !!categoryId,
		queryKey: ['category', { categoryId }],
		queryFn: async () => {
			const response = await client.api.category[':id'].$get({
				param: {
					id: categoryId
				}
			})

			if (response.status !== 200)
				throw new Error('Failed to fetch category')

			const { data } = await response.json()

			return data
		}
	})
