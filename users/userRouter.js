const express = require("express");

const router = express.Router();
const db = require("./userDb.js");

router.post("/", validateUser, (req, res) => {});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//error handler
router.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status).json({ message: err.message });
});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.getById(id);
    console.log(user, id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: "The user with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The user information could not be retrieved."
    });
  }
}

async function validateUser(req, res, next) {}

async function validatePost(req, res, next) {}

module.exports = router;
