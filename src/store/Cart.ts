import { createSlice } from "@reduxjs/toolkit";
import { Iproduct } from "../types/productType";

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProduct: (state: any, { payload: product }) => {
      const cartItem = state.find(
        (cartItem: any) => cartItem.id === product.id
      );
      if (cartItem) {
        cartItem.quantity++;
      } else {
        const newCartItem = { ...product, quantity: 1 };
        state.push(newCartItem);
      }
    },
    removeProduct: (state: any, { payload: product }) => {
      const cartItem = state.find(
        (cartItem: any) => cartItem.id === product.id
      );
      if (cartItem) {
        cartItem.quantity--;
      }
    },
    deleteProduct: (state: any, { payload: product }) => {
      return state.filter((cartItem: Iproduct) => cartItem.id !== product.id);
    },
  },
});

export default slice.reducer;
export const { addProduct, removeProduct, deleteProduct } = slice.actions;
