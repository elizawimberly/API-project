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
    options.tableName = "SpotImages";
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-679107007998327833/original/9e2f50d8-6f8a-46ef-b82b-cd5e8a0925e9.jpeg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-41956727/original/35836e4c-e2d7-490e-8c59-98af726e15fd.jpeg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/64b531ab-f79f-4443-9d9f-368377021fc3.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/1b7229f5-0410-4428-8d53-85e678ccea20.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/46e78f1b-2082-46b5-9fec-f17214a48bc2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/619b8fa0-241c-4f14-b32b-acf2f2846157.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51709748/original/be3c3c9e-94f8-461c-9513-32a9c333ed1d.jpeg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/monet/Luxury-638245905014515362/original/235d047b-fc64-4eea-baf9-0fbd30ed2f44",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/5c899ba9-f6fb-4722-8390-ddd70039bc4d.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53665585/original/7b675706-09c3-419b-a2e9-1cb4610984e0.jpeg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/7604870d-c7b7-4bc1-a7d1-129c2dfb2408.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/a02aef33-c696-4458-ad2e-459b9eec7ec7.jpg",
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
    options.tableName = "SpotImages";

    await queryInterface.bulkDelete(options, null, {});
  },
};
