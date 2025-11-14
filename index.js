require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/models");
const userRoutes = require("./src/routes/user.routes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  const uptimeInSeconds = process.uptime();

  // Convert uptime into days, hours, minutes, and seconds
  const days = Math.floor(uptimeInSeconds / (60 * 60 * 24));
  const hours = Math.floor((uptimeInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((uptimeInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  res.status(200).json({
    message: "this is the sequlizer testing example.",
    data: {
      status: "ok",
      uptime: formattedUptime,
      timestamp: new Date().toISOString(),
      platform: req.get("host"),
      from: "Shahfayaz Khan",
    },
    routes: {
      users: `${req.protocol}://${req.get("host")}/api/users`,
      posts: `${req.protocol}://${req.get("host")}/api/posts`,
      comments: `${req.protocol}://${req.get("host")}/api/comments`,
      pagination: `${req.protocol}://${req.get("host")}/api/user/pagination`,
      cache: `${req.protocol}://${req.get("host")}/api/user/cache`,
      delete: `${req.protocol}://${req.get("host")}/api/user/delete`,
    },
  });
});

// app.use("*", (req, res) => {
//   res.status(404).json({ message: "this is the sequlizer testing example." });
// })

// Sync database and start server
const PORT = process.env.PORT || 4010;
// db.sequelize.sync({force: false, alter: true}).then(() => {
app.listen(PORT, () => {
  db.sequelize.sync({ force: false, alter: true });
  console.log(`Server is running on port ${PORT}`);
});
// });
