import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'

const AdminSidebar = () => {
	return (
		<nav className='fixed h-full w-32 border-r shadow-sm flex flex-col items-center justify-between py-4'>
			<div className='flex flex-col items-center gap-y-2'>
				<Link href='/inventory'>
					<Image src='/logo.svg' width={60} height={60} alt='Logo' />
				</Link>
				<p className='text-sm text-center'>E Commerce Admin</p>
			</div>
			<ModeToggle />
		</nav>
	)
}

export default AdminSidebar
