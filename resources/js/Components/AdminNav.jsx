import React from 'react';
import { Link, usePage } from '@inertiajs/react';

import { authAPI } from '../api.js';

export default function AdminNav() {
  const { url } = usePage();
  
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { href: '/admin/orders', label: 'Orders', icon: 'shopping_cart' },
    { href: '/admin/products', label: 'Products', icon: 'inventory_2' },
    { href: '/admin/users', label: 'Users', icon: 'people' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  };

  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
            url.startsWith(item.href)
              ? 'bg-primary text-on-primary shadow-lg'
              : 'bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container'
          }`}
        >
          <span className="material-symbols-outlined text-lg !text-inherit">
            {item.icon}
          </span>
          {item.label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="px-6 py-3 rounded-full bg-error text-on-error font-semibold hover:bg-error-dim transition-all flex items-center gap-2 ml-auto"
      >
        <span className="material-symbols-outlined text-lg !text-inherit">logout</span>
        Logout
      </button>
    </nav>
  );
}

