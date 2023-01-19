const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const Bug = sequelize.define("bug", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  severity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
  },
  idTst: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  idProject: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Bug;
