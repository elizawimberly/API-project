"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
    options.tableName = "Bookings";
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
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
          userId: 3,
          startDate: new Date("2023-05-20"),
          endDate: new Date("2023-05-23"),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("2023-01-29"),
          endDate: new Date("2023-02-10"),
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
    options.tableName = "Bookings";

    await queryInterface.bulkDelete(options, null, {});
  },
};
