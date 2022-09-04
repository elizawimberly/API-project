"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://commons.wikimedia.org/wiki/File:Ennis_House_front_view_2005.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://commons.wikimedia.org/wiki/File:Hollyhock_House_4.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://commons.wikimedia.org/wiki/File:Samuel-Novarro_House_West_Facade_2.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://commons.wikimedia.org/wiki/File:Ennis_House_front_view_2006.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://commons.wikimedia.org/wiki/File:Ennis_house._(3484341687).jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://commons.wikimedia.org/wiki/File:Samuel-Novarro_House_West_Facade_Entrance.jpg",
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SpotImages", null, {});
  },
};
