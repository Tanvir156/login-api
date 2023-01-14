const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  updateProfile,
  userProfile,
  allUserList,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/userlist").get(allUserList);
router.route("/updateprofile").post(protect, updateProfile);
router.route("/userprofile").get(protect, userProfile);
module.exports = router;
