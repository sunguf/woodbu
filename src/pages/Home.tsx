import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Category } from '../types/database';

export function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        console.error('Error fetching categories:', error);
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
    }

    fetchCategories();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to WoodCraft
            </h1>
            <p className="mt-4 text-xl text-gray-500 font-light">
              Discover Ireland's Easiest Premium Affordable Wooden Structures
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/category/${category.slug}`}
              key={category.id}
              className="relative group overflow-hidden aspect-square rounded-xl"
            >
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 rounded-xl">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-light">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Professional advice</h3>
              <p className="text-sm text-gray-500">
                for selecting, assembling and maintaining the product.
                <Link to="/contact" className="block mt-2 text-gray-900">Send inquiry</Link>
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-500">
                within Ireland (mainland). Unloading free curbside.
                <Link to="/delivery" className="block mt-2 text-gray-900">Everything about delivery</Link>
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">💶</div>
              <h3 className="text-base font-medium text-gray-900 mb-2">20-30% deposit</h3>
              <p className="text-sm text-gray-500">
                is enough to confirm the order.
                <Link to="/payment" className="block mt-2 text-gray-900">Everything about payment</Link>
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-base font-medium text-gray-900 mb-2">10-year guarantee</h3>
              <p className="text-sm text-gray-500">
                for houses larger than 40m². 5-year guarantee for smaller products.
                <Link to="/guarantee" className="block mt-2 text-gray-900">All about the guarantee</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}