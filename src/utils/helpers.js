const crypto = require("crypto");

module.exports = {
  normalizeNames: (name) => {
    let parts = name.split(" ");
    parts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    );
    return parts.join(" ");
  },

  verifyWebhookSignature: (payload, signature, secret) => {
    const clientSignature = signature.replace("sha256=", "");
    const mySignature = crypto
      .createHmac("sha256", secret)
      .update(payload, "utf-8")
      .digest("hex");

    const a = Buffer.from(clientSignature, "hex");
    const b = Buffer.from(mySignature, "hex");
    if (a.length !== b.length) return false;

    return crypto.timingSafeEqual(a, b);
  },
};
