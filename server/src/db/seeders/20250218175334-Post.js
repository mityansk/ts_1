'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'Posts',
    [
      {
        title: 'Test',
        body: 'Blablablabla asdlknadk jw3erk jkwedjn,ajsd  a sd,a mnaskdjb askd',
        authorId: 1,
        //createdAt: new Date(),
        //updatedAt: new Date(),
      },
      {
        title: 'Test2',
        body: 'Blablablabla asdlknadk jw3erk jkwedjn,ajsd  a sd,a mnaskdjb askd',
        authorId: 1,
        //createdAt: new Date(),
        //updatedAt: new Date(),
      },
    ],
    {}
  );
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Posts', null, {});
},
};
