const orderService = require("../services/orderService");

module.exports = {
  findOne: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    try {
      const response = await orderService.findOne(id);
      if (response === null || response === undefined) {
        return res.status(404).json({ message: "order not found" });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error in orderController.findOne: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  buidOrderRequestFromText: async (req, res) => {
    const { phone, data } = req.body;
    if (!phone || !data) {
      return res
        .status(400)
        .json({ message: "sender's phone and message data  are required" });
    }
    try {
      const response = await orderService.buidOrderRequestFromText({ phone, data });
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error in orderController.buildRequestFromText: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  findAll: async (req, res) => {
    try {
      const response = await orderService.findAll();
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error in orderController.findAll: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    //Create order if does not exist else update
    const { userId, items } = req.body;
    if (!userId || !items || !Array.isArray(items || items.length === 0)) {
      return res.status(400).json({ message: "user, items are required" });
    }

    try {
      //Check if user has an existing order for current date
      const order = await orderService.findExistingOrderByDate(new Date(), userId);

      if (order) {
        console.log(order.id);

        const response = await orderService.update(order.id, items);
        if (response === undefined || response === null) {
          return res.status(404).json({ message: "order failed to update" });
        }
        return res.status(201).json(response);
      }

      const response = await orderService.create({ userId, items });
      if (response === undefined || response === null) {
        return res.status(404).json({ message: "order failed to create" });
      }
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error in orderControll.create: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {},

  delete: async (req, res) => {},
};
