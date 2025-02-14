import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../stores/cartStore';
import type { Product } from '../types/database';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      setLoading(true);
      
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (data) {
        setProduct(data);
        setSelectedImage(data.images[0]);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await addItem(product.id, {
        name: product.name,
        price: product.price,
        currency: product.currency,
        images: product.images,
        slug: product.slug
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Media Gallery */}
        <div>
          <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  selectedImage === image ? 'ring-2 ring-amber-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="text-3xl font-bold text-amber-600 mb-6">
            {product.currency}{product.price.toLocaleString()}
          </div>
          
          <div className="prose prose-amber max-w-none mb-8">
            <p>{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <dl className="grid grid-cols-1 gap-4">
              {product.specifications.size && (
                <>
                  <div>
                    <dt className="font-medium text-gray-900">Dimensions</dt>
                    <dd className="mt-1 text-gray-600">
                      {product.specifications.size.width}m × {product.specifications.size.length}m × {product.specifications.size.height}m
                    </dd>
                  </div>
                </>
              )}
              {product.specifications.features && (
                <div>
                  <dt className="font-medium text-gray-900">Features</dt>
                  <dd className="mt-1 text-gray-600">
                    <ul className="list-disc list-inside">
                      {product.specifications.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{addingToCart ? 'Adding to Cart...' : 'Add to Cart'}</span>
              <span className="text-2xl">🛒</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}