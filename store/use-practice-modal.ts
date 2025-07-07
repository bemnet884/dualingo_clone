import { create } from 'zustand'

type PeacticeModalState = {
  isOpen: boolean,
  open: () => void,
  close: () => void,
}

const usePeacticeModal = create<PeacticeModalState>((set) => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false})
}))
export default usePeacticeModal