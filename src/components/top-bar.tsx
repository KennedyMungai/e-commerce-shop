'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const TopBar = () => {
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
			<div>{/* TODO: Add search bar */}</div>
			<div className='flex gap-4 items-center justify-center'>
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
