const sequelize = require("./database/db");

//referinta catre tabelele create
const User = require("./modules/user");
const Bug = require("./modules/bug");
const Project = require("./modules/project");

sequelize
  .sync({ force: true }) // drop table cascade constraints
  .then(() => {
    console.log("The tables have been created...");
  })
  .catch((err) => {
    console.warn(err);
  });
