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
//
//DELETE A REVIEW IMAGE
router.delete("/:reviewImageId", requireAuth, async (req, res) => {
  let reviewImageId = req.params.reviewImageId;

  let reviewImage = await ReviewImage.findByPk(reviewImageId);

  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  await reviewImage.destroy();

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
