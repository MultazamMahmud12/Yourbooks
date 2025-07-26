import { createSlice } from "@reduxjs/toolkit";

import Swal from "sweetalert2";
const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("addToCart called!", action.payload);
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Already in cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removefromCart: (state, action) => {
      console.log("removefromCart called!", action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Removed from cart",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    clearcart: (state) => {
      console.log("clearcart called!");
      state.cartItems = [];
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cart cleared",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});
// export the actions and reducer
export const { addToCart, removefromCart, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
