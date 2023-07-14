const express = require("express");
const router = express.Router();
const checkAdmin = require("../middleware/check-admin");
const axios = require("axios");

router.get("/", async (req, res) => {
  axios
    .get(process.env.ENDPOINT + "/problems", {
      params: {
        access_token: process.env.ACCESS_TOKEN,
      },
    })
    .then((data) => {
      return res.status(201).json(data.data);
    })
    .catch((resp) => {
      return res.status(400).json({
        status: "error",
        message: resp.response?.statusText,
      });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  axios
    .get(process.env.ENDPOINT + "/problems/" + id, {
      params: {
        access_token: process.env.ACCESS_TOKEN,
      },
    })
    .then((data) => {
      return res.status(201).json(data.data);
    })
    .catch((resp) => {
      return res.status(400).json({
        status: "error",
        message: resp.response?.statusText,
      });
    });
});

router.put("/edit/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, body, masterjudgeId } = req.body;

  axios
    .put(
      process.env.ENDPOINT +
        "/problems/" +
        id +
        "?access_token=" +
        process.env.ACCESS_TOKEN,
      {
        name,
        body,
        masterjudgeId,
      }
    )
    .then((data) => {
      return res.status(201).json({
        status: "success",
        message: "Updated successfully",
      });
    })
    .catch((resp) => {
      return res.status(400).json({
        status: "error",
        message: resp.response?.statusText,
      });
    });
});

router.post("/create", checkAdmin, async (req, res, next) => {
  const { name, body, masterjudgeId } = req.body;

  if (!name || !body || !masterjudgeId) {
    return res.status(400).json({
      status: "error",
      message: "provide all fileds",
    });
  }

  axios
    .post(
      process.env.ENDPOINT +
        "/problems?access_token=" +
        process.env.ACCESS_TOKEN,
      {
        name,
        body,
        masterjudgeId,
      }
    )
    .then((data) => {
      return res.status(201).json({
        status: "success",
        message: data.statusText,
        id: data.data.id,
        code: data.data.code,
      });
    })
    .catch((resp) => {
      return res.status(400).json({
        status: "error",
        message: resp.response?.statusText,
      });
    });
});

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
