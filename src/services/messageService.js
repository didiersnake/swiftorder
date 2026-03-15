const { messageModel } = require("../models");

module.exports = {
  create: async (data) => {
    const response = await messageModel.create(data);
    return response;
  },
};
