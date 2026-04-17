import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminNav from '../../Components/AdminNav';

import { authAPI, adminOrderAPI } from '../../api';
import SiteLayout from '../../Components/SiteLayout';

const statusStyles = {
  completed: 'bg-primary-container text-on-primary-container',
  shipped: 'bg-tertiary-container text-on-tertiary-container',
  processing: 'bg-secondary-container text-on-secondary-container',
};

export default function Orders() {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await adminOrderAPI.getAll();
      setOrders(response.data.data || response.data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        if (!response.data?.is_admin) {
          window.location.href = '/login';
          return;
        }
      } catch (err) {
        window.location.href = '/login';
        return;
      }
      setCheckingAccess(false);
      fetchOrders();
    };
    checkAdmin();
  }, []);

  if (checkingAccess) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-on-surface-variant">Checking admin access...</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <>
      <Head title="Orders" />
      <SiteLayout>
        <AdminNav />
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
            <div>
              <h1 className="font-headline text-4xl font-bold text-on-surface">Orders</h1>
              <p className="text-on-surface-variant">Review recent purchases and shipping status.</p>
            </div>
            <div className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface-variant">
              Updated just now
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-on-surface-variant">Loading orders...</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] bg-surface-container-low editorial-shadow">
              <table className="min-w-full text-left text-sm text-on-surface-variant">
                <thead className="border-b border-outline-variant/20 bg-surface-container-highest text-on-surface">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-outline-variant/10 last:border-b-0 bg-white/80">
                      <td className="px-6 py-4 font-semibold text-on-surface">#{order.id}</td>
                      <td className="px-6 py-4">{order.user?.name || order.customer_name || order.customer_email}</td>
                      <td className="px-6 py-4">${parseFloat(order.total).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status.toLowerCase()] || 'bg-secondary-container text-on-secondary-container'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </SiteLayout>
    </>
  );
}
