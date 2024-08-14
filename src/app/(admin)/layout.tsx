import AdminSidebar from '@/components/admin/admin-sidebar'
import { type ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
	return (
		<div className='flex h-full w-full'>
			<div className='mr-32'>
				<AdminSidebar />
			</div>
			<div className='w-full'>{children}</div>
		</div>
	)
}

export default AdminLayout
