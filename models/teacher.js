'use strict';
module.exports = function(sequelize, DataTypes)
{
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: 'Format Email Salah!'
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  })
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject);
  };

  Teacher.prototype.getfullName = function () {
    return this.first_name+' '+this.last_name;
  }
  
  return Teacher;
};
