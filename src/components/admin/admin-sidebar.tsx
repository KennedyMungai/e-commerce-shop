'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
	BikeIcon,
	ClipboardListIcon,
	ShoppingBasketIcon,
	TruckIcon,
	UserIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AdminSidebar = () => {
	const pathName = usePathname()

	const route = pathName?.split('/')?.[1]

	return (
		<nav className='fixed h-full w-32 border-r shadow-sm flex flex-col items-center justify-between py-4'>
			<div className='flex flex-col items-center gap-y-2'>
				<Link href='/inventory'>
					<Image src='/logo.svg' width={60} height={60} alt='Logo' />
				</Link>
				<p className='text-sm text-center text-[#f85]'>
					E Commerce Admin
				</p>
			</div>
			<div className='flex h-auto flex-col items-center justify-center gap-y-4'>
				<Button
					className='flex items-center justify-center gap-x-2'
					variant={route === 'inventory' ? 'default' : 'outline'}
					size={'sm'}
					asChild
				>
					<Link href='/inventory' className='flex justify-between'>
						<ClipboardListIcon className='size-4' />{' '}
						<p className='text-sm'>Inventory</p>
					</Link>
				</Button>
				<Button
					className='flex items-center justify-center gap-x-2 w-full'
					variant={route === 'orders' ? 'default' : 'outline'}
					size={'sm'}
					asChild
				>
					<Link href='/orders' className='flex justify-between'>
						<BikeIcon className='size-4' />{' '}
						<p className='text-sm'>Orders</p>
					</Link>
				</Button>
				<Button
					className='flex items-center justify-center w-full gap-x-2'
					variant={route === 'products' ? 'default' : 'outline'}
					size={'sm'}
					asChild
				>
					<Link href='/products' className='flex justify-between'>
						<ShoppingBasketIcon className='size-4' />{' '}
						<p className='text-sm'>Products</p>
					</Link>
				</Button>
				<Button
					className='flex w-full items-center justify-center gap-x-2'
					variant={route === 'users' ? 'default' : 'outline'}
					size={'sm'}
					asChild
				>
					<Link href='/users' className='flex justify-between'>
						<UserIcon className='size-4' />{' '}
						<p className='text-sm'>Users</p>
					</Link>
				</Button>
				<Button
					className=' w-full flex items-center justify-center gap-x-2'
					variant={route === 'suppliers' ? 'default' : 'outline'}
					size={'sm'}
					asChild
				>
					<Link href='/suppliers' className='flex justify-between'>
						<TruckIcon className='size-4' />{' '}
						<p className='text-sm'>Suppliers</p>
					</Link>
				</Button>
			</div>
			<ModeToggle />
		</nav>
	)
}

export default AdminSidebar
