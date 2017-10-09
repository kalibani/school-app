'use strict';
module.exports = function(sequelize, DataTypes) {
  const salt = require('../helpers/salt');
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.TEXT,
    secret: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (models)=> {
        let secret = salt.randomString(8);
        let password = models.password
        models.password = salt.createHash(password, secret);
        models.secret = secret;
      }
    }
  });

  return User;
};
