const mongoose = require("mongoose")

const categoryschema = new mongoose.Schema({

    categoryName: { type: String, required: true },
    categoryImage: { type: String },
    categoryStatus: { type: Boolean, required: true }

}, { timestamps: true })


const CategoryModel = mongoose.model("Category", categoryschema);

module.exports = CategoryModel;