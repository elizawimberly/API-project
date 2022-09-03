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
//
//
//
//CREATE AN IMAGE FOR A REVIEW
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  let reviewId = req.params.reviewId;

  let review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  const { url } = req.body;

  let reviewImage = await ReviewImage.create({
    reviewId,
    url,
  });

  res.json({
    id: reviewImage.id,
    url: reviewImage.url,
  });
});

//
//
//
//
//GET REVIEWS OF CURRENT USER
router.get("/current", requireAuth, async (req, res) => {
  userId = req.user.id;

  let reviewsCollect = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  //iterate over reviews
  //for each review get the spot
  //for each spot, find the SpotImages
  let spotImageArr = [];

  let Reviews = [];

  for (let review of reviewsCollect) {
    let spotId = review.Spot.id;
    // review.spotImages = [];
    // console.log(spotId);
    let spotImages = await SpotImage.findAll({
      where: {
        spotId: spotId,
      },
      // raw: true,
    });
    let reviewObj = review.toJSON();
    reviewObj.spotImages = [];
    // console.log(spotImages);
    spotImages.forEach((image) => {
      // console.log(image);
      let imageObj = image.toJSON();
      // console.log(imageObj);
      spotImageArr.push(imageObj);
      reviewObj.spotImages.push(imageObj);
    });
    // review.spotImages.push(spotImages);
    // review.spotImages = spotImages;
    Reviews.push(reviewObj);
  }

  // console.log(Reviews);

  // for (let review of reviews) {
  //   for (let image of review.ReviewImages) {
  //     // console.log(image);
  //     imageObj = image.toJSON();
  //     // if (imageObj) console.log(imageObj);
  //   }
  // }

  Reviews.forEach((review) => {
    review.spotImages.forEach((image) => {
      // console.log(image);
      if (image.preview === true) {
        review.Spot.previewImage = image.url;
      }
    });
    if (!review.Spot.previewImage) {
      review.Spot.previewImage = null;
    }
    delete review.spotImages;
  });

  res.json({
    Reviews,
  });

  // res.json({
  //   reviews,
  // });
});

//
//
//
//
//
//
//
//EDIT A REVIEW
router.put("/:reviewId", requireAuth, async (req, res) => {
  let reviewId = Number(req.params.reviewId);

  let review = await Review.findByPk(reviewId);

  res.json({ review });
});

//
//
//
//
//
//DELETE A REVIEW
router.delete("/:reviewId", requireAuth, async (req, res) => {
  let reviewId = req.params.reviewId;
  let review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({
      message: "review couldn't be found",
      statusCode: 404,
    });
  }

  await review.destroy();

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
