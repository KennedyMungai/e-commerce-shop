import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllProducts = () =>
	useQuery({
		queryKey: ['all_products'],
		queryFn: async () => {
			const response = await client.api.product.$get()

			if (response.status !== 200)
				throw new Error('Failed to fetch products')

			const { data } = await response.json()

			return data
		}
	})
