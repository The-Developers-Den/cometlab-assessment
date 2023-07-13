const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const checkAdmin = require("../middleware/check-admin");
const User = require("../models/user");
const axios = require("axios");

router.delete("/delete/:id", checkAdmin, async (req, res, next) => {
  const id = req.params.id;
  axios
    .delete(process.env.ENDPOINT + "/problems/" + id, {
      params: {
        access_token: process.env.ACCESS_TOKEN,
      },
    })
    .then((data) => {
      return res
        .status(201)
        .json({ status: "success", message: data.statusText });
    })
    .catch((resp) => {
      return res.status(500).json({
        status: "error",
        message: resp.response?.statusText,
      });
    });
});

module.exports = router;
