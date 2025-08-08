import React from 'react';
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/orderAPI';
import { useAuth } from '../../context/Authcontext';

const Orderpage = () => {
  const { currentUser } = useAuth();
  
  const { data, isLoading, isError, error } = useGetOrdersByEmailQuery(
    currentUser?.email,
    { skip: !currentUser?.email }
  );

  // ✅ Debug the response structure
  console.log('🔍 Full API response:', data);
  console.log('🔍 Response type:', typeof data);
  console.log('🔍 Is data an array?', Array.isArray(data));

  // ✅ Extract orders array from the response
  let orders = [];
  
  if (data) {
    if (Array.isArray(data)) {
      // If backend returns array directly
      orders = data;
    } else if (data.orders && Array.isArray(data.orders)) {
      // If backend returns { success: true, orders: [...] }
      orders = data.orders;
    } else {
      console.error('❌ Unexpected data format:', data);
    }
  }

  console.log('📦 Processed orders:', orders);
  console.log('📦 Orders length:', orders.length);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading your orders...</div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg text-red-600">
        Error loading orders: {error?.data?.message || 'Something went wrong'}
      </div>
    </div>
  );

  if (!currentUser) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Please log in to view your orders</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
        Your Orders
      </h1>

      {/* Debug info (remove in production) */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
        <p>Debug: Found {orders.length} orders</p>
        <p>Current user email: {currentUser?.email}</p>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No orders found for {currentUser?.email}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <OrderCard key={order._id || index} order={order} orderNumber={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order, orderNumber }) => {
  if (!order) return null;

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
      {/* Order Number */}
      <div className="flex items-center mb-4">
        <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">
          #{orderNumber}
        </span>
      </div>

      {/* Order ID */}
      <div className="mb-4">
        <span className="font-semibold text-gray-800">Order ID: </span>
        <span className="text-gray-700">{order._id || 'N/A'}</span>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-2">
            <span className="font-semibold text-gray-800">Name: </span>
            <span className="text-gray-700">{order.name || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-800">Email: </span>
            <span className="text-gray-700">{order.email || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-800">Phone: </span>
            <span className="text-gray-700">{order.phone || 'N/A'}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-800">Total Price: </span>
            <span className="text-gray-700">
              ${order.total ? order.total.toFixed(2) : '0.00'}
            </span>
          </div>
        </div>

        <div>
          {/* Address */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Address:</h3>
            <div className="text-gray-700 leading-relaxed">
              {order.address ? (
                `${order.address.street || ''}, ${order.address.city || ''}, ${order.address.state || ''}, ${order.address.zipcode || ''}`
              ) : (
                'Address not available'
              )}
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Orderpage;