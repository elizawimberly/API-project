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
      "Spots",
      [
        {
          ownerId: 1,
          address: "345 Chestnut Street",
          city: "Miami",
          state: "Florida",
          country: "US",
          lat: 34.1253618,
          lng: -118.287994,
          name: "Ennis House",
          description: "Mayan Revival-style house built by Frank Lloyd Wright",
          price: 200,
        },
        {
          ownerId: 1,
          address: "4800 Hollywood Blvd",
          city: "Los Angeles",
          state: "California",
          country: "US",
          lat: 34.10013,
          lng: -118.297994,
          name: "Hollyhock House",
          description:
            "Historical landmark built by Frank Lloyd Wright located in a city park",
          price: 120,
        },
        {
          ownerId: 3,
          address: "2255 Verde Oak Dr",
          city: "San Francisco",
          state: "California",
          country: "US",
          lat: 36.10013,
          lng: -150.297994,
          name: "Samuel Novarro House",
          description:
            "Architectural landmark built by Lloyd Wright designed in 1928",
          price: 250,
        },
        {
          ownerId: 1,
          address: "55 Verde Oak Dr",
          city: "Joshua Tree",
          state: "California",
          country: "US",
          lat: 36.10013,
          lng: -150.297994,
          name: "Desert House",
          description: "Escape the rush of the city",
          price: 100,
        },
        {
          ownerId: 2,
          address: "8855 Verde Oak Dr",
          city: "Big Sur",
          state: "California",
          country: "US",
          lat: 36.10013,
          lng: -150.297994,
          name: "On the Cliffs",
          description: "The most beautiful views",
          price: 120,
        },
        {
          ownerId: 2,
          address: "9782 Casey Dr",
          city: "Monterey",
          state: "California",
          country: "US",
          lat: 36.10013,
          lng: -150.297994,
          name: "Among the pines",
          description: "Come relax at this beautiful home",
          price: 120,
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
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
