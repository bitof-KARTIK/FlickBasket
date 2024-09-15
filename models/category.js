const mongoose = require('mongoose');
const Joi = require('joi');

// Category Schema
const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        minlength: 2,
        maxlength: 50,
    }
}, { timestamps: true });

// Joi Validation Schema
const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50)
    });

    return schema.validate(data);
};

// Export the model and validation function
module.exports = {
    categoryModel: mongoose.model("category", categorySchema),
    validateCategory
};
