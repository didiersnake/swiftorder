const userService = require("../services/userService");

module.exports = {
  findOne: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    try {
      const response = await userService.findOne(id);
      if (response === null || response === undefined) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error in userController.findOne: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  findAll: async (req, res) => {},

  getOrders: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    try {
      const response = await userService.getOrders(id);
      if (response === null || response === undefined) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error in userController.getOrders: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    const { name, email, phone, deliveryDay, roles } = req.body;
    if (!name || !email || !phone || !deliveryDay) {
      return res
        .status(400)
        .json({ message: "name, email, deliveryDay and phone are required" });
    }
    try {
      const response = await userService.create({
        name,
        email,
        phone,
        deliveryDay,
        roles,
      });
      if (response === null || response === undefined) {
        return res.status(400).json({ message: "user creation failed" });
      }
      return res.status(201).json(response);
    } catch (error) {
      //handle unique constraint error for phone number
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "phone number already exists" });
      } else {
        console.log("Error in userController.create: ", error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
  },
};
