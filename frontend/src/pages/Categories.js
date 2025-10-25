import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryAPI, postAPI } from '../utils/api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import { Tag } from 'lucide-react';

const Categories = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (slug) {
      fetchPostsByCategory(slug);
    }
  }, [slug]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const fetchPostsByCategory = async (categorySlug) => {
    try {
      setLoading(true);
      const response = await postAPI.getAllPosts({ category: categorySlug });
      setPosts(response.data.posts);
      const category = categories.find(c => c.slug === categorySlug);
      setSelectedCategory(category);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {selectedCategory ? selectedCategory.name : 'Categories'}
          </h1>
          <p className="text-xl text-accent-light">
            {selectedCategory 
              ? `Browse posts in ${selectedCategory.name}` 
              : 'Explore posts by topic'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!slug ? (
          // Show all categories
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Tag className="text-secondary" size={24} />
                  <h3 className="text-xl font-bold text-primary">{category.name}</h3>
                </div>
                <p className="text-gray-600">
                  {category.post_count} {category.post_count === 1 ? 'post' : 'posts'}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          // Show posts for selected category
          <>
            <div className="mb-8">
              <Link to="/categories" className="text-secondary hover:text-secondary-dark">
                ← Back to all categories
              </Link>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-xl">No posts in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
