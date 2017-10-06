'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Kautzar',
      last_name: 'Alibani',
      email: 'kalibani.ka@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Devi',
      last_name: 'Rusliani',
      email: 'devirusliani@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
