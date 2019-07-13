const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const authorize = require('../middleware/authorize');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', [isAuth, authorize(['Admin'])], productController.updateProduct);
router.post('/products', [isAuth, authorize(['Admin'])], productController.createProduct);
router.delete('/products/:id', [isAuth, authorize(['Admin'])], productController.deleteProduct);

module.exports = router;