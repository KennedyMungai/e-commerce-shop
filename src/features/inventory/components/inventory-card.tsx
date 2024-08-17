import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type Props = {
	label: string
	href: string
}

const InventoryCard = ({ href, label }: Props) => {
	return (
		<Link href={href}>
			<Card className='w-48 h-64 p-4'>
				<CardContent className='h-full w-full flex items-center justify-center uppercase font-semibold text-neutral-600 text-2xl dark:text-neutral-300'>
					{label}
				</CardContent>
			</Card>
		</Link>
	)
}

export default InventoryCard
