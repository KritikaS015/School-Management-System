import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Routes from "./routes/route.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use("/", Routes);

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
