const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostBySlug,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById
} = require('../controllers/postController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllPosts);
router.get('/slug/:slug', getPostBySlug);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, getAdminPosts);
router.get('/admin/:id', authMiddleware, adminMiddleware, getPostById);
router.post('/', authMiddleware, adminMiddleware, upload.single('featured_image'), createPost);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('featured_image'), updatePost);
router.delete('/:id', authMiddleware, adminMiddleware, deletePost);

module.exports = router;
