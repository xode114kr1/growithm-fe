import { create } from "zustand";

interface SideNavState {
  isOpenSideNav: boolean;
  setOpenSideNav: () => void;
  setCloseSideNav: () => void;
}

export const useSideNavStore = create<SideNavState>((set) => ({
  isOpenSideNav: false,
  setOpenSideNav: () => {
    set({
      isOpenSideNav: true,
    });
  },
  setCloseSideNav: () => {
    set({
      isOpenSideNav: false,
    });
  },
}));
