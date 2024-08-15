import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {
	title: string
}

const AdminTopbar = ({ title }: Props) => {
	return (
		<div className='w-full h-20 border-b shadow-sm flex items-center justify-between px-4'>
			<p className='text-2xl font-semibold'>{title}</p>
			<div className='flex items-center gap-x-4'>
				<Link href={'/'}>
					<Button variant={'outline'}>Back to Shop</Button>
				</Link>
				<ClerkLoading>
					<Loader2Icon className='size-6 animate-spin' />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton />
				</ClerkLoaded>
			</div>
		</div>
	)
}

export default AdminTopbar
