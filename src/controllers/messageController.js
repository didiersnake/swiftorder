const messageService = require("../services/messageService");
const crypto = require("crypto");
const { verifyWebhookSignature } = require("../utils/helpers");
const redis_client = require("../../config/redis");
module.exports = {
  findOne: async (req, res) => {},

  findAll: async (req, res) => {
    const response = await messageService.findAll();
    return response;
  },

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
      const response = await messageService.create({ userId, data });
      if (response === null || response === undefined) {
        return res.status(400).json({ message: "message creation failed" });
      }
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error messageController.create: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  whatsappWebhook: async (req, res) => {
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
        const payload = data.payload;
        console.log("New message:", {
          id: payload.id,
          from: payload.from,
          body: payload.body,
          chat_id: payload.chat_id,
        });

        try {
          const user = await messageService.getMessageUser(payload.from);
          if (user === null || user === undefined) {
            console.log("Error messageController.webhook: ", "user not found");
          } else {
            if (payload?.body.length < 3) {
              await redis_client.set(payload?.from, payload?.body);
            }

            const userId = user.id;
            const response = await messageService.create({ userId, data: payload });
            if (response === null || response === undefined) {
              console.log("Error messageController.webhook: ", "message creation failed");
            }
          }
        } catch (error) {
          console.log("Error messageController.webhook: ", error);
        }
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
