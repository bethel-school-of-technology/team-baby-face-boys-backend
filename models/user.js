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
    // static associate(models) {
    //   this.hasMany(models.Posts, {
    //     foreignKey: 'userId'
    //   })
    // }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gamerID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DOB: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};