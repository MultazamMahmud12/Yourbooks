import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearcart } from '../../redux/features/cart/Cartslice'
import { useAuth } from '../../context/Authcontext';
import { useCreateOrderMutation } from '../../redux/features/orders/orderAPI';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    
   
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.newPrice || item.price || 0;
        const quantity = item.quantity || 1;
        return total + (price * quantity);
    }, 0).toFixed(2);
    
    const [isChecked, setIsChecked] = useState(false);
    const { currentUser } = useAuth();
    
    const [createOrder, {isLoading,error}] = useCreateOrderMutation(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isChecked) {
            console.log("Order placed successfully!");
           
            dispatch(clearcart());
            
        } else {
            alert("Please agree to the terms and conditions.");
        }
         const newOrder = {
            name: e.target.name.value,
            email: currentUser?.email || e.target.email.value,
            phone: e.target.phone.value,
            address: {
                street: e.target.address.value,
                city: e.target.city.value,
                state: e.target.state.value,
                country: e.target.country.value,
                zipcode: e.target.zipcode.value
            },
            productIds: cartItems.map(item => item._id || item.id),
            total: parseFloat(totalPrice)
        };
        try {
            await createOrder(newOrder).unwrap();
            console.log("Order placed successfully!");
            dispatch(clearcart());
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to place order. Please try again.");
        }
    }
    if (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    }
    if(isLoading) {
        return <div className="text-center">Placing your order...</div>;
    }
    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                        {/* ✅ Fixed: Show actual totals */}
                        <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                        <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
                    </div>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        {/* ✅ Fixed: Remove react-hook-form reference and use standard form */}
                        <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">Full Name</label>
                                        <input
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-5">
                                        {/* ✅ Fixed: htmlFor attribute */}
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                            disabled={currentUser}
                                            defaultValue={currentUser?.email}
                                            placeholder="email@domain.com"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-5">
                                        {/* ✅ Fixed: htmlFor attribute */}
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel" 
                                            name="phone" 
                                            id="phone" 
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                            placeholder="+123 456 7890"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="address">Address / Street</label>
                                        <input
                                            type="text" 
                                            name="address" 
                                            id="address" 
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                            placeholder="123 Main Street"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text" 
                                            name="city" 
                                            id="city" 
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                            placeholder="New York"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="country">Country / region</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input
                                                type="text"
                                                name="country" 
                                                id="country" 
                                                placeholder="Country" 
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="state">State / province</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input 
                                                type="text"
                                                name="state" 
                                                id="state" 
                                                placeholder="State" 
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="zipcode">Zipcode</label>
                                        <input 
                                            type="text" 
                                            name="zipcode" 
                                            id="zipcode" 
                                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                            placeholder="12345"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-5 mt-3">
                                        <div className="inline-flex items-center">
                                            {/* ✅ Fixed: Checkbox state management */}
                                            <input 
                                                type="checkbox" 
                                                name="billing_same" 
                                                id="billing_same" 
                                                className="form-checkbox"
                                                checked={isChecked}
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                            />
                                            <label htmlFor="billing_same" className="ml-2">
                                                I agree to the 
                                                <Link className='underline underline-offset-2 text-blue-600 mx-1'>
                                                    Terms & Conditions
                                                </Link> 
                                                and 
                                                <Link className='underline underline-offset-2 text-blue-600 mx-1'>
                                                    Shopping Policy.
                                                </Link>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            {/* ✅ Fixed: Button syntax and disabled state */}
                                            <button 
                                                type="submit"
                                                disabled={!isChecked}
                                                className={`font-bold py-2 px-4 rounded transition-colors ${
                                                    isChecked 
                                                        ? 'bg-blue-500 hover:bg-blue-700 text-white' 
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            >
                                                <Link to="/orders">
                                                    Place an Order
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* ✅ Added: Order Summary */}
                    {cartItems.length > 0 && (
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
                            <h3 className="font-semibold text-lg text-gray-600 mb-4">Order Summary</h3>
                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <div key={item._id || item.id} className="flex justify-between items-center py-2 border-b">
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                                        </div>
                                        <p className="font-semibold">${(item.newPrice || item.price || 0).toFixed(2)}</p>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center pt-4 font-bold text-lg">
                                    <p>Total:</p>
                                    <p>${totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout