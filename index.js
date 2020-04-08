const express = require("express");

const Posts = require("./data/seeds/01-posts");

const Comments = require("./data/seeds/02-comments");

const server = express();

server.use(express.json());

//POST
server.post("/api/posts", (req, res) => {
  Posts.add(req.body)
    .then((post) => {
      if (post) {
        res.status(201).json(post);
      } else {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

//POST BY ID
server.post("/api/posts/:id/comments", (req, res) => {
  Comments.findById(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else {
        res
          .status(400)
          .json({ message: "Please provide text for the comment." });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          message:
            "There was an error while saving the comment to the database",
        });
    });
});

server.listen(4000, () => {
  console.log("Server Running");
});
