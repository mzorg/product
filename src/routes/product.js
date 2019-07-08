const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.post('/products', productController.createProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;