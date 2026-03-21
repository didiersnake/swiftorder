const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("connect", () => {
  //
});

client.on("error", () => {
  //
});

client
  .connect()
  .then(() => console.log(" Redis client connected", process.env.REDIS_URL))
  .catch((error) => {
    console.log("Redis client connection failed : ", error);
  });

module.export = client;
