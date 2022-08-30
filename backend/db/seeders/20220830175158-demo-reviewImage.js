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
      "ReviewImages",
      [
        {
          reviewId: 1,
          url: "https://commons.wikimedia.org/wiki/File:Ennis_house_gate._(3485150864).jpg",
        },
        {
          reviewId: 2,
          url: "https://commons.wikimedia.org/wiki/File:Exterior_view_of_the_Hollyhock_House,_Los_Angeles,_1921_(shulman-1997-JS-217-ISLA).jpg",
        },
        {
          reviewId: 3,
          url: "https://commons.wikimedia.org/wiki/File:Samuel-Novarro_House_West_Facade_1.jpg",
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
    await queryInterface.bulkDelete("ReviewImages", null, {});
  },
};
