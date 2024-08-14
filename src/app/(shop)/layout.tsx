import TopBar from '@/components/top-bar'
import { type ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const ShopLayout = ({ children }: Props) => {
	return (
		<div className='h-full w-full'>
			<div className=''>
				<TopBar />
			</div>
			<div className=''>{children}</div>
		</div>
	)
}

export default ShopLayout
