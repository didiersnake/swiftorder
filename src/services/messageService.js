const axios = require("axios");
const { messageModel } = require("../models");

module.exports = {
  create: async (data) => {
    const response = await messageModel.create(data);
    return response;
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
