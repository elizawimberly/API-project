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
      "Reviews",
      [
        {
          spotId: 3,
          userId: 3,
          review: "This house was beautiful. We loved the design.",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review: "What a wonderful getaway. We hope to come back soon!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 1,
          review: "Great location, incredible views.",
          stars: 3,
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
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
