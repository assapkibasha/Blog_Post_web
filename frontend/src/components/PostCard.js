import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.featured_image && (
        <Link to={`/post/${post.slug}`}>
          <img
            src={`${API_URL}${post.featured_image}`}
            alt={post.title}
            className="w-full h-48 object-cover hover:opacity-90 transition"
          />
        </Link>
      )}
      
      <div className="p-6">
        {post.category_name && (
          <Link 
            to={`/category/${post.category_slug}`}
            className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-dark font-semibold mb-2"
          >
            <Tag size={16} />
            {post.category_name}
          </Link>
        )}
        
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-2xl font-bold text-primary hover:text-secondary transition mb-3">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {formatDate(post.created_at)}
            </span>
            {post.views > 0 && (
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {post.views}
              </span>
            )}
          </div>
        </div>
        
        <Link
          to={`/post/${post.slug}`}
          className="inline-block bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-lg transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
