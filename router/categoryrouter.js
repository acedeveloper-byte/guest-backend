const express = require("express");
const { CreateNewCategory, GetNewCategory } = require("../controller/category");
const upload = require("../middleware/catMulter");

const catrouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *         - categoryStatus
 *       properties:
 *         categoryName:
 *           type: string
 *           description: The unique name of the category.
 *         categoryImage:
 *           type: string
 *           description: URL of the category image (default is 'default-category.png').
 *         categoryStatus:
 *           type: boolean
 *           description: Status of the category (true = active, false = inactive).
 *       example:
 *         categoryName: "Electronics"
 *         categoryImage: "file-category.jpg"
 *         categoryStatus: true
 */

/**
 * @swagger
 * /category/create-new-category:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category with an image and status.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               categoryName:
 *                 type: string
 *               categoryStatus:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request - Missing required fields or invalid data
 */
catrouter.post("/create-new-category", upload.single("file"), CreateNewCategory);

/**
 * @swagger
 * /category/fetch-all-category:
 *   get:
 *     summary: Fetch all categories
 *     description: Returns a list of all categories.
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 */
catrouter.get("/fetch-all-category", GetNewCategory);

module.exports = catrouter;
