const mongoose = require('mongoose');
const Joi = require('joi');

// Order Schema
const orderSchema = new mongoose.Schema({
    orderId:{
        type: String,
        required:true,

    } ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment",
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delivery"
    }
}, { timestamps: true });

// Joi Validation Schema
const validateOrder = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(), // ObjectId validation
        products: Joi.array().items(Joi.string().required()).required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(5).max(255),
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),
        payment: Joi.string().required(), // ObjectId validation
        delivery: Joi.string().optional() // ObjectId validation
    });
    return schema.validate(data);
};

// Export the model and validation function
module.exports = {
    orderModel: mongoose.model("order", orderSchema),
    validateOrder
};
