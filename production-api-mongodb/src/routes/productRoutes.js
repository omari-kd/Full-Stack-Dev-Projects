const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * /api/products/create-product:
 *   post:
 *     summary: Create product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productImage
 *               - productPrice
 *               - productDescription
 *             properties:
 *               productName:
 *                 type: string
 *               productImage:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/create-product", createProduct);

/**
 * @swagger
 * /api/products/get-products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/get-products", getProducts);

/**
 * @swagger
 * /api/products/get-product/{id}:
 *   get:
 *     summary: Get single product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single product
 *       404:
 *         description: Product not found
 */
router.get("/get-product/:id", getProductById);

/**
 * @swagger
 * /api/products/update-product/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productImage:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/update-product/:id", updateProduct);

/**
 * @swagger
 * /api/products/delete-product/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
