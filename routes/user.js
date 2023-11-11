const express = require("express");
const {
  createuser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  authUser,
} = require("../controllers/userController");
const { uservalidator, validate } = require("../middlewares/validators");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", uservalidator, validate, createuser);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
router.post("/login", authUser);

module.exports = router;
