'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:
    {
      type: DataTypes.STRING,
      validate:
      {
        isEmail:
        {
          args: true,
          msg: 'Format Email Salah!'
        }
      }
    }
  })

  Student.associate = function (models) {
    Student.belongsToMany(models.Subject, {
      through: 'StudentSubject'
    })
  }

  Student.prototype.getfullName = function () {
    return this.first_name+' '+this.last_name;
  }
  return Student;
};
