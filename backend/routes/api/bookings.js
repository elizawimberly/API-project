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

  let currentBookings = await Booking.findAll({
    where: {
      userId: userId,
    },
  });

  let bookingResult = [];

  for (let booking of currentBookings) {
    let spot = await booking.getSpot({
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    });
    let spotImages = await spot.getSpotImages();

    // console.log(spotImages);
    let spotObj = spot.toJSON();
    let bookingObj = booking.toJSON();
    bookingObj.Spot = spotObj;
    //iterate over spot images , make it json, check for previewImage
    for (let image of spotImages) {
      let imageObj = image.toJSON();
      if (imageObj.preview === true) {
        bookingObj.Spot.previewImage = imageObj.url;
      }
      // console.log(imageObj);
    }
    if (!bookingObj.Spot.previewImage) {
      bookingObj.Spot.previewImage = null;
    }

    bookingResult.push(bookingObj);
  }

  // Bookings = currentBookings;
  res.json({ Bookings: bookingResult });
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

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  booking.set({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  await booking.save();

  res.json(booking);
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

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  await booking.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//
//
//
//
//end
module.exports = router;
