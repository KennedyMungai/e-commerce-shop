import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const NotFoundPage = () => {
	return (
		<div className='h-full flex flex-col items-center justify-center gap-y-4 bg-white dark:bg-black'>
			<Link href={'/'}>
				<Image
					src={'/logo.svg'}
					width={100}
					height={100}
					alt={'Logo'}
				/>
			</Link>
			<p className='text-3xl text-[#f85]'>404 | Page Not Found</p>
			<Button
				variant={'outline'}
				className='bg-transparent text-[#f85] hover:text-[#f85]'
			>
				Go Back
			</Button>
		</div>
	)
}

export default NotFoundPage
