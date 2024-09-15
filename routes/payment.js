require('dotenv').config();
const { paymentModel } = require('../models/payment');
const { orderModel } = require('../models/order');
const { cartModel } = require('../models/cart');
const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create/orderId', async (req, res) => {
    const options = {
        amount: 5000 * 100, // amount in smallest currency unit
        currency: "INR",
    };
    try {
        const order = await razorpay.orders.create(options);
        res.send(order);
        
        await paymentModel.create({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: 'pending',
        });
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

router.post('/api/payment/verify', async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    try {
        const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js');
        
        const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
        if (result) {
            const payment = await paymentModel.findOne({ orderId: razorpayOrderId, status: 'pending' });
            payment.paymentId = razorpayPaymentId;
            payment.signature = signature;
            payment.status = 'completed';
            await payment.save();

            // Create order
            const userId = req.user._id; // Assuming you're using passport for authentication
            const cart = await cartModel.findOne({ user: userId });
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Cart not found' });
            }

            const order = await orderModel.create({
                orderId: razorpayOrderId,
                user: userId,
                products: cart.products,
                totalPrice: cart.totalPrice,
                status: "processing",
                payment: payment._id,
            });

            // Clear the cart
            await cartModel.findOneAndDelete({ user: userId });

            res.json({
                status: 'success',
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: signature,
                redirectUrl: `/map/${order._id}`
            });
        } else {
            res.status(400).json({ status: 'failure', message: 'Invalid signature' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
});

module.exports = router;