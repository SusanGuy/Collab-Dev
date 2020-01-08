const express = require("express");
const router = new express.Router();
const User = require("../../modal/user");
const Post = require("../../modal/posts");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array()
      });
    }
    try {
      const user = await User.findById(req.user.id);
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.send(post);
    } catch (error) {}
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1
    });
    if (!posts) {
      return res.status(400).send({
        msg: "No any Posts Found"
      });
    }

    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({
        msg: "Post Not Found"
      });
    }
    res.json(post);
  } catch (error) {
    if ((error.kind = "ObjectId")) {
      return res.status(400).send({
        msg: "Post not found"
      });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({
        msg: "Post Not Found"
      });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({
        msg: "Not Authorized"
      });
    }

    await post.remove();

    res.json({
      msg: "Post Removed"
    });
  } catch (error) {
    if ((error.kind = "ObjectId")) {
      return res.status(400).send({
        msg: "Post not found"
      });
    }
    res.status(500).send("Server Error");
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({
        msg: "Post Not Found"
      });
    }
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).send({
        msg: "Post already liked"
      });
    }
    post.likes.unshift({
      user: req.user.id
    });
    await post.save();
    res.send(post.likes);
  } catch (error) {
    console.log(error.message);
    if ((error.kind = "ObjectId")) {
      return res.status(400).send({
        msg: "Post not found"
      });
    }
    res.status(500).send("Server Error");
  }
});

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({
        msg: "Post Not Found"
      });
    }
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).send({
        msg: "Post hasn't yet been liked"
      });
    }

    const removeIndex = post.likes.map(like =>
      like.user.toString().indexOf(req.user.id)
    );

    post.likes.splice(removeIndex, 1);
    await post.save();

    await post.save();
    res.send(post.likes);
  } catch (error) {
    if ((error.kind = "ObjectId")) {
      return res.status(400).send({
        msg: "Post not found"
      });
    }
    res.status(500).send("Server Error");
  }
});

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array()
      });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).send({
          msg: "Post Not Found"
        });
      }
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();

      res.send(post.comments);
    } catch (error) {
      if ((error.kind = "ObjectId")) {
        return res.status(400).send({
          msg: "Post not found"
        });
      }
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        msg: "Post Not Found"
      });
    }
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).send({
        msg: "Comment Not Found"
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({
        msg: "Not Authorized"
      });
    }
    const newComments = post.comments.filter(comment => {
      return comment.id !== req.params.comment_id;
    });
    post.comments = newComments;
    await post.save();

    res.json({
      msg: "Comment Removed"
    });
  } catch (error) {
    if ((error.kind = "ObjectId")) {
      return res.status(400).send({
        msg: "Post/Comment not found"
      });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
