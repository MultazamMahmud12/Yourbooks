const Order = require('./order.model');

const createAOrder = async (req, res) => {
try {
    const newOrder = new Order(req.body); 
    const savedOrder = await newOrder.save(); // Save the order to the database
    
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder
    });
    
} catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message
    });
  }
}

const getOrdersByEmail = async (req, res) => {
  const { email } = req.params;
  // Sort by creation date, most recent first

  try {
     const orders = await Order.find({ email: email }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders: orders
    });
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message || "Internal Server Error"
    });
    
  }
}


module.exports = {
  createAOrder  ,
  getOrdersByEmail 
}