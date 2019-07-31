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

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await db.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      next({
        status: 404,
        message: "The post with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The post information could not be retrieved."
    });
  }
}

module.exports = router;
