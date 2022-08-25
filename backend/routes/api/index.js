// backend/routes/api/index.js
const router = require("express").Router();
const { setTokenCookie, restoreUser } = require("../../utils/auth.js");
const { User } = require("../../db/models");

// All the URLs of the routes in the api router will be prefixed with /api.

router.use(restoreUser);

//routes used to test authentication
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

// //this route will test the setTokenCookie function by getting the demo user and calling setTokenCookie.
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// //GET /api/set-token-cookie
// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// // GET /api/require-auth
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

module.exports = router;
