import { create } from "zustand";

type CartState = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementByFive: (qty: number) => void;
  decrementByFive: (qty: number) => void;
  // fetchInitialCount: () => Promise<void>;
};

export const useCartStore = create<CartState & Actions>((set) => ({
  count: 0,

  // fetchInitialCount: async () => {},

  increment: async () => {
    set((state) => ({ count: state.count + 1 }));
    // await fetch("api/cart", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application-json",
    //   },
    // });
  },

  decrement: async () => {},

  reset: async () => {},

  incrementByFive: async () => {},

  decrementByFive: async () => {},

  // increment: () => set((state) => ({ count: state.count + 1 })),
  // decrement: () =>
  //   set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
  // reset: () => set(() => ({ count: 0 })),
  // incrementByFive: (qty: number) =>
  //   set((state) => ({ count: state.count + qty })),
  // decrementByFive: (qty: number) =>
  //   set((state) => ({ count: state.count - qty })),
}));
