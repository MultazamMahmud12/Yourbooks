

import { useDispatch, useSelector } from 'react-redux'
import getImgUrl from "../../utils/getImgURL";
import { Link } from 'react-router'
import { clearcart, removefromCart } from '../../redux/features/cart/Cartslice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearcart());
        console.log('Cart cleared');
    }
    const handleRemoveItem = (item) => {
        dispatch(removefromCart(item));
        console.log('Item removed from cart:', item);
    }
   // Calculate total price
 const totalPrice = cartItems.reduce((total, item) => {
        const price = item.newPrice || item.price || 0;
        
        return total + (price );
    }, 0).toFixed(2);
  
  
    return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <div className="text-lg font-medium text-gray-900"> Shopping cart ({cartItems.length} items)</div>
        <div className="ml-3 flex h-7 items-center ">
          <button
            type="button"
             onClick={handleClearCart}
            className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
          >
            <span className="">Clear Cart</span>
          </button>
        </div>
      </div>
     {/* Cart items list */}
     <div className='items-center py-6 justify-between'>
     {
      cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">Continue Shopping</Link>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <img src={getImgUrl(item.coverImage)} alt={item.title} className="h-16 w-16 object-cover rounded-md" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.newPrice || item.oldPrice}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-600 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )

    }
     </div>
    </div>

    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${totalPrice}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      <div className="mt-6">
        <Link
          to="/checkout"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </Link>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <Link to="/">
          or 
          <button
            type="button"

            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Cart
