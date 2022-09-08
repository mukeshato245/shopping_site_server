const express = require('express')
const { sendStripeKey, processPayment } = require('../controllers/paymentController')
const { requiredSignin } = require('../controllers/userController')
const router = express.Router()

router.get('/getStripeKey', sendStripeKey)
router.post('/processpayment', requiredSignin, processPayment)

module.exports = router