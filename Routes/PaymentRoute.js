const { checkOut, paymentVerification } = require('../Controllers/PaymentController.js')
const express = require('express');
const route = express.Router();

route.post('/checkout', checkOut)
route.post('/paymentVerification', paymentVerification)


module.exports = route;