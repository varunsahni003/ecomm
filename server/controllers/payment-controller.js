const Razorpay = require("razorpay");

var instance = new Razorpay({
    key_id: 'rzp_test_2gEgPJl4OjDmwz',
    key_secret: 'QxSStKkhylgBBcsctg3DN4f9'
});

exports.buyNow = (req, res) => {
  // lean() - converts to json
  var options = {
    amount: req.params.id,  // amount in the smallest currency unit
    currency: "INR",
    };
    instance.orders.create(options,(error,order)=>{
        if(error){
            console.log(error);
        } else {
            res.send(order);
        }
     });
    // instance.orders.create(options, function (err, order) {
    //     res.send(order);
    // });
};

exports.getPremiumPayment = (req, res) => {
    var options = {
        amount: 2000,
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        res.send(order);
    });
};

exports.getUltimatePayment = (req, res) => {
    var options = {
        amount: 5000,
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        res.send(order);
    });
};
