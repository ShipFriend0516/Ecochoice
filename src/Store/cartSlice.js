import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      state.cart.push(action);
    },
    removeCart: (state, action) => {
      // action으로는 어떤 것을 받아올까
      state.cart = state.cart.filter((c) => c.product.id !== action.id);
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
