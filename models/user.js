const mongoose = require('mongoose');
const Joi = require('joi');

// Address Schema
const addressSchema = new mongoose.Schema({
    state: { type: String, required: true },
    zip: { type: Number, required: true, min: 10000, max: 999999 },
    city: { type: String, required: true },
    address: { type: String, required: true },
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: { type: String ,minlength: 6 },
    phone: { type: Number, min: 1000000000, max: 9999999999 },
    addresses: [addressSchema],
}, { timestamps: true });

// Joi Validation Schema
const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().email().required(),
        password: Joi.string().min(6),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        phone: Joi.number().integer().positive().min(1000000000).max(9999999999),
        addresses: Joi.array().items(
            Joi.object({
                state: Joi.string().required(),
                zip: Joi.number().integer().positive().min(10000).max(99999).required(),
                city: Joi.string().required(),
                address: Joi.string().required()
            })
        )
    });

    return schema.validate(data);
};

// Export the model and validation function
module.exports = {
    userModel: mongoose.model("user", userSchema),
    validateUser
};