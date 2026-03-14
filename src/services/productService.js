const { productModel } = require("../models");
const { normalizeNames } = require("../utils/helpers");

module.exports = {
  findOne: async (id) => {
    const response = await productModel.findOne({ where: { id } });
    return response;
  },

  create: async (data) => {
    const { name } = data;
    const normalizedName = normalizeNames(name);
    data.name = normalizedName;
    const response = await productModel.create(data);
    return response;
  },

  findAll: async () => {
    const response = await productModel.findAll();
    return response;
  },

  update: async (id, data) => {},

  delete: async (id) => {},
};
