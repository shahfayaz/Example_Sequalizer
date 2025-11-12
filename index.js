require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/models');
const userRoutes = require('./src/routes/user.routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Sync database and start server
const PORT = process.env.PORT || 4010;
// db.sequelize.sync({force: false, alter: true}).then(() => {
  app.listen(PORT, () => {
    db.sequelize.sync({force: false, alter: true});
    console.log(`Server is running on port ${PORT}`);
  });
// });