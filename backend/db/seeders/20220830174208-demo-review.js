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
          spotId: 1,
          userId: 3,
          review: "This house was beautiful. We loved the design.",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 2,
          review:
            "We had a great time. The check-in was easy and the house was spotless",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 2,
          review: "What a wonderful getaway. We hope to come back soon!",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 3,
          review: "This is one of my favorite places I have ever stayed",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 1,
          review: "Great location, incredible views.",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 2,
          review:
            "Great host, great stay. Easy check in and fully stocked kitchen",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 3,
          review: "I was really happy with my experience.",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 2,
          review:
            "If you are thinking to book a spot in this location, this is the perfect place.",
          stars: 3,
        },
        {
          spotId: 5,
          userId: 1,
          review: "I am so happy I booked this spot. It was perfect.",
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
