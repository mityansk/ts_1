'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'John Doe',
          email: 'johndoe@gmail.com',
          password: await bcrypt.hash('Qwerty123!', 10),
          //createdAt: new Date(),
          //updatedAt: new Date(),
        },
        {
          username: 'Valera Olegov',
          email: 'valera@mail.ru',
          password: await bcrypt.hash('Qwerty123!', 10),
          //createdAt: new Date(),
          //updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
