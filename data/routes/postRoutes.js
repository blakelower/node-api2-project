const express = require("express");
const router = require("express").Router();
const db = require("../db");

//GET POSTS
router.get("/", (req, res) => {
  db.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Posts" });
    });
});

//GET POSTS BY ID
router.get("/api/posts/:id/comments", (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

//ADD NEW POST
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Invalid Post",
    });
  }
  const newPost = {
    title: req.body.title,
    contents: req.body.contents,
  };
  db.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Can not add post",
      });
    });
});

//UPDATE POST
router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Invalid post",
    });
  }

  const update = {
    title: req.body.title,
    contents: req.body.contents,
  };

  db.update(req.params.id, update)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post could not be found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating post",
      });
    });
});

//DELETE POST
router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been deleted",
        });
      } else {
        res.status(404).json({
          message: "The post could not be found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

module.exports = router;
