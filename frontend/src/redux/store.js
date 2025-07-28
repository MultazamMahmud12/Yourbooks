import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/Cartslice'
import booksApi from './features/books/booksAPI'
export default configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})