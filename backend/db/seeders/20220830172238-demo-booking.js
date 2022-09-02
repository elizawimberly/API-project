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
      "Bookings",
      [
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2023-06-29"),
          endDate: new Date("2023-07-10"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2023-10-29"),
          endDate: new Date("2023-11-10"),
        },
        {
          spotId: 3,
          userId: 1,
          startDate: new Date("2023-05-20"),
          endDate: new Date("2023-05-23"),
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
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
