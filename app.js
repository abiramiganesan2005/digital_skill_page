const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Message = require("./models/Message");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/contactDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Contact Form Backend is running."));

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields required." });
    }
    const newMsg = new Message({ name, email, message });
    await newMsg.save();
    res.status(201).json({ success: true, message: "Message saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
