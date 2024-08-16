import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchSuppliers = () =>
	useQuery({
		queryKey: ['suppliers'],
		queryFn: async () => {
			const response = await client.api.supplier.$get()
			if (response.status !== 200)
				throw new Error('Failed to fetch suppliers')
			const { data } = await response.json()
			return data
		}
	})
