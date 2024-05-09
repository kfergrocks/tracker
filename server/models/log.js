const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a valid Date',
        },
      },
    },
    symptoms: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide symptoms.',
        },
      },
    },
    triggers: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide triggers.',
        },
      },
    },
    exercises: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide activities.',
        },
      },
    },
    notes: {
      type: DataTypes.TEXT,
    },
    symptomCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tiggerCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exerciseCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'log',
  }
);

module.exports = Log;
