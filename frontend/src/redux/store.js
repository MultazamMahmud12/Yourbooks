import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/Cartslice'
export default configureStore({
  reducer: {
    cart: cartReducer
  }
})