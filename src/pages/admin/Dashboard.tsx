import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShoppingBag, Package, FileText } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { name: 'Total Users', value: '...', icon: Users, href: '/admin/users' },
    { name: 'Total Products', value: '...', icon: ShoppingBag, href: '/admin/products' },
    { name: 'Categories', value: '...', icon: Package, href: '/admin/categories' },
    { name: 'Orders', value: '...', icon: FileText, href: '/admin/orders' },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {item.value}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}