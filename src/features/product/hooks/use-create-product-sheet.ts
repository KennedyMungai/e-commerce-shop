import { create } from 'zustand'

type Props = {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

export const useCreateProductSheet = create<Props>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true })
}))
