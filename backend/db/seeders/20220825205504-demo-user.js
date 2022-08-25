"use strict";
const bcrypt = require("bcryptjs");

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
      "Users",
      [
        {
          username: "SorenDog",
          email: "soren@cutedogs.com",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          username: "CaseyPlaysMusic",
          email: "casey@aol.com",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          username: "BuddyIsMyFriend",
          email: "buddy@siamesecats.com",
          hashedPassword: bcrypt.hashSync("password3"),
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
