const Product = require("../models/product-model");

// Create a new product
exports.createProduct = (req, res, next) => {
  const product = {
    productId: req.body.productId,
    name: req.body.name,
    cost: req.body.cost,
    discount: req.body.discount,
    images: req.body.images,
    size: req.body.size,
    color: req.body.color,
    stock: req.body.stock,
    description: req.body.description,
    rating: req.body.rating,
    rating_count: req.body.rating_count,
    reviews: req.body.reviews,
    return: req.body.return,
    promoCodes: req.body.promoCodes,
    brand: req.body.brand,
    deliveryCharge: req.body.deliveryCharge,
    availableSize: req.body.availableSize,
    sponsored: req.body.sponsored
  };
  const productId = req.body.productId;
  // if(req.body.uniqueId) {
  //   const uniqueId = req.body.uniqueId;
  // }
  // upsert: true, if data is not there, it will create
  Product
    .updateOne({productId}, product, {upsert: true})
    .then(() => {
      res.status(201).json({
        message: "Product added successfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: {
          "failed"  : "Adding a product failed!",
          "error"   : error
        }
      });
    });
};

exports.updateProduct = (req, res, next) => {
  // upsert: true, if data is not there, it will create
  Product
    .updateOne({"productId": req.params.productId}, req.body)
    .then(() => {
      res.status(201).json({
        message: "Product updated successfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: {
          "failed"  : "Updating a product failed!",
          "error"   : error
        }
      });
    });
};


exports.getProducts = (req, res) => {
  // lean() - converts to json
  Product.findOne({"productId": req.params.productId}).lean()
    .then(productData => {
      res.status(200).json({
        reviewData: productData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching product data failed!",
        error: error
      });
    });
};

exports.deleteProduct = (req, res) => {
  Product.deleteOne({"productId": req.params.productId})
    .then(result => {
      res.status(200).json({
        msg: 'Product deleted successful'
      })
    }).catch(error => {
        res.status(500).json({
        message: "Deleting product failed!",
        error: error
      });
    });
}

exports.getAllProducts = (req, res) => {
  Product.find().lean()
    .then(productData => {
      res.status(200).json({
        reviewData: productData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching product data failed!",
        error: error
      });
    });
};

exports.getProductsByCategory = (req, res) => {
  Product.find({"category": req.params.category}).lean()
    .then(productData => {
      res.status(200).json({
        reviewData: productData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching product data failed!",
        error: error
      });
    });
};