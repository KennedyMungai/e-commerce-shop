import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
	return (
		<div className='h-full flex w-full'>
			<div className='flex flex-col items-center justify-center basis-2/5 gap-y-4'>
				<Image src='./logo.svg' width={160} height={160} alt='Logo' />
				<p className='font-semibold text-[#f85] text-3xl'>
					E Commerce Shop
				</p>
			</div>
			<div className='flex items-center justify-center basis-3/5 bg-[#f85]'>
				{children}
			</div>
		</div>
	)
}

export default AuthLayout
