// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");

//added requireAuth import based on alec's walthru
const { requireAuth } = require("../../utils/auth.js");

// All the URLs of the routes in the api router will be prefixed with /api.

//added from alec's walthru
router.get("/require-auth", requireAuth, (req, res) => {
  res.json({ message: "success" });
});

router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
