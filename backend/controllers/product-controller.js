const Product = require("../models/product-model");

// Create a new product
exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    images: req.body.images,
    size: req.body.size,
    color: req.body.color,
    cost: req.body.cost,
    discount: req.body.discount,
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
  });
  // if(req.body.uniqueId) {
  //   const uniqueId = req.body.uniqueId;
  // }
  // upsert: true, if data is not there, it will create
  product
    .save({upsert: true})
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
  // if(req.body.uniqueId) {
  //   const uniqueId = req.body.uniqueId;
  // }
  // upsert: true, if data is not there, it will create
  Product
    .findByIdAndUpdate(req.params.id, {$set: req.body})
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
  
  // Product.findById(req.params.id, function (err, product) {
  //   if (err) return next(err);
  //   res.send(product);
  // })

  Product.findOne({"_id": req.params.id}).lean()
    .then(productData => {
      res.status(200).json({
        reviewData: productData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching product data failed!"
      });
    });
};

exports.deleteProduct = (req, res) => {
  // Product.findByIdAndRemove(req.params.id, function (err) {
  //   if (err) return next(err);
  //   res.send('Deleted successfully!');
  // })
  Product.deleteOne({"_id": req.params.id})
    .then(result => {
      res.status(200).json({
        msg: 'Product deleted successful'
      })
    }).catch(e=>console.log(e));
}