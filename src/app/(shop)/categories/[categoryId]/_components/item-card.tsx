'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	imageUrl: string
	name: string
	description: string
	href: string
}

const ItemCard = ({ description, imageUrl, name, href }: Props) => {
	return (
		<Link href={href}>
			<Card className='w-60 h-80 rounded-md'>
				<CardContent className='pb-2 px-0'>
					<Image
						src={imageUrl}
						alt={name}
						width={300}
						height={300}
						className='rounded-md object-contain relative'
					/>
					<p className='text-lg font-semibold text-center'>{name}</p>
					<p className='text-xs text-muted-foreground text-center'>
						{description}
					</p>
				</CardContent>
			</Card>
		</Link>
	)
}

export default ItemCard
