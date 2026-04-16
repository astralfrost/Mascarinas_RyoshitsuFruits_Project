import React, { useContext, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import SiteLayout from '../Components/SiteLayout';
import { AppContext } from '../Contexts/AppContext';
import api from '../api';

export default function Offers() {
  const { user, addToCart } = useContext(AppContext);
  const [adding, setAdding] = useState({});

  const handleOfferAdd = async (productSlug, buttonId) => {
    if (!user) {
      if (confirm('Login required. Open login page?')) {
        window.location.href = '/login';
      }
      return;
    }

    setAdding(prev => ({...prev, [buttonId]: true}));
    
    try {
const response = await api.get(`/api/products/${productSlug}`);
      if (!response.data) {
        throw new Error(`Product not found: ${productSlug}`);
      }
      const product = response.data;
      await addToCart(product.id, 1);
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error('Offer add error:', err);
      alert('Failed to add to cart. Product not found or server error.');
    } finally {
      setAdding(prev => ({...prev, [buttonId]: false}));
    }
  };

  return (
    <>
      <Head title="Special Offers - RYŌSHITSU FRUITS" />
      <SiteLayout>
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="font-headline text-6xl font-bold text-primary mb-6">Special Harvest Offers</h1>
            <p className="text-xl text-on-surface-variant max-w-3xl mx-auto">
              Limited time seasonal deals on our rarest varietals. First come, first served.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Heirloom Peach Box */}
            <div className="group bg-surface-container-lowest rounded-3xl p-8 hover:shadow-2xl transition-all border hover:border-primary">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                <img src="\images\peach.png" alt="Peach Box" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="bg-error text-on-error px-3 py-1 rounded-full text-xs font-bold">50% OFF</span>
                  <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-xs font-bold">LIMITED</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Heirloom Peach Box</h3>
                <p className="text-on-surface-variant line-through">$25.00</p>
                <p className="text-primary text-2xl font-bold">$12.50</p>
                <button 
                  onClick={() => handleOfferAdd('heirloom-peach-box', 'peach-btn')} 
                  disabled={adding['peach-btn']}
                  className="w-full block bg-primary text-on-primary py-3 rounded-2xl text-center font-bold hover:bg-primary-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  {adding['peach-btn'] ? 'Adding...' : 'Claim Offer'}
                  <span className="material-symbols-outlined text-sm ml-2">add_shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Exotic Berry Trio */}
            <div className="group bg-surface-container-lowest rounded-3xl p-8 hover:shadow-2xl transition-all border hover:border-primary">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                <img src="\images\berry.png" alt="Berry Mix" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="bg-success text-on-success px-3 py-1 rounded-full text-xs font-bold">BUY 2 GET 1</span>
                  <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold">TODAY ONLY</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Exotic Berry Trio</h3>
                <p className="text-primary text-2xl font-bold">$28.00</p>
                <button 
                  onClick={() => handleOfferAdd('exotic-berry-trio', 'berry-btn')} 
                  disabled={adding['berry-btn']}
                  className="w-full block bg-primary text-on-primary py-3 rounded-2xl text-center font-bold hover:bg-primary-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  {adding['berry-btn'] ? 'Adding...' : 'Add to Cart'}
                  <span className="material-symbols-outlined text-sm ml-2">add_shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Yuzu Citrus Pack */}
            <div className="group bg-surface-container-lowest rounded-3xl p-8 hover:shadow-2xl transition-all border hover:border-primary">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                <img src="\images\citrus.png" alt="Citrus" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold">NEW</span>
                  <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-xs font-bold">FIRST HARVEST</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Yuzu Citrus Pack</h3>
                <p className="text-primary text-2xl font-bold">$19.99</p>
                <button 
                  onClick={() => handleOfferAdd('yuzu-citrus-pack', 'yuzu-btn')} 
                  disabled={adding['yuzu-btn']}
                  className="w-full block bg-primary text-on-primary py-3 rounded-2xl text-center font-bold hover:bg-primary-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  {adding['yuzu-btn'] ? 'Adding...' : 'Shop Yuzu'}
                  <span className="material-symbols-outlined text-sm ml-2">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/products" className="inline-flex items-center gap-4 bg-surface-container-high hover:bg-primary hover:text-on-primary px-12 py-6 rounded-full font-bold text-lg border border-outline-variant transition-all shadow-lg">
              View All Products
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
