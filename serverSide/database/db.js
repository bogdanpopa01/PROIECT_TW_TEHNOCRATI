const Sequelize = require("sequelize");

// configurare baza de date
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/db.db",
});

module.exports = sequelize;
