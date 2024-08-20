import { useEditProduct } from '@/features/product/api/use-edit-product'
import { useFetchProduct } from '@/features/product/api/use-fetch-product'
import { useUploadThing } from '@/utils/uploadthing'
import { LoaderIcon, UploadIcon } from 'lucide-react'
import { ChangeEvent } from 'react'
import { toast } from 'sonner'

type Input = Parameters<typeof useUploadThing>

const useUploadThingInputProps = (...args: Input) => {
	const $ut = useUploadThing(...args)

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return

		const selectedFiles = Array.from(e.target.files)
		const result = await $ut.startUpload(selectedFiles)

		console.log('uploaded files', result)
		// TODO: persist result in state maybe?
	}

	return {
		inputProps: {
			onChange,
			multiple:
				($ut.permittedFileInfo?.config.image?.maxFileCount ?? 1) > 1,
			accept: 'image/*'
		},
		isUploading: $ut.isUploading
	}
}

type Props = {
	id: string
}

export const UploaderButton = ({ id }: Props) => {
	const { mutate } = useEditProduct(id)
	const {
		data: product,
		isPending: isProductPending,
		isError: isProductError
	} = useFetchProduct(id)

	const { inputProps } = useUploadThingInputProps('imageUploader', {
		onUploadBegin: () => {
			toast(
				<div className='flex gap-x-2'>
					<LoaderIcon className='animate-spin' /> Uploading...
				</div>,
				{
					duration: 500000,
					id: 'upload-begin'
				}
			)
		},
		onUploadError: () => {
			toast.dismiss('upload-begin')
			toast.error('Upload failed. Please try again.')
		},
		onClientUploadComplete: (res: any) => {
			if (!product) return

			mutate({
				...product,
				imageUrl: res[0].url
			})

			toast.dismiss('upload-begin')
			toast.success('Upload complete!')
		}
	})

	return (
		<div>
			<label htmlFor='upload-button' className='cursor-pointer'>
				<UploadIcon className='size-6' />
			</label>
			<input
				id='upload-button'
				type='file'
				className='sr-only'
				{...inputProps}
			/>
		</div>
	)
}
