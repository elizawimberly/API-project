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
// const { sequelize } = require("../../db/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const router = express.Router();

router.use(express.json());

//
//token: XDQFDSS9-0pfgObowfRCcLrBEixAaGbUsyoc
//
//
//GET ALL SPOTS
router.get("/", async (req, res) => {
  let { page, size } = req.query;

  let hasPagination = false;

  if (page && size) {
    hasPagination = true;
  }

  let pagination = {};

  page = Number(page);
  size = Number(size);

  if (!page) {
    page = 1;
  }

  if (page < 1) {
    page = 1;
  }

  if (page > 10) {
    page = 10;
  }

  if (!size) {
    size = 20;
  }

  if (size < 1) {
    size = 1;
  }

  if (size > 20) {
    size = 20;
  }

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
    ...pagination,
  });

  let result = [];

  for (let Spot of spots) {
    let reviews = await Spot.getReviews({
      //   attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      // });
      //refactoring to round average:

      attributes: [
        [
          sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("stars"))),
          "avgRating",
        ],
      ],
    });
    // console.log(reviews);
    let spotObj = Spot.toJSON();
    spotObj.reviews = reviews;
    // console.log(spotObj.reviews[0]);
    // spotObj.avgRating = reviews.[0].avgRating;
    result.push(spotObj);
  }

  let newResult = [];

  for (let spotList of result) {
    // console.log(List);
    let average = spotList.reviews[0].toJSON();
    spotList.avgRating = average.avgRating;
    delete spotList.reviews; ///*****ADD THIS CODE BACK */
    // console.log(average);
    // newResult.push(List.reviews[0]);
    newResult.push(spotList);
  }

  //IMPORTANT CODE FROM ALEC LECTURE
  // use nested looping to iterate over all spot images for each spot
  newResult.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      //check if each image has a preview prop of true
      if (image.preview === true) {
        //if the image is true, creat a new prop on spot
        spot.previewImage = image.url;
      }
    });
    //check if each spot has a previewImage property, if not add one
    if (!spot.previewImage) {
      spot.previewImage = null;
    }
    //remove SpotImage prop from each spot object
    delete spot.SpotImages;
  });

  // res.json(spotsList);
  if (hasPagination) {
    return res.json({
      Spots: newResult,
      page: page,
      size: size,
    });
  }

  res.json({ Spots: newResult });
});

//
//
//
//
//GET SPOTS OF CURRENT USER
//NOTES, need to fix something. postman route works for userID = 3, but not from req.user
router.get("/current", requireAuth, async (req, res) => {
  let userId = req.user.id;
  // let userId = 3;

  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
  });

  let result = [];

  for (let Spot of spots) {
    let reviews = await Spot.getReviews({
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });

    let spotObj = Spot.toJSON();
    spotObj.reviews = reviews;

    result.push(spotObj);
  }

  let newResult = [];

  for (let spotList of result) {
    // console.log(List);
    let average = spotList.reviews[0].toJSON();
    spotList.avgRating = average.avgRating;
    delete spotList.reviews;
    // console.log(average);
    // newResult.push(List.reviews[0]);
    newResult.push(spotList);
  }

  //IMPORTANT CODE FROM ALEC LECTURE
  // use nested looping to iterate over all spot images for each spot
  newResult.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      //check if each image has a preview prop of true
      if (image.preview === true) {
        //if the image is true, creat a new prop on spot
        spot.previewImage = image.url;
      }
    });
    //check if each spot has a previewImage property, if not add one
    if (!spot.previewImage) {
      spot.previewImage = null;
    }
    //remove SpotImage prop from each spot object
    delete spot.SpotImages;
  });

  // res.json(spotsList);
  res.json({ Spots: newResult });
});

//
//
//
//
//GET DETAILS OF A SPOT BY ID
//postman  {{url}}/spots/{{spotId}}
router.get("/:spotId", requireAuth, async (req, res) => {
  let spotId = req.params.spotId;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
    include: [
      // {
      //   model: Review,
      //   // attributes: [],
      // },
      // {
      //   model: SpotImage,
      //   attributes: ["id", "url", "preview"],
      // },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let reviews = await spot.getReviews({
    attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
  });

  let spotObj = spot.toJSON();
  spotObj.reviews = reviews;
  let average = spotObj.reviews[0].toJSON();
  spotObj.avgStarRating = average.avgRating;
  delete spotObj.reviews;

  let spotImages = await spot.getSpotImages({
    attributes: ["id", "url", "preview"],
  });

  // console.log(spotImages);
  delete spotObj.SpotImages;

  spotObj.SpotImages = spotImages;

  spotObj.Owner = spotObj.User;
  delete spotObj.User;

  res.json(spotObj);
});

//
//
//
//
//
//
//
//
//CREATE A SPOT
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (!address) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }

  if (!city) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }

  if (!state) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }

  if (!country) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }

  if (!lat) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }

  if (!lng) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }

  if (!description) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }

  if (!country) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }

  if (!price) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        price: "Price per day is required",
      },
    });
  }

  let newSpot = await Spot.create({
    ownerId: req.user.id,
    // ownerId: userInfo.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201);
  res.json(newSpot);
});

//
//
//
//
//CREATE AN IMAGE FOR A SPOT
//I need to refactor after postman route body got updated with previewImage prop
// {
//   "url": "image.url",
//   "previewImage": true //or false
// }
router.post("/:spotId/images", requireAuth, async (req, res) => {
  let user = req.user.id;

  let spotId = Number(req.params.spotId);

  let spot = await Spot.findByPk(spotId);

  // console.log("here is the spot info:", spot);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const { url, preview } = req.body;

  let newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });

  if (!newSpotImage.preview) {
    newSpotImage.preview = null;
  }

  let newObj = newSpotImage.toJSON();

  let result = {
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview,
  };

  res.json(result);
});

//
//
//
//
//
//
//
//EDIT A SPOT
router.put("/:spotId", async (req, res) => {
  let spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (!address) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }

  if (!city) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }

  if (!state) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }

  if (!country) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }

  if (!lat) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }

  if (!lng) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }

  if (!description) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }

  if (!country) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }

  if (!price) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        price: "Price per day is required",
      },
    });
  }

  // let spot = await Spot.findByPk(spotId);
  let spot = await Spot.findByPk(spotId, {
    attributes: {
      exlude: ["createdAt", "updatedAt"],
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  spot.set({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  await spot.save();

  res.json(spot);
});

//
//
//
//
//
//
// //this works!!! 0FFICIAL -----DO NOT CHANGE
// //CREATE A REVIEW FOR A SPOT
// //postman route: {{url}}/spots/{{spotId}}/reviews
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  let userId = req.user.id;
  let spotId = Number(req.params.spotId);
  const { review, stars } = req.body;

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //testing code
  // let reviews = await Review.findAll();
  // console.log(reviews);
  //end testing code

  let matchingReviews = await Review.findAll({
    where: {
      userId: userId,
      spotId: spotId,
    },
  });

  // console.log("MATCHING REIVEWS", matchingReviews);

  if (matchingReviews.length > 0) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }

  if (!review) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
      },
    });
  }

  if (stars < 1 || stars > 5) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }

  let newReview = await Review.create({
    spotId,
    userId,
    review,
    stars,
  });

  res.status(201).json(newReview);
});

//
//
//
//
//
//
//DELETE A SPOT
router.delete("/:spotId", requireAuth, async (req, res) => {
  let spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  await spot.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//
//
//
//
//
//
//GET REVIEWS OF SPOT BY ID
//  {{url}}/spots/{{spotId}}/reviews
router.get("/:spotId/reviews", requireAuth, async (req, res) => {
  let spotId = req.params.spotId;

  let reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!reviews.length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  res.json({ Reviews: reviews });
});

//
//
//
//
//
//
//CREATE A BOOKING BASED ON A SPOT ID
//postman route:  {{url}}/spots/{{spotId}}/bookings
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  let spotId = Number(req.params.spotId);

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let userId = Number(req.user.id);

  const { startDate, endDate } = req.body;

  let oldBookings = await Booking.findAll();

  let newStart = Date.parse(startDate);
  let newEnd = Date.parse(endDate);

  for (let oldBooking of oldBookings) {
    let oldStart = Date.parse(oldBooking.startDate);
    let oldEnd = Date.parse(oldBooking.endDate);

    if (newStart >= oldStart && newStart <= oldEnd) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
        },
      });
    }

    if (newEnd >= oldStart && newEnd <= oldEnd) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  let newBookingObj = await Booking.create({
    spotId,
    userId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  res.json(newBookingObj);
});

//
//
//
//
//
//
//GET ALL BOOKINGS FOR A SPOT BY ID
//postman path:   {{url}}/spots/{{spotId}}/bookings
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  let userId = req.user.id;

  // let userId = 1;

  spotId = req.params.spotId;

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let ownerId = spot.ownerId;

  if (userId === ownerId) {
    let bookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
    return res.json({ Bookings: bookings });
  }

  let bookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
    attributes: ["spotId", "startDate", "endDate"],
  });
  return res.json({ Bookings: bookings });
});

//end
//end
//end
//end
//end
//end
//end
module.exports = router;
