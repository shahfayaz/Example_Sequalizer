const db = require("../models");
const { User, Post, Comment } = db;

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.query);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { lastName: req.query.lastName },
      order: [["id", "ASC"]],
      attributes: ["id", "firstName", "lastName", "age", "email", "createdAt"],
      include: [
        {
          model: Post,
          as: "posts",
          order: [["id", "ASC"]],
          attributes: ["id", "title", "content", "createdAt"],
          include: [
            {
              model: Comment,
              as: "comments",
              order: [["id", "ASC"]],
              attributes: ["id", "text", "createdAt"],
            },
          ],
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPost = async (req, res) => {
  try {
    const post = await Post.create(req.query);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.query);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: { id: req.query.id },
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
