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

//GET ALL SPOTS
//NOTE FOR GET ALL SPOTS-
//SET PREVIEW TRUE FOR ONE SPOT IMAGE AND SET QUERY FILTER TO FIND PREVIEW IMAGE TRUE

//try using raw:true on get all spots for current user

router.get("/", async (req, res) => {
  let result = [];

  let spots = await Spot.findAll({});
  //for loop or for of works to iterate- use await here
  //review.count and review.sum
  //const findReview = await spot.getReviews({
  //       attributes: [
  //         [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
  // gotta kinda do ssomething like this
  // to get your average reviews

  // for (let i = 0; i < spots.length; i++) {
  //   let currentSpot = spots[i];
  //   let reviews = await currentSpot.getReviews();
  //   result.push(reviews);
  // }

  res.json({ spots });
});

////CHANGED PATH TO TEST
router.get("/TEST", async (req, res) => {
  let spotsTarget = await Spot.findAll({
    include: {
      model: Review,
      // attributes: [
      //   [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      // ],
      attributes: [],
    },
    // attributes: ["id", "ownerId"],
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
      [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
    ],
    // raw: true,
    // nest: true,
  });

  // return (await model.findAll({ ...options })).map(record => record.toJSON());

  // let newSpot = spotsTarget.map((record) => {
  //   return record.toJSON();
  // });

  let previewImage = await SpotImage.findOne({
    where: (spotId = spotsTarget.id),
  });

  let newObj = spotsTarget[0].toJSON();

  let Spots = [
    {
      ...newObj,
      previewImage: previewImage.url,
    },
  ];

  Spots.previewImage = previewImage.url;

  res.json({ Spots });
});

router.post("/", requireAuth, async (req, res) => {
  // const { user } = req;
  // if (user) {
  //   user: user.toSafeObject();
  // }
  // let userInfo = user.toSafeObject();

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
//CREATE IMAGE FOR A SPOT
router.post("/:spotId/images", requireAuth, async (req, res) => {
  let user = req.user.id;

  //??DO I NEED FUNCTIONALITY FOR THIS:
  // Require proper authorization: Spot must belong to the current user

  //??Does the id I return in the response body supposed to be the id of the spotImage record?

  //get spot id from req param
  //create new record in SpotImage with
  //spotId = req.params info
  //url = req.boy
  //preview = req.body

  let spotId = Number(req.params.spotId);

  let spot = await Spot.findByPk(spotId);

  console.log("here is the spot info:", spot);

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

//EDIT A SPOT
router.put("/:spotId", async (req, res) => {
  //get spot by spotId param
  //get props from req.body
  //update vals on spot

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

  let spot = await Spot.findByPk(spotId);

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

//CREATE A REVIEW FOR A SPOT
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

  // {{url}}/spots/{{spotId}}/reviews

  //get all reviews where user = currentuser.id
  let matchingReviews = await Review.findAll({
    where: {
      userId: userId,
      spotId: spotId,
    },
  });

  console.log("MATCHING REIVEWS", matchingReviews);

  if (matchingReviews.length > 0) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }

  //if there are any result throw error;

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

//end
module.exports = router;

//OLD IMPLEMENTATION OF GET ALL SPOTS:
// router.get("/", async (req, res) => {
//   let Spots = await Spot.findAll({
//     //for loop or for of works to iterate- use await here
//     //review.count and review.sum
//     //const findReview = await spot.getReviews({
//     //       attributes: [
//     //         [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
//     // gotta kinda do ssomething like this
//     // to get your average reviews
//     //
//     //
//     //
//     //
//     //
//     // include: [
//     //   {
//     //     model: Review,
//     //     // attributes: [
//     //     //   [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
//     //     // ],
//     //     attributes: [
//     //       [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
//     //     ],
//     //   },
//     // {
//     //   model: SpotImage,
//     //   attributes: ["url"],
//     // },
//     // ],
//     // attributes: [
//     //   "id",
//     //   "ownerId",
//     //   "address",
//     //   "city",
//     //   "state",
//     //   "country",
//     //   "lat",
//     //   "lng",
//     //   "name",
//     //   "description",
//     //   "price",
//     //   "createdAt",
//     //   "updatedAt",
//     //   [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
//     // ],
//   });
//   res.json({ Spots });
// });
