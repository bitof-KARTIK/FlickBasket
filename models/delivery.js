const mongoose = require('mongoose');
const Joi = require('joi');

// Delivery Schema
const deliverySchema = new mongoose.Schema({
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "order",
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    status: { 
        type: String, 
        enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
        required: true
    },
    trackingURL: {
        type: String,
    },
    estimatedDeliveryTime: { 
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

// Joi Validation Schema
const validateDelivery = (data) => {
    const schema = Joi.object({
        order: Joi.string().regex(/^[a-f\d]{24}$/i).required(), // ObjectId validation
        deliveryBoy: Joi.string().min(3).max(50).required(),
        status: Joi.string().valid('pending', 'in_transit', 'delivered', 'cancelled').required(),
        trackingURL: Joi.string().uri(),
        estimatedDeliveryTime: Joi.number().min(0).required()
    }).unknown(true);

    return schema.validate(data);
};

// Export the model and validation function
module.exports = {
    deliveryModel: mongoose.model("delivery", deliverySchema),
    validateDelivery
};
