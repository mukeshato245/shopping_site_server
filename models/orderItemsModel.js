/*
order - 
    orderItems - [id1, id2],
    user 
    total price
    shipping address
    phone
orderItems - product, quantity
*/

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderItemsSchema = mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("OrderItems", orderItemsSchema)