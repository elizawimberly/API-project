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
//
//DELETE A SPOT IMAGE
//postman path:  {{url}}/spot-images/{{spotImageId}}
router.delete("/:spotImageId", requireAuth, async (req, res) => {
  let spotImageId = req.params.spotImageId;

  let spotImage = await SpotImage.findByPk(spotImageId);

  await spotImage.destroy();

  res.json(spotImage);
});

//
//
//
//
//end
module.exports = router;
