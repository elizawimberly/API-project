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
          url: "https://images.unsplash.com/photo-1549274092-75e864fe7703?ixlib=rb-1.2.1",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.unsplash.com/photo-1561098276-490acddb7e8d?ixlib=rb-1.2.1",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-1.2.1",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://images.unsplash.com/photo-1611444143036-6678f7f94652?ixlib=rb-1.2.1",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://images.unsplash.com/photo-1613071155039-4a2a81752444?ixlib=rb-1.2.1",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://images.unsplash.com/photo-1584098731526-e3924fad98db?ixlib=rb-1.2.1",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://images.unsplash.com/photo-1523688471150-efdd09f0f312?ixlib=rb-1.2.1",
          preview: true,
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
