const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5007;

app.get("/", (req, res) => {
  const token = jwt.sign({ user: "admin" }, "secretKey", { expiresIn: "1h" });
  res.json({ message: "Server running", token });
});

app.listen(PORT, () => {
  console.log("Server started on port 5007");
});