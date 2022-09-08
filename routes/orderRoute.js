const express = require('express')
const { placeOrder, viewOrders, orderDetails, userOrders, updateOrder, deleteOrder, } = require('../controllers/orderController')
const { requiredSignin } = require('../controllers/userController')
const router = express.Router()

router.post('/placeorder',placeOrder)
router.get('/orders', viewOrders)
router.get('/orderdetails/:id', requiredSignin, orderDetails)
router.get('/userorder/:userId', userOrders)
router.put('/updateorder/:id', updateOrder)
router.delete('/deleteorder/:orderId', deleteOrder)

module.exports = router