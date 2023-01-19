const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const Project = sequelize.define("project", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  linkRepo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idMp: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Project;
