import React, { useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';
import SiteLayout from '../Components/SiteLayout';

export default function ProductDetail({ product }) {
  const { user, addToCart } = useContext(AppContext);

  const handleAddToCart = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    const success = await addToCart(product.id, 1);
    if (success) {
      alert('Product added to cart!');
    } else {
      alert('Failed to add to cart');
    }
  };

  return (
    <>
      <Head title={product.name} />
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] overflow-hidden editorial-shadow bg-surface-container-lowest">
              <img
                alt={product.name}
                className="w-full h-[520px] object-cover"
                src={product.image_url || '/images/berry.png'}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.badge ? (
                <span className="inline-flex items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container px-4 py-2 text-sm font-semibold font-bold">
                  {product.badge}
                </span>
              ) : null}
              {['Organic', 'Fresh', 'Picked Today'].slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center justify-center rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-bold text-primary">{product.name}</h1>
              <p className="text-on-surface-variant leading-relaxed max-w-2xl">
                {product.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-4xl font-bold text-secondary">${product.price.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-on-surface-variant">
                <div>
                  <p className="font-semibold text-on-surface">Weight</p>
                  <p>1 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-on-surface">Availability</p>
                  <p>In Stock</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-on-surface">Add to Cart</h2>
                  <p className="text-sm text-on-surface-variant">Secure your harvest before it sells out.</p>
                </div>
                <span className="text-4xl font-bold text-secondary">${product.price.toFixed(2)}</span>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-on-surface mb-2">Quantity</label>
                <input className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20" type="number" defaultValue={1} min={1} />
              </div>
              {user ? (
                <button onClick={handleAddToCart} className="mt-6 w-full bg-primary text-on-primary py-4 rounded-full font-bold hover:bg-primary-dim transition-all">
                  Add to Cart
                </button>
              ) : (
                <Link href="/login" className="mt-6 block w-full text-center bg-primary text-on-primary py-4 rounded-full font-bold hover:bg-primary-dim transition-all">
                  Login to add
                </Link>
              )}
            </div>

            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <h3 className="font-headline text-xl font-bold text-on-surface mb-4">Why Customers Love It</h3>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>Hand-selected from our organic groves.</li>
                <li>Delivered chilled and ready to enjoy.</li>
                <li>Perfect for breakfast, smoothies, and gifting.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-surface-container-low p-8 editorial-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-headline text-xl font-bold text-on-surface">Recommended</h3>
                <Link href="/products" className="text-primary font-semibold hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {['Pink Dragon Fruit', 'Valencia Oranges', 'Rainier Cherries'].map((item) => (
                  <div key={item} className="rounded-3xl bg-surface-container-highest px-4 py-4">
                    <p className="font-semibold text-on-surface">{item}</p>
                    <p className="text-sm text-on-surface-variant">Fresh from the orchard.</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </SiteLayout>
    </>
  );
}
