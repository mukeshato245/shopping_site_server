const express = require('express')
require('dotenv').config()
const db = require('./database/connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute= require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')
const PaymentRoute = require('./routes/paymentRoute')

port = process.env.PORT || 8000
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', CategoryRoute)
app.use('/api', ProductRoute)
app.use('/api', UserRoute)
app.use('/api', OrderRoute)
app.use('/api', PaymentRoute)
app.use('/api/public/uploads', express.static('public/uploads'))

app.listen(port, ()=>{
    console.log(`App Started at port ${port}`)
})