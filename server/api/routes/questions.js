const express = require("express");
const router = express.Router();
const checkAdmin = require("../middleware/check-admin");
const axios = require("axios");

//get all questions
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

//get particular question
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

//get all testcase
router.get("/:id/testcases", async (req, res) => {
  const { id } = req.params;
  axios
    .get(process.env.ENDPOINT + "/problems/" + id + "/testcases", {
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

//get particular testcase
router.get("/:id/testcases/:number", async (req, res) => {
  const { id, number } = req.params;
  axios
    .get(process.env.ENDPOINT + "/problems/" + id + "/testcases/" + number, {
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

//update question
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

//update testcase
router.put("/edit/:id/testcase/:number", checkAdmin, async (req, res) => {
  const { id, number } = req.params;
  const { input, output, timeLimit, judgeId } = req.body;
  if (!input || !output || !judgeId || !timeLimit) {
    return res.status(400).json({
      status: "error",
      message: "provide all fileds",
    });
  }
  axios
    .put(
      process.env.ENDPOINT +
        "/problems/" +
        id +
        "/testcases/" +
        number +
        "?access_token=" +
        process.env.ACCESS_TOKEN,
      {
        input,
        output,
        judgeId,
        timeLimit,
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

//create question
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

//create testcase
router.post("/create/testcase/:id", checkAdmin, async (req, res, next) => {
  const { id } = req.params;

  const { input, output, timeLimit, judgeId } = req.body;

  if (!input || !output || !judgeId || !timeLimit) {
    return res.status(400).json({
      status: "error",
      message: "provide all fileds",
    });
  }

  axios
    .post(
      process.env.ENDPOINT +
        "/problems/" +
        id +
        "/testcases?access_token=" +
        process.env.ACCESS_TOKEN,
      {
        input,
        output,
        judgeId,
        timeLimit,
      }
    )
    .then((data) => {
      return res.status(201).json({
        status: "success",
        message: data?.statusText,
        number: data.data.number,
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
