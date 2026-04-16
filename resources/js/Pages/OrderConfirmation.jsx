import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { orderAPI } from '../api';
import SiteLayout from '../Components/SiteLayout';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get order ID from URL parameters
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');

    if (orderId) {
      loadOrder(orderId);
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, []);

  const loadOrder = async (orderId) => {
    try {
      const response = await orderAPI.getById(orderId);
      setOrder(response.data);
    } catch (err) {
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-on-surface-variant">Loading order details...</p>
        </div>
      </SiteLayout>
    );
  }

  if (error || !order) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="font-headline text-4xl font-bold mb-4">Error</h1>
          <p className="text-on-surface-variant mb-8">{error || 'Order not found'}</p>
          <Link href="/products" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:bg-primary-dim transition-all inline-block">
            Continue Shopping
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString();
  const totalItems = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <>
      <Head title="Order Confirmation" />
      <SiteLayout>
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="rounded-[2rem] bg-surface-container-low p-16 editorial-shadow">
            <span className="inline-flex items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] mb-6">
              Order Complete
            </span>
            <h1 className="font-headline text-5xl font-bold text-on-surface mb-4">Thank you for your purchase!</h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10">
              Your order is being prepared for shipment. Expect a confirmation email with tracking details soon.
            </p>
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              <div className="rounded-[2rem] bg-surface-container-high p-8 text-left">
                <h2 className="font-bold text-on-surface mb-3">Order #{order.id}</h2>
                <p className="text-sm text-on-surface-variant">Placed on {orderDate}</p>
              </div>
              <div className="rounded-[2rem] bg-surface-container-high p-8 text-left">
                <h2 className="font-bold text-on-surface mb-3">Total Amount</h2>
<p className="text-lg font-bold text-secondary">${order.total.toFixed(2)}</p>
                <p className="text-sm text-on-surface-variant">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
              </div>
              <div className="rounded-[2rem] bg-surface-container-high p-8 text-left">
                <h2 className="font-bold text-on-surface mb-3">Delivery</h2>
                <p className="text-sm text-on-surface-variant">{order.shipping_address}</p>
                <p className="text-sm text-on-surface-variant">{order.shipping_city}, {order.shipping_zipcode}</p>
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="rounded-[2rem] bg-surface-container-high p-8 text-left mb-8">
                <h2 className="font-bold text-on-surface mb-4">Order Items</h2>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-on-surface-variant pb-3 border-b border-outline-variant/20 last:border-b-0">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:bg-primary-dim transition-all">
                Continue Shopping
              </Link>
              <Link href="/" className="text-primary font-semibold hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
