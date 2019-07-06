const Product = require('../models/product');

// =====================
// Get all products
// =====================
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            // Return created product
            return res.json({
                ok: true,
                data: products
            });
        })
        .catch(err => {
            // If there was a error
            return res.status(500).json({
                ok: false,
                msj: 'Error getting Product',
                errors: err
            });
        });
};

// =====================
// Create a product
// =====================
exports.createProduct = (req, res, next) => {
    var body = req.body; // parse body request
    // Create a new Product
    var product = new Product({
        title: body.title,
        description: body.description,
        price: parseInt(body.price, 10),
        imageUrl: body.imageUrl,
        userId: body.userId || "test"
    });
    // Save created product
    product.save(
        (err, productDB) => {
        // if there was a error
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error creating Product',
                errors: err
            });
        // return created product
        return res.json({
            ok: true,
            data: productDB
        });
    });
};