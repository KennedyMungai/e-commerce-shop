type Props = {
	title: string
}

const AdminTopbar = ({ title }: Props) => {
	return (
		<div className='w-full h-20 border-b shadow-sm flex items-center justify-between px-4'>
			<p className='text-2xl font-semibold'>{title}</p>
		</div>
	)
}

export default AdminTopbar
