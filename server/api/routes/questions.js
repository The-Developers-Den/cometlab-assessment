const express = require("express");
const router = express.Router();
const checkAdmin = require("../middleware/check-admin");
const axios = require("axios");
const Problems = require("../models/problem");

//get all problems
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

//get particular problem
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

// get results

router.get("/results/:id", async (req, res, next) => {
  const { id } = req.params;

  axios
    .get(
      process.env.ENDPOINT +
        "/submissions/" +
        id +
        "?access_token=" +
        process.env.ACCESS_TOKEN
    )
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
      Problems.updateOne({ id: id }, { $set: { name, body, masterjudgeId } })
        .exec()
        .then(() => {
          return res.status(201).json({
            status: "success",
            message: "Updated successfully",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: err,
          });
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

//create problem
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
      const problem = new Problems({
        id: data.data.id,
        code: data.data.code,
        name: name,
        body: body,
        masterjudge: {
          id: masterjudgeId,
        },
      });
      problem
        .save()
        .then((resp) => {
          return res.status(201).json({
            status: "success",
            message: data.statusText,
            id: data.data.id,
            code: data.data.code,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            status: "error",
            message: err,
          });
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
      Problems.updateOne(
        { id: id },
        { $push: { testcases: { number: data.data.number } } }
      )
        .exec()
        .then(() => {
          return res.status(201).json({
            status: "success",
            message: data?.statusText,
            number: data.data.number,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: err,
          });
        });
    })
    .catch((resp) => {
      return res.status(400).json({
        status: "error",
        message: resp.response?.statusText,
      });
    });
});

// submit solution
router.post("/submit", async (req, res, next) => {
  const { problemId, source, compilerId, tests } = req.body;

  if (!compilerId || !source || !problemId) {
    return res.status(400).json({
      status: "error",
      message: "provide all fileds",
    });
  }

  axios
    .post(
      process.env.ENDPOINT +
        "/submissions?access_token=" +
        process.env.ACCESS_TOKEN,
      {
        problemId,
        source,
        compilerId,
        tests,
      }
    )
    .then((data) => {
      return res.status(201).json({
        status: "success",
        message: data.statusText,
        id: data.data.id,
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
