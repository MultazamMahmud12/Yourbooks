const express = require('express');
const { create } = require('./order.model');
const { createAOrder, getOrdersByEmail } = require('./order.controller');

const router = express.Router();

//create a order endpoint
router.post("/",createAOrder)

//get orders by email
router.get("/email/:email",getOrdersByEmail);

module.exports = router; 