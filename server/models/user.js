const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'Username already exists',
      },
      validate: {
        isEmail: {
          msg: 'Please enter a valid email.',
        },
        notNull: {
          msg: 'Please enter your email.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a password',
        },
      },
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your first name.',
        },
        notNull: {
          msg: 'Please enter your first name.',
        },
      },
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your last name.',
        },
        notNull: {
          msg: 'Please enter your last name.',
        },
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a Date of Birth.',
        },
        notNull: {
          msg: 'Please enter a Date of Birth.',
        },
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'user',
  }
);

module.exports = User;
