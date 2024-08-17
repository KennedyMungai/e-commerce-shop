'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className='flex flex-col items-center justify-center h-full bg-rose-500'>
			<h2 className='text-2xl text-white dark:text-white font-semibold'>
				Something went wrong!
			</h2>
			<Button
				className='bg-transparent text-white dark:text-white border-white dark:border-white mt-4'
				variant={'outline'}
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	)
}
