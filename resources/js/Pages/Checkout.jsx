import React, { useState, useEffect, useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';
import { orderAPI } from '../api';
import SiteLayout from '../Components/SiteLayout';

export default function Checkout() {
  const { user, cart: cartItems, cartTotal: contextCartTotal, loadCart } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    shipping_address: '',
    shipping_city: '',
    shipping_zipcode: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        customer_name: user.name,
        customer_email: user.email,
        shipping_address: '',
        shipping_city: '',
        shipping_zipcode: '',
        notes: '',
      });
      loadCart();
    }
    setLoading(false);
  }, [user, loadCart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const response = await orderAPI.checkout(formData);
      const orderId = response.data.order.id;
      window.location.href = `/order-confirmation?orderId=${orderId}`;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-headline text-4xl font-bold mb-4">Please Log In</h1>
          <p className="text-on-surface-variant mb-8">You need to be logged in to checkout.</p>
          <Link href="/login" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:bg-primary-dim transition-all inline-block">
            Login
          </Link>
        </div>
      </SiteLayout>
    );
  }

  if (loading) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-on-surface-variant">Loading checkout...</p>
        </div>
      </SiteLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-headline text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-on-surface-variant mb-8">Add some fruits before checking out.</p>
          <Link href="/products" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:bg-primary-dim transition-all inline-block">
            Continue Shopping
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <>
      <Head title="Checkout" />
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-headline text-4xl font-bold text-on-surface">Checkout</h1>
                  <p className="text-on-surface-variant">Complete your order with secure payment and delivery details.</p>
                </div>
                <span className="rounded-full bg-tertiary-container px-4 py-2 text-sm font-bold text-on-tertiary-container">
                  Express delivery
                </span>
              </div>

              {error && (
                <div className="rounded-full bg-error-container text-on-error-container p-4 text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleCheckout} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="font-bold text-on-surface">Shipping Address</h2>
                  <input
                    className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                    placeholder="Full Name"
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                    placeholder="Email"
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                    placeholder="Street Address"
                    type="text"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                      placeholder="City"
                      type="text"
                      name="shipping_city"
                      value={formData.shipping_city}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                      placeholder="ZIP Code"
                      type="text"
                      name="shipping_zipcode"
                      value={formData.shipping_zipcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-bold text-on-surface">Order Notes</h2>
                  <textarea
                    className="w-full min-h-[160px] rounded-3xl bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                    placeholder="Leave delivery instructions..."
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm text-on-surface-variant">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm text-on-surface-variant border-t border-outline-variant/20 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${contextCartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>$6.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>$1.50</span>
                </div>
              </div>
              <div className="mt-6 border-t border-outline-variant/20 pt-6 text-lg font-bold flex justify-between text-on-surface">
                <span>Total</span>
<span>${(contextCartTotal + 6 + 1.5).toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="mt-8 block w-full text-center bg-primary text-on-primary py-4 rounded-full font-bold hover:bg-primary-dim transition-all disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
              <Link href="/cart" className="mt-4 block w-full text-center text-primary font-semibold hover:underline">
                Back to Cart
              </Link>
            </div>
          </aside>
        </section>
      </SiteLayout>
    </>
  );
}
