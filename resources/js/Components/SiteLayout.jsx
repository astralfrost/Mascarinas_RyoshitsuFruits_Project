import React, { useContext } from 'react';
import { Link } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';

export default function SiteLayout({ children }) {
  const { cart, user } = useContext(AppContext);
  const isAuthPage = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass-nav border-b border-outline-variant/10 bg-surface-container-lowest/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-headline text-2xl font-extrabold text-primary tracking-tight">RYŌSHITSU</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
              Store
            </Link>
            {!isAuthPage && (
              <>
                <Link href="/cart" className="relative font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                  Cart
                  {cart && cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-error text-on-error text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link href="/offers" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                  Offers
                </Link>
              </>
            )}
            <Link href="/about" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/login" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
              Register
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-highest">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input
              className="bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-on-surface-variant w-56"
              type="text"
              placeholder="Search fruits..."
            />
          </div>
        </div>
      </header>

      <main className="pt-24">{children}</main>

      <footer className="bg-surface-container-low border-t border-outline-variant/10 py-16 px-6 mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <span className="font-headline text-2xl font-extrabold text-primary tracking-tight">RYŌSHITSU FRUITS</span>
            <p className="text-on-surface-variant mt-6 leading-relaxed">
              Harvested with care and delivered with pride — premium fruits made simple.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Fruits</Link></li>
              <li><a className="hover:text-primary transition-colors" href="#">Seasonal</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Gifts</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Recipes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><Link href="/login" className="hover:text-primary transition-colors">Account</Link></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Shipping</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6">Stay Updated</h4>
            <p className="text-sm text-on-surface-variant mb-4">Subscribe for fresh drops, early access, and farm-to-table news.</p>
            <div className="flex bg-surface-container-lowest rounded-full p-1 pl-4 items-center ring-1 ring-outline-variant/20">
              <input className="bg-transparent border-none outline-none text-sm w-full" placeholder="Your email" type="email" />
              <button className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 text-center text-xs text-on-surface-variant">
          © 2024 RYŌSHITSU FRUITS Co. All rights reserved.
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden glass-nav border-t border-outline-variant/10 px-4 py-2 flex justify-between items-center z-50 bg-surface-container-lowest/95 backdrop-blur-xl">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/products" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-bold">Browse</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors relative">
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="text-[10px] font-bold">Cart</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>
    </>
  );
}
