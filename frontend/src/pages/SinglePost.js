import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postAPI } from '../utils/api';
import Loading from '../components/Loading';
import { Calendar, Eye, Tag, ArrowLeft, Share2 } from 'lucide-react';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getPostBySlug(slug);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <Loading />;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Post Not Found</h2>
          <Link to="/" className="text-secondary hover:text-secondary-dark">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Post Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.featured_image && (
            <img
              src={`${API_URL}${post.featured_image}`}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            {/* Category */}
            {post.category_name && (
              <Link
                to={`/category/${post.category_slug}`}
                className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-dark font-semibold mb-4"
              >
                <Tag size={16} />
                {post.category_name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={18} />
                {post.views} views
              </span>
              <span className="text-gray-500">By {post.author_name}</span>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Button */}
            <div className="border-t pt-6">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg transition"
              >
                <Share2 size={20} />
                Share this post
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SinglePost;
