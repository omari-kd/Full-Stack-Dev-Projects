const product = require("../models/product");
const Product = require("../models/product");

/**
 * Create Product
 */

const createProduct = async (req, res, next) => {
  try {
    const { productName, productImage, productPrice, productDescription } =
      req.body;

    if (!productName || !productImage || !productPrice || !productDescription) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists"
      });
    }

    const product = await Product.create({
      productName,
      productImage,
      productPrice,
      productDescription
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products
 */

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Product
 */

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id).select("productName createdAt");

    if (!product) {
      return res.status(404).json({
        messsage: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Update Product
 */
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { productName, productImage, productPrice, productDescription } =
      req.body;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let updatedData = {
      productName,
      productImage,
      productPrice,
      productDescription
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true
    }).select("productName createdAt");

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Product
 */
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
