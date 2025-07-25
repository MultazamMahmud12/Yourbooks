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
        alert("Item already exists in the cart");
      }
    },
  },
});
// export the actions and reducer
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
