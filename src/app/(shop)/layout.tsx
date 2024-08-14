import Sidebar from '@/components/sidebar'
import TopBar from '@/components/top-bar'
import { type ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const ShopLayout = ({ children }: Props) => {
	return (
		<div className='w-full h-full'>
			<div className='mb-2'>
				<TopBar />
			</div>
			<div className='flex'>
				<div className='pr-72'>
					<Sidebar />
				</div>
				<div className='flex-1 h-[85vh] p-2 rounded-md shadow-sm border mr-2'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default ShopLayout
