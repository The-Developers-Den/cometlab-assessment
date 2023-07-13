const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  const { username, role, password, email } = req.body;

  //check if fields are empty
  if (!username || !role || !password || !email) {
    return res.status(400).json({
      message: "provide all fields",
      status: "error",
    });
  }

  //check if user exists
  User.find({ username: username })
    .exec()
    .then((user) => {
      if (user.length) {
        return res.status(409).json({
          status: "error",
          message: "User exists",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: err,
            });
          } else {
            //creating user
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: username,
              email: email,
              role: role,
              password: hash,
            });
            console.log(user);
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  status: "success",
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  status: "error",
                  message: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "error",
      });
    });
});

module.exports = router;
