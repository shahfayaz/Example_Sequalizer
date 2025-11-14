const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Create a new user
router.get('/user/add', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Add a post to a user
router.get('/user/post/add', userController.addPost);

// Add a comment to a post
router.get('/user/comment/add', userController.addComment);

// Delete a comment
router.get('/user/comment/delete', userController.deleteComment);

// Get users with pagination
router.get('/user/pagination', userController.getUserPagination);

router.get('/user/cache', userController.saveUserByCache);

// Delete a user by ID
router.get('/user/delete', userController.userDelete);

module.exports = router;