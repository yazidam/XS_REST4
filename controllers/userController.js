const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (user && isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json("invalid eamil or password");
    }
  } catch (error) {}
};
const createuser = async (req, res) => {
  try {
    const user = new User(req.body);
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) res.status(400).json("user with this eamil existe");
    const hashPsw = await bcrypt.hash(password, 10);
    user.password = hashPsw;
    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("errrr", error);
  }
};

const getUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res.json(usersList);
  } catch (error) {
    console.log("errr", error);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.log("errr", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      await user.deleteOne();
      res.status(200).json("user deleted");
    } else {
      return res.status(400).json("user not found");
    }
  } catch (error) {
    console.log("errr", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { email, name, phone, password } = req.body;

    console.log("user", user);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      const updateUser = await user.save();
      res.json({
        updateUser,
      });
      console.log("updateUser", updateUser);
    }
    await user.save();
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "user not found try again" });
  }
};

module.exports = {
  createuser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  authUser,
};
