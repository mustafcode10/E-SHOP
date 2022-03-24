const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
  const userList = await User.find();
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// Get User count
router.get(`/get/count`, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ userCount });
    } catch (error) {
        res.status(500).json({ success: false });
    }
})

// Get User by ID
router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      res.status(500).json({
        message: "the user with the given ID was not found",
      });
    }
    res.send(user);
  });

// post or register a new user
router.post(`/register`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();
  if (!user) {
    res.status(400).json({
      success: false,
      message: "User could not be created",
    });
  }
  res.send(user);
});

// Login a user
router.post(`/login`, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("The user not found");
  }
  // compare user password with the passwordHash in the database
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign({userId: user.id, isAdmin: user.isAdmin}, secret, {expiresIn: "1d"});
    res.status(200).send({user: user.email, token: token});
  } else {
    res.status(400).send("password is wrong");
  }
});



module.exports = router;
