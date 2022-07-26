'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post
      // , {
      //   foreignKey: 'userId'
      // }
      )
      this.hasMany(models.HighScore, {
        foreignKey: 'id'
      })
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gamerID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // admin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};