import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInCart: (state, action) => {
      const newProduct = state.products.find(
        (el) => el.id === action.payload.id
      );
      if (newProduct) {
        newProduct.amount += action.payload.amount; 
      } else {
        state.products.push({ ...action.payload });
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    deleteOutCart: (state, action) => {
      state.products = state.products.filter(
        (el) => el.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    increment: (state, action) => {
      const product = state.products.find((el) => el.id === action.payload.id);
      if (product) {
        product.amount += 1;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    
    decrement: (state, action) => {
      const product = state.products.find((el) => el.id === action.payload.id);
      if (product) {
        if (product.amount > 1) {
          product.amount -= 1;
        } else {
          state.products = state.products.filter(
            (el) => el.id !== action.payload.id
          );
        }
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
  },
});

export const { addInCart, deleteOutCart, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
