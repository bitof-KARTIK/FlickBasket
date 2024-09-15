const express = require('express');
const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validateAdmin} = require('../middlewares/admin');
const { productModel } = require('../models/product');
const {categoryModel} = require('../models/category');
require("dotenv").config();
const router = express.Router();
if (typeof process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "DEVELOPMENT") {
    router.get("/create", async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash("admin", salt);
            let user = new adminModel({
                name: "Kartik Shah",
                email: "admin@blinkit.com",
                password: hash,
                role: "admin"
            });
            await user.save();
            let token = jwt.sign({ email: "admin@blinkit.com", admin: true }, process.env.JWT_KEY);
            res.cookie("token", token);
            res.send("Admin created");
        } catch (error) {
            res.send(error.message);
        }

    });
}
router.get("/login", (req, res) => {
    res.render("admin_login");
});
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let admin = await adminModel.findOne({ email })
    if (!admin) {
        return res.send("This admin is not available");
    }
    let valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
        return res.send("Invalid password");
    }

    let token = jwt.sign({ email: "admin@blinkit.com", admin: true }, process.env.JWT_KEY);
    res.cookie("token", token);
    res.redirect("/admin/dashboard");

});
router.get("/dashboard", validateAdmin, async (req, res) => {
    let prodCount = await productModel.countDocuments();
    let categoryCount = await categoryModel.countDocuments();
    res.render("admin_dashboard", { prodCount, categoryCount });
});
router.get("/products", validateAdmin, async (req, res) => {
    const resultArray = await productModel.aggregate([
        {
            $group: {
                _id: "$category",
                products: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                products: { $slice: ["$products", 10] }
            }
        },
    ]);
    const resultObject = resultArray.reduce((acc, item) => {
        acc[item.category] = item.products;
        return acc;
    }, {});

    res.render("admin_products", { products: resultObject });
});
router.get("/logout", validateAdmin, (req, res) => {
    res.cookie("token", "");
    res.redirect("/admin/login");

});
module.exports = router;