const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// send stripe to front end
exports.sendStripeKey = (req, res) => {
    res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY, success: true})
}

// payment processing
exports.processPayment = async (req, res) => {
    const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'npr',
        metadata: {integration_check:"accept_a_payment"}
    })
    res.status(200).json({
        client_secret: payment.client_secret,
        success: true
    })
}