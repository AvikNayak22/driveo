import { create } from "zustand";

type LayoutStore = {
  layout: "grid" | "list";
  setLayout: (layout: "grid" | "list") => void;
};

export const useLayout = create<LayoutStore>((set) => ({
  layout: "list",
  setLayout: (layout) => set({ layout }),
}));
