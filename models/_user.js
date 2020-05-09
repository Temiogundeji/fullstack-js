'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false,
      isEmail:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};