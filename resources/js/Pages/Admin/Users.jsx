import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminNav from '../../Components/AdminNav';
import { authAPI, adminUserAPI } from '../../api';
import SiteLayout from '../../Components/SiteLayout';

export default function Users() {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Delete this user?')) {
      try {
        await adminUserAPI.destroy(id);
        fetchUsers();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminUserAPI.getAll();
      setUsers(response.data.data || response.data);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        if (response.data?.email !== 'admin@gmail.com') {
          window.location.href = '/login';
          return;
        }
      } catch (err) {
        window.location.href = '/login';
        return;
      }
      setCheckingAccess(false);
      fetchUsers();
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
      <Head title="Users" />
      <SiteLayout>
        <AdminNav />
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
            <div>
              <h1 className="font-headline text-4xl font-bold text-on-surface">Users</h1>
  <p className="text-on-surface-variant">View registered accounts.</p>
            </div>
            <div className="space-x-3">

            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-on-surface-variant">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] bg-surface-container-low editorial-shadow">
              <table className="min-w-full text-left text-sm text-on-surface-variant">
                <thead className="border-b border-outline-variant/20 bg-surface-container-highest text-on-surface">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Orders</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Dynamic rows */}
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-outline-variant/10 bg-white/80 hover:bg-surface-container-low">
                      <td className="px-6 py-4 font-semibold text-on-surface">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                          Customer
                        </span>
                      </td>
                      <td className="px-6 py-4">{user.orders_count}</td>
                      <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="rounded-full bg-error px-4 py-2 text-sm font-semibold text-on-error hover:bg-error-container hover:text-on-error-container"
                        >
                          Delete
                        </button>
                      </td>
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

