const { orderModel, userModel, productModel } = require("../models");
const { normalizeNames } = require("../utils/helpers");
module.exports = {
  findOne: async (id) => {
    const response = await userModel.findOne({ where: { id } });
    return response;
  },

  create: async (data) => {
    const { name, phone } = data;
    const normalizedName = normalizeNames(name);
    data.name = normalizedName;
    data.phone = phone.trim();
    const response = await userModel.create(data);
    return response;
  },

  getOrders: async (userId) => {
    const response = await userModel.findByPk(userId, {
      include: [
        {
          model: orderModel,
          as: "orders",
          include: [{ model: productModel, as: "products" }],
        },
      ],
    });
    return response.orders;
  },

  findAll: async () => {
    const response = await userModel.findAll();
    return response;
  },
  update: async (id, data) => {},
  delete: async (id) => {},
};
