const Order = require('../models/orderModel')
const OrderItems = require('../models/orderItemsModel')

exports.placeOrder = async (req, res) => {
    const orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItem => {
            let orderItem2 = new OrderItems({
                product: orderItem.product,
                quantity: orderItem.quantity
            })
            orderItem2 = await orderItem2.save()
            if (!orderItem2) {
                return res.status(400).json({ error: "failed to place order" })
            }
            return orderItem2._id
        })
    )

    // 


    // calculate totalPrice
    let individualTotal = await Promise.all(
        orderItemsIds.map(async orderItem => {
            const itemOrder = await OrderItems.findById(orderItem).populate('product', 'product_price')
            const total = itemOrder.quantity * itemOrder.product.product_price
            return total
        })
    )

    let totalPrice = individualTotal.reduce((acc, cur) => acc + cur)

    /*
    array = [4,5,6,7,8,9]
    array.reduce((accumulator, current_index)=>{
        return accumulator + current_index
    })
    1st - acc - 4, curr- 5 return 4+5:9
    2nd - acc - 9, curr - 6 return 9+6: 15
            acc - 30 curr - 9 return 30+9: 39
    */

    let order = new Order({
        orderItems: orderItemsIds,
        user: req.body.user,
        totalAmount: totalPrice,
        shipping_address: req.body.shipping_address,
        alternate_shipping_address: req.body.alternate_shipping_address,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        zipcode: req.body.zipcode,
    })
    order = await order.save()
    if (!order) {
        return res.status(400).json({ error: "failed to place order." })
    }
    res.send(order)
}
// orderItems : [{samsungID, 5}, {appleID, 3}]
// individualTotal : [xyz, abc]

exports.viewOrders = async (req, res) => {
    let orders = await Order.find().populate('user', 'username')
    if (!orders) {
        return res.status(400).json({ error: "Something went wrond" })
    }
    res.send(orders)
}

// order details
exports.orderDetails = async (req, res) => {
    let order = await Order.findById(req.params.id).populate('user', 'username')
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(order)
}

// to find orders of a user
exports.userOrders = async (req, res) => {
    let order = await Order.find({ user: req.params.userId }).populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(order)
}

// to update order
exports.updateOrder = async (req, res) => {
    let order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    },
        { new: true })
    if (!order) {
        return res.status(400).json({ error: "failed to update user" })
    }
    res.send(order)
}

// to delete order
exports.deleteOrder =async (req, res) => {
    let order = await Order.findByIdAndRemove(req.params.orderId)
    if (!order) {
        return res.status(400).json({ error: "Order not found" })
    }
    else {
        let orderitems = await Promise.all(order.orderItems.map(async orderItem => await OrderItems.findByIdAndDelete(orderItem)))
        if(!orderitems){
            return res.status(400).json({error:"Failed to delete order"})
        }
        else{
            return res.status(200).json({message: "Order deleted Successfully"})
        }
    }          

}

