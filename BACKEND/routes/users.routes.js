let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let UserRouter = require("express").Router();
let { verifyUser } = require("../middlewares/user.middleware");
const { UserModel } = require("../models/user.model");

// register
UserRouter.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 5);
    const user = new UserModel({
      username: req.body.username,
      password: hashed,
      email: req.body.email,
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// login
UserRouter.post("/login", async (req, res) => {
  try {
    // find user
    const user = await UserModel.findOne({ email: req.body.email });
    let { _id, username, email, password, isAdmin } = user;
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    // compare password
    const isPasswordValid = await bcrypt.compare(req.body.password, password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid username or password");
    }
    // generate token
    const token = jwt.sign({ _id }, "dermstore");
    res.send({ token, user: { username, email, isAdmin } });
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user
UserRouter.get("/me", verifyUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update user
UserRouter.patch("/me", verifyUser, async (req, res) => {
  try {
    if (req.body.password) {    // if i want to change password
      req.body.password = await bcrypt.hash(req.body.password, 5);
    }
    const user = await UserModel.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete user
// UserRouter.delete("/me", verifyUser, async (req, res) => {
//   try {
//     const user = await UserModel.findByIdAndDelete(req.user._id);
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = { UserRouter };
