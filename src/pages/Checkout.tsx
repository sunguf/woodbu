import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuth } from '../lib/auth';

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    eircode: '',
    phone: '',
    email: user?.email || '',
  });

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Payment integration will be added here
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              {/* Shipping Details Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Shipping details</h2>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                        Address line 1
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        value={shippingDetails.addressLine1}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, addressLine1: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                        Address line 2 (optional)
                      </label>
                      <input
                        type="text"
                        id="addressLine2"
                        value={shippingDetails.addressLine2}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, addressLine2: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingDetails.city}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                        County
                      </label>
                      <input
                        type="text"
                        id="county"
                        value={shippingDetails.county}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, county: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="eircode" className="block text-sm font-medium text-gray-700">
                        Eircode
                      </label>
                      <input
                        type="text"
                        id="eircode"
                        value={shippingDetails.eircode}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, eircode: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md border border-transparent bg-amber-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.product_id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 rounded-md"
                        />
                      </div>
                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                {item.product.name}
                              </a>
                            </h4>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between">
                          <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.product.currency}
                            {(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">€{total.toLocaleString()}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">Calculated at next step</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">€{total.toLocaleString()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}