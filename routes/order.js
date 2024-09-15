const express = require('express');
const { paymentModel } = require('../models/payment');
const { orderModel } = require('../models/order');
const { cartModel } = require('../models/cart');
const router = express.Router();

router.get("/:userid/:orderid/:paymentid/:signature", async (req, res) => {
    try {
        let paymentDetails = await paymentModel.findOne({ orderId: req.params.orderid });
        if (!paymentDetails) {
            return res.status(404).send("Sorry! This order does not exist");
        }
        if (req.params.signature === paymentDetails.signature && req.params.paymentid === paymentDetails.paymentId) {
            let cart = await cartModel.findOne({ user: req.params.userid });
            if (!cart) {
                return res.status(404).send("Cart not found");
            }
            await orderModel.create({
                orderId: req.params.orderid,
                user: req.params.userid,
                products: cart.products,
                totalPrice: cart.totalPrice,
                status: "processing",
                payment: paymentDetails._id,
            });
            res.redirect(`/map/${req.params.orderid}`);
        } else {
            res.status(400).send("Payment verification failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your order");
    }
});
router.post("/address/:orderid", async (req, res) => {
    let order = await orderModel.findOne({ _id: req.params.orderid });
    if (!order) {
        return res.status(404).send("Sorry! This order does not exist");
    }
    if (!req.body.address) {
        return res.status(400).send("Please provide an address");
    } order.address = req.body.address;
    await order.save();
    res.redirect("/");
});

module.exports = router;