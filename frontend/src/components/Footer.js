import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">My Blog</h3>
            <p className="text-gray-300">
              Sharing thoughts, experiences, and insights on technology, lifestyle, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-accent transition">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/assap97289" target="_blank" rel="noopener noreferrer"
                 className="text-gray-300 hover:text-accent transition">
                <Twitter size={24} />
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-300 hover:text-accent transition">
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@myblog.com"
                 className="text-gray-300 hover:text-accent transition">
                <Mail size={24} />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg w-full text-gray-900 focus:outline-none"
                />
                <button className="bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} My Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
