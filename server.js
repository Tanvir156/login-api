const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
// const cors = require("cors");
dotenv.config();
mongoose.set("strictQuery", true);
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log("server running at port 5000"));
