import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { authAPI } from '../api';
import SiteLayout from '../Components/SiteLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      // Smart redirect based on role
      if (response.data.user.is_admin) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/products';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head title="Login" />
      <SiteLayout>
        <section className="max-w-6xl mx-auto px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center rounded-full bg-tertiary-container px-4 py-2 text-sm font-bold text-on-tertiary-container uppercase tracking-[0.2em]">
                Welcome back
              </span>
              <h1 className="font-headline text-5xl font-bold text-on-surface mt-6">Login to your orchard account</h1>
              <p className="text-on-surface-variant max-w-xl leading-relaxed">
                Access your orders, saved collections, and exclusive seasonal offers.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-on-surface-variant">
              <div className="rounded-[2rem] bg-surface-container-low p-6 editorial-shadow">
                <span className="font-semibold text-on-surface">Keep your favorites close.</span>
                <p className="mt-3">Saved baskets, faster checkout, and early access to rare harvests.</p>
              </div>
              <div className="rounded-[2rem] bg-surface-container-low p-6 editorial-shadow">
                <span className="font-semibold text-on-surface">Secure checkout.</span>
                <p className="mt-3">Encrypted payments and protected account details for every order.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-surface-container-low p-10 editorial-shadow">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">Sign in</h2>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="rounded-full bg-error-container text-on-error-container p-4 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm text-on-surface-variant mb-2">Email</label>
                <input
                  className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-on-surface-variant mb-2">Password</label>
                <input
                  className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-bold hover:bg-primary-dim transition-all disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="text-center text-sm text-on-surface-variant">
                Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Create one</Link>
              </div>
            </form>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
