const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);

module.exports = router;