const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const db = require("./config/postgres");
const publicRoutes = require("./src/routes/publicRoutes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/webhook", express.raw({ type: "application/json" })); //Read webhook request.body as raw bytes first
app.use(bodyParser.json()); //Then read / convert to javascript object

const PORT = process.env.PORT;

app.use(publicRoutes);

db
  .sync
  //{ alter: true }
  ()
  .then(() => {
    console.log("db sync successfull");
  })
  .catch((err) => {
    console.log("Error connecting DB: ", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
