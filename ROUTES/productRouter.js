const productBL = require("../BL/productBL");
const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const {
  isRelationshipBetweenProductAndUser,
} = require("../middleware/productOwners");
const { validToken } = require("../middleware/auth");
// const { validToken } = require("../middleware/auth");
// const {
//   isRelationshipBetweenProductAndUser,
// } = require("../middleware/contactTest");

/**
 * @description Get all products
 * @route GET /products/:categiry
 * @access Public
 * @param {object} req.params - params
 * @param {string} req.params.category - category for product
 * @param {Object} req.body - Product filtering
 * @returns {Array} All products by category
 */
router.get(
  "/:category",
  asynchandler(async (req, res) => {
    const { category } = req.params;
    const filter = req.body;
    const products = await productBL.read(category, filter);
    res.send(products);
  })
);

/**
 * @description Get product by id
 * @route GET /products/:id
 * @access Public
 * @param {object} req.params - params
 * @param {string} req.params.category - category for product
 * @param {string} req.params.id - Id of product
 * @returns {Object} Product
 */
router.get(
  "/:category/:id",
  asynchandler(async (req, res) => {
    const { category, id } = req.params;
    const product = await productBL.readById(category, id);
    res.send(product);
  })
);

/**
 * @description Change product details by id
 * @route PUT /products/:id
 * @access Private/user
 * @param {object} req.params - params
 * @param {string} req.params.category - category for product
 * @param {string} req.param.id - Id of product
 * @param {Object} req.body - New product details
 * @returns {Object} Product details after the change
 */
router.put(
  "/:category/:id",
  validToken,
  isRelationshipBetweenProductAndUser,
  asynchandler(async (req, res) => {
    const { category, id } = req.params;
    const data = req.body;
    const updatedProduct = await productBL.updateById(category, id, +data);
    res.send(updatedProduct);
  })
);

/**
 * @description Product deletion
 * @route DELETE /products/:id
 * @access Private/user
 * @param {object} req.params - params
 * @param {string} req.params.category - category for product
 * @param {string} req.params.id - Id of product
 * @returns {Object} Deleted product details
 */
router.delete(
  "/:category/:id",
  validToken,
  isRelationshipBetweenProductAndUser,
  asynchandler(async (req, res) => {
    const { category, id } = req.params;
    const deleteProduct = await productBL.deleteById(category, id);
    res.send(deleteProduct);
  })
);

module.exports = router;
