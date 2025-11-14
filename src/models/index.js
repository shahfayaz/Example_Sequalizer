const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/dbConnection.js")[env];
const Temporal = require("sequelize-temporal");

const Redis = require("ioredis");
const redis = new Redis({
  host: "localhost",
  port: 6379,
  password: "PingPongQDX2256",
});

const RedisAdaptor = require("sequelize-transparent-cache-ioredis");
const redisAdaptor = new RedisAdaptor({
  client: redis,
  namespace: "model",
  lifetime: 60 * 60,
});

const sequelizeCache = require("sequelize-transparent-cache");
const { withCache } = sequelizeCache(redisAdaptor);

const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
// Register and wrap your models:
// withCache() will add cache() methods to all models and instances in sequelize v4
// const User = withCache(sequelize.import('./models/user'))

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    withCache(model);
    // Temporal(model, sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
