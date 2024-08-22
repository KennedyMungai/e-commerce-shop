'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from './ui/badge'

type Props = {}

const Cart = () => {
	// const {} = useFetchCartItems()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size={'icon'} variant={'outline'}>
					<ShoppingCartIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-56 h-96 overflow-y-auto p-2'>
				lorem500
			</PopoverContent>
		</Popover>
	)
}

export default Cart
