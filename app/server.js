const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    application: "DevOps Pipeline Demo",
    version: process.env.APP_VERSION || "1.0.0",
    status: "running",
    message: "End-to-end DevOps pipeline is working!"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/ready", (req, res) => {
  res.status(200).json({ status: "ready" });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DevOps app listening on port ${PORT}`);
  });
}

module.exports = app;
