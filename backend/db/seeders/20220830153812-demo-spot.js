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
    // await queryInterface.bulkInsert;
    // "Spots",
    //   [
    //     {
    //       ownerId: DataTypes.INTEGER,
    //       address: DataTypes.STRING,
    //       city: DataTypes.STRING,
    //       state: DataTypes.STRING,
    //       country: DataTypes.STRING,
    //       lat: DataTypes.DECIMAL,
    //       lng: DataTypes.DECIMAL,
    //       name: DataTypes.STRING,
    //       description: DataTypes.STRING,
    //       price: DataTypes.DECIMAL,
    //     },
    //   ],
    //   {}();
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
