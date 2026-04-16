import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import SiteLayout from '../Components/SiteLayout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('Thank you! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head title="Contact - RYŌSHITSU FRUITS" />
      <SiteLayout>
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="font-headline text-6xl font-bold text-on-surface mb-6">Connect With Us</h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Questions about our harvest schedule? Delivery inquiries? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="font-bold text-2xl text-on-surface mb-6">Orchard Direct</h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-on-surface mb-2">Harvest Hotline</h4>
                    <p className="text-on-surface-variant">(555) 123-4567</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface mb-2">Farm Email</h4>
                    <p className="text-on-surface-variant mb-1">hello@ryoshitsufruits.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface mb-2">Delivery Hours</h4>
                    <p className="text-on-surface-variant">Mon-Fri 8AM - 6PM PST</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container-low rounded-3xl p-8">
                <h3 className="font-bold text-xl text-on-surface mb-4">Visit the Orchard</h3>
                <p className="text-on-surface-variant mb-6">Experience the harvest firsthand. Tours by appointment Wednesday - Saturday.</p>
                <Link href="#" className="block w-full bg-primary text-on-primary py-4 rounded-xl text-center font-bold hover:bg-primary-dim transition-all">
                  Schedule Tour
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {status && (
                  <div className="bg-success-container text-on-success-container p-6 rounded-3xl">
                    {status}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-3">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl bg-surface-container-high px-6 py-4 border border-outline-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="John Orchard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-3">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl bg-surface-container-high px-6 py-4 border border-outline-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="you@orchard.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-3">Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl bg-surface-container-high px-6 py-4 border border-outline-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    placeholder="Tell us about your harvest needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-5 rounded-3xl font-bold text-lg hover:bg-primary-dim transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  Send Message
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>
          </div>

          <div className="text-center">
            <Link href="/products" className="inline-flex items-center gap-4 text-primary font-bold text-lg hover:underline">
              Continue Shopping
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}

