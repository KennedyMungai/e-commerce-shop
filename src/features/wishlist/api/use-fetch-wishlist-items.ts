import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

const useFetchWishlistItems = () =>
	useQuery({
		queryKey: ['wishlistItems'],
		queryFn: async () => {
			const response = await client.api.wishlist.$get()

			if (response.status !== 200)
				throw new Error('Failed to fetch wishlist items')

			const { data } = await response.json()

			return data
		}
	})
