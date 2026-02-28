const express = require("express");
const router = express.Router();
const {
  register,
  login,
  users,
  getPreferences,
  updatePreferences,
} = require("../controllers/users.controller");

const { validateJWT } = require("../middleware/auth.middleware");

router.post("/signup", register);
router.post("/login", login);

router.use(validateJWT);
router.get("", users);
router.get("/preferences", getPreferences);
router.put("/preferences", updatePreferences);

module.exports = router;
