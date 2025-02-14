import React, { useState, useEffect, useRef } from 'react';
import { Home, ShoppingCart } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { useCartStore } from '../stores/cartStore';
import { CartModal } from './CartModal';
import { useClickOutside } from '../hooks/useClickOutside';
import type { Category } from '../types/database';

export function Layout() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items, syncCart } = useCartStore();
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(profileDropdownRef, () => setIsProfileDropdownOpen(false));

  useEffect(() => {
    syncCart();
  }, [user, syncCart]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*');
        
        if (fetchError) {
          console.error('Error fetching categories:', fetchError);
          setError('Unable to load categories. Please try again later.');
          return;
        }

        if (!data) {
          setError('No categories found.');
          return;
        }
        
        // Define the desired order of categories by slug
        const categoryOrder = [
          'wooden-houses',
          'storage-sheds',
          'small-cabins',
          'carports',
          'sauna',
          'building-materials'
        ];

        // Sort the categories based on the defined order
        const sortedCategories = categoryOrder
          .map(slug => data?.find(cat => cat.slug === slug))
          .filter((cat): cat is Category => cat !== undefined);

        setCategories(sortedCategories);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('An unexpected error occurred. Please try again later.');
      }
    }

    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        {error && (
          <div className="bg-red-50 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-700 hover:text-red-600"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Home className="h-6 w-6 text-gray-900" />
                <span className="ml-2 text-lg font-medium text-gray-900">WoodCraft</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-900">🌙</button>
              <button className="text-gray-500 hover:text-gray-900">❤️</button>
              <button className="text-gray-500 hover:text-gray-900">🌐</button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-500 hover:text-gray-900"
              >
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  👤
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-lg py-1 z-50 shadow-lg">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Create account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className="flex space-x-8">
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Product Categories
                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-100 rounded-lg py-1 z-50">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </button>
              </div>
              <Link to="/delivery" className="text-gray-600 hover:text-gray-900">Delivery Options</Link>
              <Link to="/assembly" className="text-gray-600 hover:text-gray-900">Assembly Service</Link>
              <Link to="/custom" className="text-gray-600 hover:text-gray-900">Custom Design</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About & Help</Link>
            </div>
          </div>
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Outlet />

      {/* Footer remains the same */}
      {/* ... */}
    </div>
  );
}