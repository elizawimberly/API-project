const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//middleware that will check these keys and validate them:
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a firstName with at least 1 character."),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a lastName with at least 1 character."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
//postman body:
// {
//   "firstName": "John",
//   "lastName": "Smith",
//   "email": "john.smith@gmail.com",
//   "username": "johnnysmith",
//   "password": "secret password"
// }
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const user = await User.signup({
    email,
    username,
    firstName,
    lastName,
    password,
  });

  await setTokenCookie(res, user);

  //new code;
  let userObj = user.toJSON();
  delete userObj.hashedPassword;
  delete userObj.id;

  return res.json(userObj);

  // return res.json({
  //   user,
  // });
});

module.exports = router;
