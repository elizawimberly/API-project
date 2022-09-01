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

  let reviews = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        // attributes: [],
      },
      {
        model: Spot,
        // attributes: ["url", "preview"],
      },
      {
        model: ReviewImage,
        // attributes: ["url", "preview"],
      },
    ],
  });

  res.json({
    reviews,
  });
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
