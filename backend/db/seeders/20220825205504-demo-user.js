"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Soren",
          lastName: "Scott",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          firstName: "Patti",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "Nicholas",
          lastName: "Roeg",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user3@user.io",
          username: "FakeUser3",
          firstName: "Claire",
          lastName: "Denis",
          hashedPassword: bcrypt.hashSync("password4"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
