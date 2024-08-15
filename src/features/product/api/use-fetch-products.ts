import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchProducts = (categoryId: string) =>
	useQuery({
		enabled: !!categoryId,
		queryKey: ['products'],
		queryFn: async () => {
			const response = await client.api.product.category[
				':categoryId'
			].$get({
				param: {
					categoryId
				}
			})

			if (response.status !== 200)
				throw new Error('Failed to fetch products')

			const { data } = await response.json()

			return data
		}
	})
