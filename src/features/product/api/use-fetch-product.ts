import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchProduct = (id: string) =>
	useQuery({
		enabled: !!id,
		queryKey: ['product', { id }],
		queryFn: async () => {
			const response = await client.api.product[':id']['$get']({
				param: {
					id
				}
			})

			if (response.status !== 200)
				throw new Error('Failed to fetch product')

			const { data } = await response.json()

			return data
		}
	})
