const db = require('../config/database');
const slugify = require('../utils/slugify');

// Get all published posts (public)
const getAllPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug, u.name as author_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.status = 'published'
    `;
    const params = [];

    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [posts] = await db.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM posts p WHERE p.status = "published"';
    if (category) {
      countQuery += ' LEFT JOIN categories c ON p.category_id = c.id WHERE c.slug = ?';
      const [countResult] = await db.query(countQuery, [category]);
      var total = countResult[0].total;
    } else {
      const [countResult] = await db.query(countQuery);
      var total = countResult[0].total;
    }

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single post by slug (public)
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [posts] = await db.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, u.name as author_name
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.slug = ? AND p.status = 'published'`,
      [slug]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    await db.query('UPDATE posts SET views = views + 1 WHERE id = ?', [posts[0].id]);

    res.json(posts[0]);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all posts for admin (including drafts)
const getAdminPosts = async (req, res) => {
  try {
    const [posts] = await db.query(
      `SELECT p.*, c.name as category_name, u.name as author_name
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.author_id = u.id
       ORDER BY p.created_at DESC`
    );

    res.json(posts);
  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create post (admin only)
const createPost = async (req, res) => {
  try {
    const { title, excerpt, content, category_id, status } = req.body;
    const slug = slugify(title);
    const featured_image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.query(
      `INSERT INTO posts (title, slug, excerpt, content, featured_image, category_id, author_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, excerpt, content, featured_image, category_id || null, req.user.id, status || 'draft']
    );

    res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update post (admin only)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category_id, status } = req.body;
    const slug = title ? slugify(title) : undefined;
    const featured_image = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE posts SET ';
    const params = [];
    const updates = [];

    if (title) {
      updates.push('title = ?', 'slug = ?');
      params.push(title, slug);
    }
    if (excerpt !== undefined) {
      updates.push('excerpt = ?');
      params.push(excerpt);
    }
    if (content) {
      updates.push('content = ?');
      params.push(content);
    }
    if (featured_image) {
      updates.push('featured_image = ?');
      params.push(featured_image);
    }
    if (category_id !== undefined) {
      updates.push('category_id = ?');
      params.push(category_id || null);
    }
    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    query += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    await db.query(query, params);

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete post (admin only)
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM posts WHERE id = ?', [id]);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get post by ID (admin)
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const [posts] = await db.query(
      `SELECT p.*, c.name as category_name
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(posts[0]);
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById
};
