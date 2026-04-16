import React from 'react';
import { Head, Link } from '@inertiajs/react';
import SiteLayout from '../Components/SiteLayout';

export default function About() {
  return (
    <>
      <Head title="About - RYŌSHITSU FRUITS" />
      <SiteLayout>
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="font-headline text-6xl font-bold text-on-surface mb-6">Our Orchard</h1>
            <p className="text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
              RYŌSHITSU FRUITS was born from a singular obsession: to bridge the gap between pristine orchard quality 
              and urban tables, preserving every nuance of flavor through meticulous daily harvest and same-day delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <h2 className="font-headline text-4xl font-bold text-primary">The RYŌSHITSU Philosophy</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl text-on-surface mb-2">Daily Harvest</h3>
                    <p className="text-on-surface-variant">Fruits picked at peak ripeness, never stored overnight. From tree to your door within 12 hours maximum.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl text-on-surface mb-2">Zero Intervention</h3>
                    <p className="text-on-surface-variant">No chemicals, synthetic fertilizers or genetic modification. Pure varietals preserved for generations.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl text-on-surface mb-2">Curated Selection</h3>
                    <p className="text-on-surface-variant">Master orchardists select only superior specimens based on sugar content, texture and aromatic profile.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/products" className="inline-flex items-center gap-4 bg-primary text-on-primary px-12 py-6 rounded-full font-bold text-lg hover:bg-primary-dim transition-all shadow-xl">
              Begin Your Harvest
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}

