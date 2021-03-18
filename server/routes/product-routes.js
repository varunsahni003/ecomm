const express = require("express");

const ProductController = require("../controllers/product-controller");


const router = express.Router();

router.post("/createProduct", function(req, res, next){
    ProductController.createProduct(req, res, next)
});

router.put('/updateProduct/:productId', function(req, res, next) {
    ProductController.updateProduct(req, res, next);
});

router.get("/products/:productId", function(req, res){
    ProductController.getProducts(req, res)
});

router.delete("/deleteProduct/:productId", function(req, res){
    ProductController.deleteProduct(req, res)
});

router.get("/products", function(req, res){
    ProductController.getAllProducts(req, res)
});

router.get("/products/category/:category", function(req, res){
    ProductController.getProductsByCategory(req, res)
});

// router.get("/:id", function(req, res){
//     ProductController.getPost
// });

module.exports = router;
