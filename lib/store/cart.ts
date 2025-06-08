import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Product } from "@/types/product";

type CardItem = Product & { storeQuantity: number };

interface CartState {
  items: CardItem[];
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CardItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          if (action.payload.quantity > item.storeQuantity) {
            item.quantity = item.storeQuantity;
          } else {
            item.quantity = action.payload.quantity;
          }
        }
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },

    calculateTotals: (state) => {
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
