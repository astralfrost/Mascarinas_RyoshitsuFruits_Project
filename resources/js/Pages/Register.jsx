import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { authAPI } from '../api';
import SiteLayout from '../Components/SiteLayout';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(name, email, password, passwordConfirmation);
      localStorage.setItem('auth_token', response.data.token);
      window.location.href = '/products';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head title="Register" />
      <SiteLayout>
        <section className="max-w-6xl mx-auto px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center rounded-full bg-secondary-container px-4 py-2 text-sm font-bold text-on-secondary-container uppercase tracking-[0.2em]">
                Join the grove
              </span>
              <h1 className="font-headline text-5xl font-bold text-on-surface mt-6">Create an account</h1>
              <p className="text-on-surface-variant max-w-xl leading-relaxed">
                Register for fast checkout, order tracking, and personalized fruit recommendations.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-on-surface-variant">
              <div className="rounded-[2rem] bg-surface-container-low p-6 editorial-shadow">
                <span className="font-semibold text-on-surface">Fresh insights.</span>
                <p className="mt-3">Receive harvest highlights and seasonal recipes every week.</p>
              </div>
              <div className="rounded-[2rem] bg-surface-container-low p-6 editorial-shadow">
                <span className="font-semibold text-on-surface">Easy returns.</span>
                <p className="mt-3">Hassle-free support for any order concern or replacement.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-surface-container-low p-10 editorial-shadow">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">Sign up</h2>
            <form onSubmit={handleRegister} className="space-y-5">
              {error && (
                <div className="rounded-full bg-error-container text-on-error-container p-4 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm text-on-surface-variant mb-2">Name</label>
                <input
                  className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-on-surface-variant mb-2">Confirm Password</label>
                <input
                  className="w-full rounded-full bg-surface-container-high px-5 py-4 outline-none border border-outline-variant/20 focus:border-primary transition-colors"
                  type="password"
                  placeholder="Repeat your password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-bold hover:bg-primary-dim transition-all disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              <div className="text-center text-sm text-on-surface-variant">
                Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Login</Link>
              </div>
            </form>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}

