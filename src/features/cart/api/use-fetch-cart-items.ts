import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchCartItems = () =>
	useQuery({
		queryKey: ['cartItems'],
		queryFn: async () => {
			const response = await client.api.cart.$get()
			if (response.status !== 200)
				throw new Error('Failed to fetch cart items')

			const { data } = await response.json()

			return data
		}
	})
