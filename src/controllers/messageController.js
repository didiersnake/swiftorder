const messageService = require("../services/messageService");
const crypto = require("crypto");
const { verifyWebhookSignature } = require("../utils/helpers");
module.exports = {
  findOne: async (req, res) => {},

  findAll: async (req, res) => {},

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
    // console.log("Received webhook:", data);

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

      case "message.reaction":
        console.log("Reaction:", {
          reaction: data.payload.reaction,
          reacted_message_id: data.payload.reacted_message_id,
        });
        break;

      case "message.revoked":
        console.log("Message revoked:", data.payload.revoked_message_id);
        break;

      case "message.edited":
        console.log("Message edited:", {
          original_id: data.payload.original_message_id,
          new_body: data.payload.body,
        });
        break;

      case "message.ack":
        console.log(`Message ${data.payload.receipt_type}:`, {
          chat_id: data.payload.chat_id,
          message_ids: data.payload.ids,
          description: data.payload.receipt_type_description,
        });
        break;

      case "group.participants":
        console.log(`Group ${data.payload.type} event:`, {
          chat_id: data.payload.chat_id,
          affected_users: data.payload.jids,
        });
        break;
    }

    res.status(200).send("OK");
  },

  update: async (req, res) => {},
  delete: async (req, res) => {},
};
