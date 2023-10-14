const express = require("express");
const {
  createuser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/add", createuser);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
