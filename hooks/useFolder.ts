import { create } from "zustand";

type FolderStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const userFolder = create<FolderStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
