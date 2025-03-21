const CategoryModel = require("../models/CategoryModel");

const CreateNewCategory = async (req, res) => {
    try {
        const { categoryName, categoryStatus } = req.body;

        // Validate input fields
        if (!categoryName || categoryName.trim() === "" || categoryStatus === undefined) {
            return res.status(400).json({
                baseResponse: { message: "BAD_REQUEST", status: 0 }
            });
        }

        // Create new category
        const newCategory = new CategoryModel({
            categoryName: categoryName.trim(),
            categoryStatus,
            categoryImage: req.file.filename
        });

        // Save to database
        await newCategory.save();

        return res.status(201).json({
            baseResponse: { message: "CATEGORY_CREATED", status: 1 },
            response: newCategory
        });

    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 },
            error: error.message
        });
    }
};

const GetNewCategory = async (req, res) => {


    const findAll = await CategoryModel.find({})
    if (findAll.length !== 0) {
        return res.status(200).json({ baseResponse: { message: "FETCHED ALL CATEGORIES", status: 1 }, response: findAll })
    } else {
        return res.status(200).json({ baseResponse: { message: "SOMETHING_WENT_WRONG", status: 0 } })
    }
}

module.exports = { CreateNewCategory, GetNewCategory };
