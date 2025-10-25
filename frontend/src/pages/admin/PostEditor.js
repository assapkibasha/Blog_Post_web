import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postAPI, categoryAPI } from '../../utils/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category_id: '',
    status: 'draft'
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await postAPI.getPostById(id);
      const post = response.data;
      setFormData({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        category_id: post.category_id || '',
        status: post.status
      });
      if (post.featured_image) {
        const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
        setImagePreview(`${API_URL}${post.featured_image}`);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('category_id', formData.category_id);
      data.append('status', status);
      
      if (featuredImage) {
        data.append('featured_image', featuredImage);
      }

      if (isEditMode) {
        await postAPI.updatePost(id, data);
      } else {
        await postAPI.createPost(data);
      }

      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-secondary hover:text-secondary-dark mb-4 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-primary">
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
              placeholder="Enter your post title..."
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg cursor-pointer transition">
                <ImageIcon size={20} />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt (Short Summary)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              placeholder="Brief description of your post..."
            ></textarea>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              className="bg-white"
              style={{ height: '400px', marginBottom: '50px' }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition disabled:bg-gray-300"
            >
              <Save size={20} />
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={loading}
              className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 transition disabled:bg-gray-300"
            >
              <Save size={20} />
              {isEditMode ? 'Update & Publish' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
