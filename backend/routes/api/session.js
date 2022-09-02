const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Make a middlewarethat will check keys and validate them:
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  // if (!user) {
  //   const err = new Error("Login failed");
  //   err.status = 401;
  //   err.title = "Login failed";
  //   err.errors = ["The provided credentials were invalid."];
  //   return next(err);
  // }

  if (!user) {
    // const err = new Error("Login failed");
    // err.status = 401;
    // err.title = "Login failed";
    // err.errors = ["The provided credentials were invalid."];
    // return next(err);
    return res.status(401).json({
      message: "Invalid credentials",
      statusCode: 401,
    });
  }

  await setTokenCookie(res, user);

  let userObj = user.toJSON();
  delete userObj.hashedPassword;
  delete userObj.createdAt;
  delete userObj.updatedAt;

  userObj.token = "";

  return res.json(userObj);

  // return res.json({
  //   user,
  // });
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    user: user.toSafeObject();
    let userObj = user.toSafeObject();
    return res.json(userObj);
  } else return res.json({});
});

//old working code
// Restore session user
// router.get("/", restoreUser, (req, res) => {
//   const { user } = req;
//   if (user) {
//     return res.json({
//       user: user.toSafeObject(),
//     });
//   } else return res.json({});
// });

module.exports = router;
