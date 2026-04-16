import React, { useState, useEffect, useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';
import { cartAPI } from '../api';
import SiteLayout from '../Components/SiteLayout';

export default function Cart() {
  const { user, cart, cartTotal: contextCartTotal, loadCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState(cart || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartItems(response.data.items || []);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (!user) return;
    if (newQuantity < 1) {
      await handleRemove(productId);
      return;
    }
    try {
      await cartAPI.update(productId, newQuantity);
      await loadCart();
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async (productId) => {
    if (!user) return;
    try {
      await cartAPI.remove(productId);
      await loadCart();
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-on-surface-variant">Loading cart...</p>
        </div>
      </SiteLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SiteLayout>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-headline text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-on-surface-variant mb-8">{user ? 'Start adding some fresh fruits to your order!' : 'Login to add items to your cart!'}</p>
          <Link href={user ? "/products" : "/login"} className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:bg-primary-dim transition-all inline-block">
            {user ? 'Continue Shopping' : 'Login'}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <>
      <Head title="Shopping Cart" />
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-headline text-4xl font-bold text-on-surface">Your Cart</h1>
                  <p className="text-on-surface-variant">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart</p>
                </div>
                <Link href="/products" className="text-primary font-semibold hover:underline">
                  Continue shopping
                </Link>
              </div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="rounded-[2rem] bg-surface-container-highest p-6 grid gap-4 sm:grid-cols-[1fr_auto] items-center">
                    <div>
                      <h2 className="font-bold text-on-surface">{item.product.name}</h2>
                      <p className="text-sm text-on-surface-variant">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2 justify-end">
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                          className="bg-surface-container px-3 py-1 rounded-full text-sm font-bold hover:bg-primary-container transition-all"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                          className="bg-surface-container px-3 py-1 rounded-full text-sm font-bold hover:bg-primary-container transition-all"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-bold text-secondary">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="text-sm text-on-surface-variant hover:text-primary transition-colors mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Items total</span>
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
              <div className="mt-6 flex justify-between items-center border-t border-outline-variant/20 pt-6 text-lg font-bold text-on-surface">
                <span>Total</span>
                <span>${(contextCartTotal + 6 + 1.5).toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-8 block w-full text-center bg-primary text-on-primary py-4 rounded-full font-bold hover:bg-primary-dim transition-all"
              >
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </section>
      </SiteLayout>
    </>
  );
}
