const express = require('express');
const router = express.Router();
const { cartModel, validateCart } = require("../models/cart");
const { validateUser } = require("../middlewares/admin");
const { productModel } = require('../models/product');

router.get("/", validateUser, async (req, res) => {
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user }).populate("products");
        let cartDataStructure = {};
        cart.products.forEach(product => {
            let key = product._id.toString();
            if (cartDataStructure[key]) {
                cartDataStructure[key].quantity += 1;
            } else {
                cartDataStructure[key] = {
                    ...product._doc,
                    quantity: 1
                };
            }
        });
        let finalarray = Object.values(cartDataStructure);
        let finalprice = cart.totalPrice + 34;
        res.render("cart", { cart: finalarray, finalprice: finalprice, userid: req.session.passport.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/add/:id", validateUser, async (req, res) => {
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        let product = await productModel.findOne({ _id: req.params.id });
        
        if (!cart) {
            cart = await cartModel.create({
                user: req.session.passport.user,
                products: [req.params.id],
                totalPrice: Number(product.price)
            });
        } else {
            cart.products.push(req.params.id);
            cart.totalPrice = Number(cart.totalPrice) + Number(product.price);
            await cart.save();
        }
        res.redirect("/cart");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/remove/:id", validateUser, async (req, res) => {
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        let product = await productModel.findOne({ _id: req.params.id });
        
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        
        let index = cart.products.indexOf(req.params.id);
        if (index !== -1) {
            cart.products.splice(index, 1);
            cart.totalPrice = Number(cart.totalPrice) - Number(product.price);
            await cart.save();
        } else {
            return res.status(404).send("Product not found in cart");
        }
        
        res.redirect("/cart");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;