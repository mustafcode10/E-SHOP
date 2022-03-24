const express = require("express");
const app = express();
require("dotenv/config");
const api = process.env.API_URL;
const morgan = require("morgan"); // logging API's
const mongoose = require("mongoose");
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const path = require("path");

// Middleware to allow you http request from any origin
app.use(cors());
app.options("*", cors()); // allow all origins

// Middleware
app.use(express.json()); // data interchanges and human readable and writable
app.use(morgan("tiny")); // logging api
app.use(authJwt()); // Protect api routes and authentication jwt token
app.use('/public/uploads', express.static(__dirname + "/public/uploads"));
app.use(errorHandler) // Error handler




// Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Successfully connected to Database string");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000/");
});
 