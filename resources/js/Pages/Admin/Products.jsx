import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminNav from '../../Components/AdminNav';
import { authAPI, adminProductAPI } from '../../api';
import SiteLayout from '../../Components/SiteLayout';

export default function Products() {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: '',
    badge: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminProductAPI.getAll();
      setProducts(response.data.data || response.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      category: product.category || '',
      image_url: product.image_url || '',
      badge: product.badge || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminProductAPI.destroy(id);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await adminProductAPI.update(editingProduct.id, formData);
      } else {
        await adminProductAPI.create(formData);
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '', badge: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '', badge: '' });
    setShowModal(true);
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
      fetchProducts();
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
      <Head title="Products" />
      <SiteLayout>
        <AdminNav />
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-headline text-4xl font-bold text-on-surface">Products</h1>
              <p className="text-on-surface-variant">Manage inventory, pricing, and product listings.</p>
            </div>
            <button 
              onClick={handleOpenAdd}
              className="rounded-full bg-primary px-6 py-3 text-on-primary font-semibold hover:bg-primary-dim transition-all"
            >
              Add Product
            </button>
          </div>

          {error && <div className="p-4 bg-error-container text-on-error-container rounded-lg">{error}</div>}

          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] bg-surface-container-low editorial-shadow">
              <table className="min-w-full text-left text-sm text-on-surface-variant">
                <thead className="border-b border-outline-variant/20 bg-surface-container-highest text-on-surface">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-outline-variant/10 last:border-b-0 bg-white/80">
                      <td className="px-6 py-4 font-semibold text-on-surface">{product.name}</td>
                      <td className="px-6 py-4">${parseFloat(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface hover:bg-primary-container hover:text-on-primary transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full bg-error px-4 py-2 text-sm font-semibold text-on-error hover:bg-error-container transition-all"
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
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-surface-container-highest rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-on-surface mb-6">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || '' })}
                          className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">Stock</label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || '' })}
                          className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Image URL</label>
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Badge</label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description (optional)"
                      className="w-full p-3 border border-outline rounded-xl bg-surface-container text-on-surface focus:outline-none focus:border-primary h-24 resize-vertical"
                    />
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      type="submit"
                      className="flex-1 rounded-full bg-primary px-6 py-3 text-on-primary font-semibold hover:bg-primary-dim transition-all"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-full bg-surface-container px-6 py-3 text-on-surface-variant font-semibold hover:bg-surface-container-high transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </SiteLayout>
    </>
  );
}
