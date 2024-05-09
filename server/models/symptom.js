const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Symptom extends Model {}

Symptom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'symptom',
  }
);

module.exports = Symptom;
