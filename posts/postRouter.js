const express = require("express");
const db = require("./postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await db.get();
  if (posts) {
    res.status(200).json(posts);
  } else {
    next({
      status: 500,
      message: "The posts could not be retrieved."
    });
  }
});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
