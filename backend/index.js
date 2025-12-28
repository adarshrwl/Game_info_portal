const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("Status Okay!!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const authroutes = require("./routes/authRoutes");
app.use("/auth", authroutes);

