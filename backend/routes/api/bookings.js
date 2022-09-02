const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const sequelize = require("sequelize");
const { Op } = require("sequelize");

const router = express.Router();

router.use(express.json());

//
//
//
//
//
//GET ALL CURRENT USERS BOOKINGS
router.get("/current", requireAuth, async (req, res) => {
  userId = req.user.id;
  console.log("current user id", userId);

  //remove this
  // await Booking.create({
  //   spotId: 3,
  //   userId: 4,
  //   startDate: new Date("2023-01-10"),
  //   endDate: new Date("2023-01-15"),
  // });

  let currentBookings = await Booking.findAll({
    where: {
      userId: userId,
    },
  });
  res.json(currentBookings);
});

//
//
//
//
//
//EDIT A BOOKING
//postman route:  {{url}}/bookings/{{bookingId}}
router.put("/:bookingId", requireAuth, async (req, res) => {
  let userId = req.user.id;

  let id = req.params.bookingId;

  const { startDate, endDate } = req.body;

  let booking = await Booking.findByPk(id);

  booking.set({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  await booking.save();

  res.json({ booking });
});

//
//
//
//
//
//DELETE A BOOKING
//postman route: {{url}}/bookings/{{bookingId}}
router.delete("/:bookingId", requireAuth, async (req, res) => {
  let bookingId = req.params.bookingId;

  let booking = await Booking.findByPk(bookingId);

  await booking.destroy();

  res.json(booking);
});

//
//
//
//
//end
module.exports = router;
