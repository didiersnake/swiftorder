const messageService = require("../services/messageService");
const crypto = require("crypto");
const { verifyWebhookSignature } = require("../utils/helpers");
module.exports = {
  findOne: async (req, res) => {},

  findAll: async (req, res) => {},

  sendMessage: async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message)
      return res.status(400).json({ message: "phone and message are required" });

    try {
      const response = await messageService.sendMessage({ phone, message });
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error messageController.sendMessage: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    const { data, userId } = req.body;
    if (!data || !userId) {
      return res.status(400).json({ message: "data is required" });
    }
    try {
      const response = await messageService.create(data);
      if (response === null || response === undefined) {
        return res.status(400).json({ message: "message creation failed" });
      }
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error messageController.create: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  whatsappWebhook: (req, res) => {
    const signature = req.headers["x-hub-signature-256"];
    const payload = req.body;
    const secret = process.env.WHATSAPP_WEBHOOK_SECRET;
    // Verify webhook
    if (verifyWebhookSignature(payload, signature, secret)) {
      return res.status(401).send("Unauthorized");
    }

    // Parse and process webhook data
    const data = JSON.parse(payload);

    // Handle different event types based on data.event
    switch (data.event) {
      case "message":
        console.log("New message:", {
          id: data.payload.id,
          from: data.payload.from,
          body: data.payload.body,
          chat_id: data.payload.chat_id,
        });
        break;

      case "message.ack":
        console.log(`Message ${data.payload.receipt_type}:`, {
          chat_id: data.payload.chat_id,
          message_ids: data.payload.ids,
          description: data.payload.receipt_type_description,
        });
        break;
    }

    res.status(200).send("OK");
  },

  update: async (req, res) => {},
  delete: async (req, res) => {},
};
