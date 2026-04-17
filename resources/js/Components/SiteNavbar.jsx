import React, { useContext } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';

const primaryLinks = [
  { href: '/products', label: 'Store' },
  { href: '/offers', label: 'Offers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function isActivePath(currentPath, href) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function SiteNavbar({
  mode = 'fixed',
  showSearch = true,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search',
}) {
  const { url } = usePage();
  const { cart, user } = useContext(AppContext);
  const currentPath = url.split('?')[0];
  const isAuthPage = currentPath === '/login' || currentPath === '/register';
  const isLanding = currentPath === '/';
  const cartCount = cart?.length || 0;

  const shellClass =
    mode === 'sticky'
      ? 'sticky top-0'
      : 'fixed inset-x-0 top-0';

  const linkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-all ${
      isActivePath(currentPath, href)
        ? 'bg-primary text-on-primary shadow-sm'
        : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
    }`;

  return (
    <header className={`${shellClass} z-50 border-b border-outline-variant/10 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(16,24,40,0.08)]`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-headline text-2xl font-extrabold tracking-tight text-primary">
              RYOSHITSU
            </span>
          </Link>

          <nav className="hidden items-center rounded-full border border-outline-variant/10 bg-surface-container-low px-2 py-2 md:flex">
            {primaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {showSearch && !isAuthPage ? (
            <div className="hidden items-center gap-3 rounded-full border border-outline-variant/10 bg-surface-container-low px-4 py-2.5 lg:flex">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">search</span>
              <input
                className="w-52 bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => onSearchChange?.(event.target.value)}
              />
            </div>
          ) : null}

          {!isAuthPage ? (
            <Link href="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low text-on-surface transition-all hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-on-error">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          ) : null}

          {user ? (
            <Link
              href={user.is_admin ? '/admin' : '/account'}
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-all hover:bg-primary-dim sm:inline-flex"
            >
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              {user.is_admin ? 'Dashboard' : 'Account'}
            </Link>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              {!isLanding ? (
                <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-on-surface transition-all hover:bg-surface-container-high hover:text-primary">
                  Login
                </Link>
              ) : null}
              <Link href="/register" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-all hover:bg-primary-dim">
                Register
              </Link>
            </div>
          )}

          <Link
            href={user ? (user.is_admin ? '/admin' : '/account') : '/login'}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low text-on-surface transition-all hover:bg-primary hover:text-on-primary sm:hidden"
          >
            <span className="material-symbols-outlined text-[22px]">person</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
