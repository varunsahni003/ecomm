const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quiz");

const app = express();

mongoose
  .connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true}) 
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!",e);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


/* Creating payment */
var instance = new Razorpay({
  key_id: 'rzp_test_2gEgPJl4OjDmwz',
  key_secret: 'QxSStKkhylgBBcsctg3DN4f9'
});

app.get("/createOrderBasic", (req, res) => {
  var options = {
         amount: 500,  // amount in the smallest currency unit
         currency: "USD",
     };
     instance.orders.create(options, function (err, order) {
         res.send(order);
     });
 });
 
 app.get("/createOrderPremium", (req, res) => {
  var options = {
         amount: 2000,  // amount in the smallest currency unit
         currency: "USD",
     };
     instance.orders.create(options, function (err, order) {
         res.send(order);
     });
 });
 
 app.get("/createOrderUltimate", (req, res) => {
  var options = {
         amount: 5000,  // amount in the smallest currency unit
         currency: "USD",
     };
     instance.orders.create(options, function (err, order) {
         res.send(order);
     });
 });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/quiz", quizRoutes);

module.exports = app;
