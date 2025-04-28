const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
dotenv.config();

connectDB();
const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
