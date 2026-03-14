const express = require("express");
const routes = express.Router();
const v1 = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

//TODO: add routes for users
v1.post("/users/create", userController.create);
v1.get("/users/:id", userController.findOne);
v1.get("/users/:id/orders", userController.getOrders);

//TODO: add routes for products
v1.get("/products", productController.findAll);
v1.get("/products/:id", productController.findOne);
v1.post("/products/create", productController.create);

//TODO: add routes for orders
v1.get("/orders", orderController.findAll);
v1.get("/orders/:id", orderController.findOne);
v1.post("/orders/create", orderController.create);
routes.use("/api", v1);
module.exports = routes;
