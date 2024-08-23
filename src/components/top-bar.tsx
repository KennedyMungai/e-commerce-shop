'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Input } from '@/components/ui/input'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { HeartIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Cart from '@/components/cart'
import { Button } from './ui/button'

type Props = {}

const TopBar = () => {
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<div className='w-full h-20 border-b shadow-sm flex items-center justify-between sticky top-0 px-4'>
			<div className='flex items-center gap-4'>
				<Link href='/'>
					<Image src='/logo.svg' width={40} height={40} alt='Logo' />
				</Link>
				<h1 className='text-[#f85] text-2xl font-semibold'>
					E Commerce
				</h1>
			</div>
			<div className='w-auto flex flex-1 px-12'>
				<Input
					className='flex-1 text-center ring-0 outline-none'
					placeholder='Search for items'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className='flex gap-4 items-center justify-center'>
				<Cart />
				<Link href='/wishlist'>
					<Button variant={'ghost'} size={'icon'}>
						<HeartIcon className='size-4' />
					</Button>
				</Link>
				<ClerkLoading>
					<Loader2Icon className='size-6 animate-spin' />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton />
				</ClerkLoaded>
				<ModeToggle />
			</div>
		</div>
	)
}

export default TopBar
