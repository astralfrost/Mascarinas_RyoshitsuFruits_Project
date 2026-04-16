import React, { useState, useEffect, useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';
import { productAPI } from '../api';

export default function ProductListing() {
  const { user, addToCart, cart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setAddingToCart(productId);
    const success = await addToCart(productId, 1);
    if (success) {
      alert('Product added to cart!');
    } else {
      alert('Failed to add to cart');
    }
    setAddingToCart(null);
  };

  return (
    <>
      <Head title="Product Listing" />
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-lowest">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-headline text-2xl font-extrabold text-primary tracking-tight">RYŌSHITSU</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/products" className="text-on-surface hover:text-primary transition-colors font-medium">
              Store
            </Link>
            <Link href="/offers" className="text-on-surface hover:text-primary transition-colors font-medium">
              Offers
            </Link>
            <Link href="/about" className="text-on-surface hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-on-surface hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-highest px-4 py-2 rounded-full min-w-[300px]">
            <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
            <input className="bg-transparent border-none outline-none text-sm w-full placeholder:text-on-surface-variant" placeholder="Search for fresh fruit..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2">
              <span className="material-symbols-outlined text-primary">shopping_cart</span>
              <span className="absolute top-0 right-0 bg-error text-on-error text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart ? cart.length : 0}
              </span>
            </Link>
            {user ? (
              <Link href="/account" className="material-symbols-outlined text-primary">account_circle</Link>
            ) : (
              <Link href="/login" className="material-symbols-outlined text-primary">login</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 flex gap-12">
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-12">
{false && user && user.email === 'admin@gmail.com' && (
              <div>
                <h2 className="font-headline text-xl font-bold mb-6 text-primary">Admin Panel</h2>
                <p className="text-sm text-on-surface-variant -mt-4 mb-8">RYŌSHITSU FRUITS Management</p>
                <nav className="space-y-2">
                  <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-container text-on-surface-variant hover:text-on-primary-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Overview</span>
                  </Link>
                  <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-on-surface-variant rounded-lg">
                    <span className="material-symbols-outlined">inventory_2</span>
                    <span>Products</span>
                  </Link>
                  <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-on-surface-variant rounded-lg">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <span>Orders</span>
                  </Link>
                  <a className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-on-surface-variant rounded-lg" href="#">
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                  </a>
                </nav>
              </div>
            )}
            {user && user.email !== 'admin@gmail.com' && (
              <div>
                <h2 className="font-headline text-xl font-bold mb-6 text-primary">My Account</h2>
                <p className="text-sm text-on-surface-variant -mt-4 mb-8">Manage your orders and preferences</p>
                <nav className="space-y-2">
                  <Link href="/account" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-container text-on-surface-variant hover:text-on-primary-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined">account_circle</span>
                    <span>Profile</span>
                  </Link>
                  <Link href="/account" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-on-surface-variant rounded-lg">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <span>My Orders</span>
                  </Link>
                  <a className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-on-surface-variant rounded-lg" href="#">
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                  </a>
                </nav>
              </div>
            )}
            <div className="pt-8 border-t border-outline-variant/20">
              <h3 className="font-headline text-sm uppercase tracking-wider text-on-surface-variant mb-6 font-bold">Categories</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-on-surface group-hover:text-primary transition-colors">Organic Certified</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-on-surface group-hover:text-primary transition-colors">Seasonal Picks</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-on-surface group-hover:text-primary transition-colors">Exotic Varieties</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-sm uppercase tracking-wider text-on-surface-variant mb-6 font-bold">Price Range</h3>
              <input className="w-full accent-primary" type="range" />
              <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2 block">Our Digital Orchard</span>
              <h1 className="text-4xl lg:text-5xl font-headline font-bold text-primary">Fresh Harvest</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-on-surface-variant">Sort by:</span>
              <select className="bg-surface-container-low border-none rounded-full px-6 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrival</option>
              </select>
            </div>
          </header>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-on-surface-variant">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="block">
                  <div className="group relative bg-surface-container-lowest rounded-lg overflow-hidden transition-all duration-500 hover:bg-primary-container">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} src={product.image_url} />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-headline text-xl font-bold group-hover:text-on-primary-container transition-colors">{product.name}</h3>
                          <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase px-2 py-1 rounded-full">{product.badge}</span>
                        </div>
                        <span className="text-secondary font-bold text-lg">${product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-on-surface-variant text-sm mb-6 group-hover:text-on-primary-container/80 line-clamp-2">{product.description}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id); }}
                        disabled={addingToCart === product.id}
                        className="w-full bg-primary text-on-primary py-3 rounded-full flex items-center justify-center gap-2 group-hover:bg-primary-dim transition-all disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                        <span className="font-label text-sm font-bold">
                          {user ? (addingToCart === product.id ? 'Adding...' : 'Add to Cart') : 'Login to add or Register'}
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-20 flex justify-center">
            <button className="px-12 py-4 bg-surface-container-high hover:bg-primary-container text-primary font-bold rounded-full transition-all">
              Discover More Fruits
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant/10 py-16 px-6 mt-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="font-headline text-2xl font-extrabold text-primary tracking-tight">RYŌSHITSU FRUITS</span>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 mt-4">We curate the world's finest organic and exotic fruits, delivering nature's luxury directly to your table with minimal environmental impact.</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">social_leaderboard</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Organic Selection</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Seasonal Calendar</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Exotic Imports</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Subscription Boxes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6">Information</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Shipping Info</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Newsletter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6">Newsletter</h4>
            <p className="text-sm text-on-surface-variant mb-4">Get seasonal recipes and harvest alerts.</p>
            <div className="flex bg-surface-container-lowest rounded-full p-1 pl-4 items-center ring-1 ring-outline-variant/20">
              <input className="bg-transparent border-none outline-none text-sm w-full" placeholder="Your email" type="email" />
              <button className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-outline-variant/10 text-center text-xs text-on-surface-variant">
          © 2024 RYŌSHITSU FRUITS Co. All rights reserved.
        </div>
      </footer>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-nav border-t border-outline-variant/10 px-6 py-3 flex justify-between items-center z-50">
        <Link href="/products" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" data-weight="fill">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-bold">Browse</span>
        </button>
        <Link href="/cart" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="text-[10px] font-bold">Cart</span>
        </Link>
        <Link href={user ? '/account' : '/login'} className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </div>
    </>
  );
}
