import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-accent hover:text-accent-light transition">
              My Blog
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/categories" className="hover:text-accent transition">Categories</Link>
            <Link to="/about" className="hover:text-accent transition">About</Link>
            <Link to="/contact" className="hover:text-accent transition">Contact</Link>
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-lg transition"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}
            
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-accent hover:text-accent-light"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 hover:bg-secondary rounded-md">Home</Link>
            <Link to="/categories" className="block px-3 py-2 hover:bg-secondary rounded-md">Categories</Link>
            <Link to="/about" className="block px-3 py-2 hover:bg-secondary rounded-md">About</Link>
            <Link to="/contact" className="block px-3 py-2 hover:bg-secondary rounded-md">Contact</Link>
            
            {isAdmin && (
              <Link to="/admin" className="block px-3 py-2 bg-secondary hover:bg-secondary-dark rounded-md">
                Dashboard
              </Link>
            )}
            
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
