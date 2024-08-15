import Image from 'next/image'

const LoadingPage = () => {
	return (
		<div className='h-full flex items-center justify-center'>
			<Image
				src='/logo.svg'
				width={160}
				height={160}
				alt='Logo'
				className='animate-pulse'
			/>
		</div>
	)
}

export default LoadingPage
