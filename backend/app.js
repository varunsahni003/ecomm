const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quiz");
const productRoutes = require("./routes/product-routes");
const userRoutes = require("./routes/user-routes");
const paymentRoutes = require("./routes/payment-routes");
const cors = require("cors");

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
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;
