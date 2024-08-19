import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type Props = {
	id: string
	name: string
}

const SupplierCard = ({ name, id }: Props) => {
	return (
		<Link href={`/admin/inventory/suppliers/${id}`}>
			<Card className='w-48 h-64 p-4'>
				<CardContent className='flex items-center justify-center'>
					<p className='text-xl text-center pb-4'>{name}</p>
				</CardContent>
			</Card>
		</Link>
	)
}

export default SupplierCard
