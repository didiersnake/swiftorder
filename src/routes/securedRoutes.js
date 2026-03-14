const express = require("express");
const v1 = express.Router();
const userController = require("../controllers/userController");

v1.post("/users/create", userController.create);
