const mongoose = require('mongoose');
const Joi = require('joi');

// Admin Schema
const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 50 
    },
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
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    role: { 
        type: String, 
        required: true,
        enum: ['admin', 'superadmin'],
    }
}, { timestamps: true });

// Joi Validation Schema
const validateAdmin = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid('admin', 'superadmin').required(),
    });

    return schema.validate(data);
};

// Export the model and validation function
module.exports = {
    adminModel: mongoose.model("admin", adminSchema),
    validateAdmin
};
