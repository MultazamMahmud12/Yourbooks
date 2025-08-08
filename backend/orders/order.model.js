const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Customer Information
  name: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  
  // Address Object
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [100, 'City name cannot exceed 100 characters']
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      maxlength: [100, 'State name cannot exceed 100 characters']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'United States'
    },
    zipcode: {
      type: String,
      required: [true, 'Zipcode is required'],
    }
  },
  
  // Product IDs array
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to your Book model
    required: true
  }],
  
  // Order Total
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total cannot be negative'],
    validate: {
      validator: function(value) {
        return Number.isFinite(value) && value >= 0;
      },
      message: 'Total must be a valid positive number'
    }
  },
  
  
 
  
 
  
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});




const Order = mongoose.model('Order', orderSchema);

module.exports = Order;