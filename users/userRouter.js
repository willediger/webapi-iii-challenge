const express = require("express");

const router = express.Router();
const db = require("./userDb.js");

router.post("/", validateUser, async (req, res) => {
  const user = await db.insert(req.body);
  if (user) {
    res.status(200).json(user);
  } else {
    next({
      status: 500,
      message: "The user could not be added."
    });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch {
    next({
      status: 500,
      message: "The users could not be retrieved."
    });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  const posts = await db.getUserPosts(req.params.id);
  if (posts) {
    res.status(200).json(posts);
  } else {
    next({
      status: 500,
      message: "The user's posts could not be retrieved."
    });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  const deletedUser = await db.remove(req.params.id);
  if (deletedUser) {
    res.status(200).json(req.user);
  } else {
    next({
      status: 500,
      message: "The user information could not be removed."
    });
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  const updatedUser = await db.update(req.params.id, req.body);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    next({
      status: 500,
      message: "The user information could not be updated."
    });
  }
});

//error handler
router.use((err, req, res, next) => {
  // console.error(err);

  res.status(err.status).json({ message: err.message });
});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.getById(id);
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

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      next({
        status: 400,
        message: "missing required name field"
      });
    }
  } else {
    next({
      status: 400,
      message: "missing user data"
    });
  }
}

function validatePost(req, res, next) {}

module.exports = router;
