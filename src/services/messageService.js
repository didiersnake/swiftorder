const axios = require("axios");
const { messageModel, sequelize, userModel } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create: async (data) => {
    const response = await messageModel.create(data);
    return response;
  },

  getMessageUser: async (number) => {
    const phone = number.split("@")[0]; //get phone from webhook payload
    //match last 8 digits from phone to search user in database
    const userId = await userModel.findOne({
      where: sequelize.where(
        sequelize.fn("RIGHT", sequelize.col("phone"), 8),
        Op.eq,
        phone.slice(-8),
      ),
    });
    if (!userId) return null;
    return userId;
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
