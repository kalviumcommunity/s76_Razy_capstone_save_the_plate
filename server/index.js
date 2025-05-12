require("dotenv").config();
const express = require("express");
const connection = require("./db");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

connection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "API is running!" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
