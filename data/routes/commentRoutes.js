const router = require("express").Router();
const db = require("../db");

//GET COMMENTS BY ID
router.get("/api/posts/:id/comments/", (req, res) => {
    db.findCommentById(req.params.id)
      .then((comment) => {
        if (comment.length > 0) {
          res.status(200).json(comment);
        } else {
          res.status(404).json({
            message: "Comment not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error retrieving the comment",
        });
      });
  });

module.exports = router;
