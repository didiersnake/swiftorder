const axios = require("axios");
const { messageModel, sequelize, userModel, productModel } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create: async (data) => {
    const response = await messageModel.create(data);
    return response;
  },

  findAll: async () => {
    const response = await messageModel.findAll();
    return response;
  },

  getMessageUser: async (number) => {
    //match last 8 digits from phone to search user in database
    const userId = await userModel.findOne({
      where: sequelize.where(
        sequelize.fn("RIGHT", sequelize.col("phone"), 8),
        Op.eq,
        number.slice(-8),
      ),
    });
    if (!userId) return null;
    return userId;
  },

  buildOrder: async (data) => {
    const rows = data.split("\n");

    const result = await Promise.all(
      rows.map(async (el) => {
        const splitValue = /\s*x\s*/i;
        let [id, quantity] = el.split(splitValue);
        let productId = parseInt(id);

        const product = await productModel.findOne({ where: { id: productId } });
        if (!product) {
          return null;
        }
        return { product_name: product.name, quantity: quantity };
      }),
    );
    return result.filter(Boolean); //filter out null
  },

  sendMessage: async ({ message, phone }) => {
    const send = await axios.post(process.env.WHATSAPP_BASE_URL + "/send/message", {
      message,
      phone,
    });
    if (!send) {
      return { message: "Message failed to send to " + `${phone}` };
    }
    return { message: "Message to send to " + `${phone}` + "successfully" };
  },
};
