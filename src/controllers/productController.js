const productService = require("../services/productService");
module.exports = {
  findOne: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    try {
      const response = await productService.findOne(id);
      if (response === null || response === undefined) {
        return res.status(404).json({ message: "product not found" });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error in productController.findOne: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "name and price are required" });
    }
    try {
      const response = await productService.create({ name, price });
      if (response === null || response === undefined) {
        return res.status(400).json({ message: "product creation failed" });
      }
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error in productController.create: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  findAll: async () => {},

  update: async (id, data) => {},

  delete: async (id) => {},
};
