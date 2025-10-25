const db = require('../config/database');
const slugify = require('../utils/slugify');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      `SELECT c.*, COUNT(p.id) as post_count
       FROM categories c
       LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
       GROUP BY c.id
       ORDER BY c.name`
    );

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create category (admin only)
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);

    const [result] = await db.query(
      'INSERT INTO categories (name, slug) VALUES (?, ?)',
      [name, slug]
    );

    res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update category (admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const slug = slugify(name);

    await db.query(
      'UPDATE categories SET name = ?, slug = ? WHERE id = ?',
      [name, slug, id]
    );

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete category (admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM categories WHERE id = ?', [id]);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
