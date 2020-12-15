const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quiz");
const productRoutes = require("./routes/product-routes");
const userRoutes = require("./routes/user-routes");
const paymentRoutes = require("./routes/payment-routes");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const config = require('./config/config');
const passportMiddleware = require('./middleware/passport');
const passport = require('passport');

const app = express();

mongoose
  .connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true}) 
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!",e);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);


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
app.use("/api/auth", authRoutes);

module.exports = app;
