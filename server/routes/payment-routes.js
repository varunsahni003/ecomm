const express = require("express");

const PaymentController = require("../controllers/payment-controller");


const router = express.Router();

router.get("/buyNow/:id", function(req, res){
    PaymentController.buyNow(req, res)
});
router.get("/createOrderPremium", function(req, res){
    PaymentController.getPremiumPayment(req, res)
});
router.get("/createOrderUltimate", function(req, res){
    PaymentController.getUltimatePayment(req, res)
});

module.exports = router;
