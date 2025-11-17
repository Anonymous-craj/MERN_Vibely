import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectToDB();
  console.log(`Server has started running at port:${port}`);
});
