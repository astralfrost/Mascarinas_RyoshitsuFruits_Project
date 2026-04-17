import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminNav from '../../Components/AdminNav';

import { authAPI } from '../../api';
import SiteLayout from '../../Components/SiteLayout';

export default function Overview() {
  const [checkingAccess, setCheckingAccess] = useState(true);

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
      <Head title="Admin Overview" />
<SiteLayout>
        <AdminNav />
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-headline text-4xl font-bold text-on-surface">Dashboard</h1>
              <p className="text-on-surface-variant">Monitor sales and product performance at a glance.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/products" className="rounded-full bg-primary px-6 py-3 text-on-primary font-semibold hover:bg-primary-dim transition-all">
                Manage Products
              </Link>
              <Link href="/admin/orders" className="rounded-full bg-secondary-container px-6 py-3 text-on-secondary-container font-semibold hover:bg-secondary-dim transition-all">
                View Orders
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { label: 'New Orders', value: '48', tone: 'bg-primary-container text-on-primary-container' },
              { label: 'Revenue', value: '$18.4K', tone: 'bg-secondary-container text-on-secondary-container' },
              { label: 'Products Live', value: '64', tone: 'bg-tertiary-container text-on-tertiary-container' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
                <p className="text-sm uppercase tracking-[0.25em] text-on-surface-variant mb-4">{metric.label}</p>
                <p className={`text-4xl font-bold ${metric.tone}`}>{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Recent Activity</h2>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li className="rounded-3xl bg-surface-container-highest p-5">New product "Blood Oranges" added to the catalog.</li>
                <li className="rounded-3xl bg-surface-container-highest p-5">Order #RF-5821 moved to shipping.</li>
                <li className="rounded-3xl bg-surface-container-highest p-5">Inventory restock completed for cherries.</li>
              </ul>
            </div>
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Shortcuts</h2>
              <div className="grid gap-4">
                {[
                  { label: 'Add New Product', href: '/admin/products' },
                  { label: 'Review Orders', href: '/admin/orders' },
                  { label: 'Update Pricing', href: '/admin/products' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="rounded-3xl bg-surface-container-highest px-6 py-5 font-semibold text-on-surface hover:bg-primary-container hover:text-on-primary transition-all"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
