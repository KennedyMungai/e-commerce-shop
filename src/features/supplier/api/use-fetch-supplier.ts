import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchSupplier = (id: string) =>
	useQuery({
		enabled: !!id,
		queryKey: ['supplier', { id }],
		queryFn: async () => {
			const response = await client.api.supplier[':id'].$get({
				param: { id }
			})

			if (response.status !== 200)
				throw new Error('Failed to fetch supplier')

			const { data } = await response.json()

			return data
		}
	})
