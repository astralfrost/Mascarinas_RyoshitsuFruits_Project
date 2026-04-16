import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { authAPI, orderAPI } from '../api';
import SiteLayout from '../Components/SiteLayout';

export default function Account() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    loadOrders();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        localStorage.removeItem('user');
        return;
      }
      
      const response = await authAPI.getCurrentUser();
      setUser(response.data);
    } catch (err) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  };

  const loadOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-on-surface-variant">Loading...</p>
        </div>
      </SiteLayout>
    );
  }
  
  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <>
      <Head title="My Account" />
      <SiteLayout>
        <section className="max-w-4xl mx-auto px-6 py-24">
          <div className="space-y-12">
            <div>
              <h1 className="font-headline text-4xl font-bold text-on-surface">My Account</h1>
              <p className="text-on-surface-variant mt-2">Welcome back, {user.name}!</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-surface-container-low rounded-lg p-6">
                <h2 className="font-headline text-xl font-bold text-on-surface mb-4">Account Information</h2>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Name:</span> {user.name}</p>
                  <p><span className="font-semibold">Email:</span> {user.email}</p>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-lg p-6">
                <h2 className="font-headline text-xl font-bold text-on-surface mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/cart" className="block bg-primary text-on-primary py-2 px-4 rounded-full text-center hover:bg-primary-dim transition-colors">
                    View Cart
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('auth_token');
                      window.location.href = '/';
                    }}
                    className="w-full bg-error text-on-error py-2 px-4 rounded-full hover:bg-error-dim transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-6">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-4">Order History</h2>
              {loading ? (
                <p className="text-on-surface-variant">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-on-surface-variant">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border border-outline rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-on-surface-variant">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <span className="bg-tertiary-container text-on-tertiary-container text-xs font-bold px-2 py-1 rounded-full uppercase">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm mt-2">Total: ${order.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}

