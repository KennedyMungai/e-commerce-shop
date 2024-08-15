import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchCategories = () =>
	useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const response = await client.api.category.$get()

			if (response.status !== 200) {
				throw new Error('Failed to fetch categories')
			}

			const { data } = await response.json()

			return data
		}
	})
