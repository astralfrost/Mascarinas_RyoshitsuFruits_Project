import React, { useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppContext } from '../Contexts/AppContext';

export default function Landing() {
  const { user } = useContext(AppContext);
  return (
    <>
      <Head title="RYŌSHITSU FRUITS" />
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-headline text-2xl font-extrabold text-primary tracking-tight">
              {false && <img alt="RYŌSHITSU FRUITS Logo" className="h-12 w-auto object-contain" src="" />}
              <span className="font-headline text-2xl font-extrabold text-primary tracking-tight">RYŌSHITSU</span>
            </span>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/products" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                Store
              </Link>
              <Link href="/offers" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                Offers
              </Link>
              <Link href="/offers" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                Offers
              </Link>
              <Link href="/about" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="font-label text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-surface-container-high px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm font-body ml-2 w-48" placeholder="Search our orchard..." type="text" />
            </div>
            <Link href="/cart" className="p-2 hover:bg-surface-container rounded-full transition-colors relative">
              <span className="material-symbols-outlined text-on-surface">shopping_cart</span>
            </Link>
            {user ? (
              <Link href="/account" className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface">account_circle</span>
              </Link>
            ) : (
              <Link href="/login" className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface">account_circle</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 z-10 space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-sm font-bold tracking-wide">
                EST. 2024 • HARVESTED DAILY
              </div>
              <h1 className="font-headline text-6xl md:text-8xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                Bursting with <span className="text-primary italic">Summer.</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
                Experience the raw, sun-kissed vibrancy of fruits grown with intention. No chemicals, just nature in its most editorial form.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products" className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-lg hover:bg-primary-dim transition-all editorial-shadow flex items-center gap-3">
                  Shop Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/products" className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-full font-headline font-bold text-lg hover:brightness-95 transition-all">
                  Seasonal Picks
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden editorial-shadow transform rotate-2">
                <img alt="Premium fruit selection" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlXlO5MXWrzKJVPBEBwRCA1OFyXDrBcNW0GWwJCbYCpimFIkDLokeeXKFqV-cgvA7Xm1k0xUlDH4HMgnQtldnlF8zw68P-LSqkr0TM-7K0HIR_V0NTHvZLGKoQfENM2xlRBawx1afuTkoi9d29CM6CpWT5CeY3eekay-GgEJYqyu3Tr7XEjiqh6PXaqP1KZBNtTmF8e2Dg8usZ91o-Llx4rOXZM7_Ois7JIHcdTCWB8p6xOc4GLGtUnhDmactVL_-KF9nQz3RbvOdx" />
              </div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-lg overflow-hidden editorial-shadow -rotate-6 hidden md:block">
                <img alt="Juicy Pineapple" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBahT84dSs8e4ZTI7RTr4Qc8iX4lLTOQSZ1AW87P2uWbXs60ctm-B2zvlS4eXrgZkmJZPwAZqjlQl69UXNeW9jgLBjqouTr4F279elTkGsUJ0ggbMq3lvTT3znrVrWiAEJzwaDZEVBEKWmt3sLxtlaXGwZ55TqVOgj_LR3iRoNoUTXGvAgIdbb0n8dHirYa1pZqVJKDSKInuiUu9_z4RMg1O6kTZZzlFQt8IRDufj9VasZor_hCLw82FTaaAg-eNbXPQ6EytupMt_H4" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-24 -z-10" />
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16 flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="font-headline text-4xl font-bold text-primary">Discover the Orchard</h2>
              <p className="text-on-surface-variant max-w-md">Curated collections of the finest organic produce, hand-selected for peak flavor profile.</p>
            </div>
            <a className="text-primary font-bold flex items-center gap-2 hover:underline" href="#">
              View Catalog <span className="material-symbols-outlined">arrow_outward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[700px]">
            <div className="md:col-span-2 md:row-span-2 rounded-lg relative overflow-hidden group bg-surface-container-low">
              <img alt="Mixed Berries" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxjRhpmSeVrILsu6pTJv_F-iAw28n5Ydjas7JYghRw6F5rqXKm-SR7tuwvJaJ3ieW5Jxx-LUnCA5jkakkNGw2Q2eO9y6If-eZNaiTXdBxCCvCNTTHpgHmmBldm-pjdlk86eXbk4lmWnBjgiGXSUUXT_no5o-fC-L8gZk8xjHy3KpceK136TByoruNdPiz3TJFdS1IzmZu5WYviFbLe46WEqaj62bM44ZGMP9cYeC1pC_n3YABF7OH320Lborq6o-NjXOCdCLuOyBQ9" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-headline text-3xl font-bold text-white mb-2">Berries</h3>
                <p className="text-white/80 font-body mb-4">Antioxidant-rich jewels.</p>
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-label text-sm uppercase tracking-widest border border-white/30">Explore</span>
              </div>
            </div>
            <div className="md:col-span-2 rounded-lg relative overflow-hidden group bg-surface-container-low">
              <img alt="Tropical Fruit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBhpMAZEuP6QGxVcmFrpnoBp2am4jYAjlB-xEu0TPDbiSx0Tv4w40Xpvh6Nt7-IH5W9LD9_DNAGF5-qoMkVR76HBbHeEm2dgl6MS8WWrY-bReVyvgSeDfQ-pYcN6dlmbw7NIkIofNTqh1ngg63AFAfSeIoLXG6hjL9y7GIruaflw_kKBzE_fahJ-11WeMWBM-m1AxpdMTF4dv-fcfDky6ep9AtceMUKOzLVNYAmhdqihPpxtbgHZOL4RforuYeQ4l2cHYq94eAXjBy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-headline text-2xl font-bold text-white mb-1">Tropical</h3>
                <span className="text-white/80 text-sm">Sun-drenched exotic favorites</span>
              </div>
            </div>
            <div className="md:col-span-2 rounded-lg relative overflow-hidden group bg-surface-container-low">
              <img alt="Citrus Fruit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4buumQb14TaXBgGPzKK2cmzmPPBOnvPd1SDPEAIpcEHOabSCWVnOGhbiUZWfuBUTtfwOyfh5oLTe8EqKtl3W0Rf6NSgwYYWiWoJp570O342tRdXrMskRUHSC5MdB9Gz61wNUGF4mLtqe9_KzdS9NOKSK-xYw-x8P_XJXsall6UiGqWi8ZHt5WcM8HtHZb7Aifkx3pXP2tuMriWPOF-4bFvw5lzjwfPxvp3trE6oh9FKTnZp_ehO_0VAfE_64j16NgIR_DxeTIUf3l" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-headline text-2xl font-bold text-white mb-1">Citrus</h3>
                <span className="text-white/80 text-sm">Zesty revitalization</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about-section" className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-4 mb-20">
              <h2 className="font-headline text-5xl font-extrabold text-on-surface">Harvest Highlights</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Selected by our master orchardists for exceptional sugar levels and nutrient density.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest mb-6 editorial-shadow transition-transform duration-500 group-hover:-translate-y-2">
                  <img alt="Heirloom Peaches" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKauW2-fwpdB34Dh6q_zPYF7VcclV5cVFNoRKSf0r2FCxvfi3crX8WJK3HiZe2tgXzCduNqVyyEjl1YSeje7LVuRWTWVzAEvyQGJ4Pa5Vs5ln7MQBvYzpNgMMSdKcjqZVxaz48Gd2azhOHukFiy1NVWOzGbUPeFK3KSDfOqWtMQkw0KsqXZ7JbMU9gvDpKuztW_wcn1VeRvjMlf-ot--Q2FpyLjuMYSDsLOiguiQnbQsZIGO2gRuUcbNUaM-xgoIoBbhkaNJCbWM8p" />
                </div>
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl font-bold text-on-surface">Heirloom Peaches</h4>
                    <span className="text-secondary font-bold text-lg">$12.50</span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-body">Case of 6 • Soft &amp; Fragrant</p>
                  <button disabled={!user} className="w-full mt-4 bg-surface-container-highest disabled:bg-surface-container disabled:text-on-surface-variant disabled:cursor-not-allowed group-hover:bg-primary group-hover:text-on-primary py-3 rounded-full font-label font-bold transition-all flex items-center justify-center gap-2">
                    {!user ? 'Login to Buy' : 'Add to Basket'}
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  </button>
                </div>
              </div>
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest mb-6 editorial-shadow transition-transform duration-500 group-hover:-translate-y-2">
                  <img alt="Blood Oranges" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD7fNwaVxeGz_UydSlsrDghexQTfd8CoR-SX7JD2NLd1PtOVLJlrxjpJnieJ64MbAzP6XWcrkm-EUza5SbWHNdq9XujwqrJOFe7SxUv6y82QKT7lMi0s7Ya9cqZKU1gaQIL_wRjPH76v6WCFgdAocs1PGlM5WOW3VvmcJoZLtcFm-xVjh9Te903UqxGi109RePtPY9qdhIPVTE8L3P8zRTLtf-mg95LxG3P7YzCncW1-YzJLwWL2r1Pc0AiPbhhKrzJPB4J0c5e6EF" />
                </div>
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl font-bold text-on-surface">Ruby Blood Oranges</h4>
                    <span className="text-secondary font-bold text-lg">$8.00</span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-body">Net wt. 2lb • Tart &amp; Complex</p>
                  <button className="w-full mt-4 bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary py-3 rounded-full font-label font-bold transition-all flex items-center justify-center gap-2">
                    Add to Basket
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  </button>
                </div>
              </div>
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest mb-6 editorial-shadow transition-transform duration-500 group-hover:-translate-y-2">
                  <img alt="Organic Fig" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcxRfboX8trGdVHQE5TuN3V6FzPKYdFxRKuj8KGAdZXuwtqYoA2Km9mDsKJUbB21eX_4ztpF0eKR1X7qYYVG28IQd-PSjifqdtfoXYI_HGrHEjID_rTF-Lf8-4eLkV1pL6scTPox9BBHDhvb6UVPm1_FVRnDIJf5qbuc8kr-cPV3x4px7vZ21_LF_U6v0ZmGNxIqrxmRAo9m3Fed4ayEnvlX8t122pAjxzR7cRG3OI0Lt6dZJghqm-p--DPpbqEWqcBbEQGiuHICoK" />
                </div>
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl font-bold text-on-surface">Black Mission Figs</h4>
                    <span className="text-secondary font-bold text-lg">$14.99</span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-body">Premium selection • Earthy Sweet</p>
                  <button className="w-full mt-4 bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary py-3 rounded-full font-label font-bold transition-all flex items-center justify-center gap-2">
                    Add to Basket
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  </button>
                </div>
              </div>
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest mb-6 editorial-shadow transition-transform duration-500 group-hover:-translate-y-2">
                  <img alt="Wild Strawberries" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYLak9bsaCQV0aV_wT_YMQQoXwALNfOad62svREonpwFUVlhxlg6htInlAaXuMpdT6o1-QHZrfu0WgV6TG-1NKu7f98cX5LFAbhOGii3K-fMnjJCXX9hW-NA-aSPQ-uTc3TPh0Ot78GsaQloDw1OY2uCjwX2M5GmZViq7efvdrU7klIRrQ9DAGQSnEsnKq1ehgGURhx8WAY4nP7MiBnXrPYKrH8gVq7BBtmePa2ibNymNsHUKHKQVktJF6vGXCaJ8uNQ2gZe792TkP" />
                </div>
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl font-bold text-on-surface">Wild Strawberries</h4>
                    <span className="text-secondary font-bold text-lg">$9.50</span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-body">1pt Container • Pure Essence</p>
                  <button className="w-full mt-4 bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary py-3 rounded-full font-label font-bold transition-all flex items-center justify-center gap-2">
                    Add to Basket
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative rounded-lg bg-primary overflow-hidden editorial-shadow flex flex-col md:flex-row items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(157,241,151,0.2),transparent_50%)]" />
            <div className="p-12 md:p-20 md:w-1/2 space-y-6 z-10">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-primary">Join the Grove.</h2>
              <p className="text-on-primary/80 text-lg">Receive weekly notifications about rare seasonal harvests and exclusive recipes from our farm-to-table partners.</p>
              <form className="flex flex-col sm:flex-row gap-4 pt-4">
                <input className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-secondary rounded-full px-6 py-4 flex-grow backdrop-blur-sm" placeholder="Your orchard address..." type="email" />
                <button className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-headline font-bold hover:bg-secondary-dim transition-all" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="md:w-1/2 h-[400px] w-full relative">
              <img alt="Farmer working" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuRbHqR2Xt6Nczr8A-jHtMayB6XoC4oTpbZxXHtk4vrWw6hO0dLWDoe9N1HEJYkqIJragmxAR0WhAHVaAUWEl2zwKF2hApHXdNBqjRcbzoBtu6TdfBURSettIuib1JCoyE09aMC-ixdjduNKLg6OhMWKk0b9pZvWWF-XGJG2DfUaTvDQcpIaxx2IA7cYa2gvYSyJDB8v-V8GJazA2woi1z7uhcKcscZhJFcOuYT2fdsXqHaFBvcdlZYRw8a8hy2Q2uZMFFy7p6" />
            </div>
          </div>
        </section>
      </main>

        <section id="contact-section" className="py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="font-headline text-5xl font-bold mb-6 text-on-surface">Get In Touch</h2>
              <p className="text-xl text-on-surface-variant mb-8 max-w-2xl mx-auto">
                Ready to experience orchard-fresh perfection? Reach out and our team will respond within 24 hours.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-surface-container-high p-8 rounded-3xl hover:shadow-xl transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block">phone</span>
                  <h4 className="font-bold text-xl mb-2">Harvest Hotline</h4>
                  <p className="text-on-surface-variant mb-2">(555) 123-4567</p>
                  <p className="text-sm text-on-surface-variant">Mon-Fri 8AM-6PM</p>
                </div>
                <div className="bg-surface-container-high p-8 rounded-3xl hover:shadow-xl transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block">mail</span>
                  <h4 className="font-bold text-xl mb-2">Email Us</h4>
                  <p className="text-on-surface-variant">hello@ryoshitsufruits.com</p>
                </div>
                <div className="bg-surface-container-high p-8 rounded-3xl hover:shadow-xl transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block">location_on</span>
                  <h4 className="font-bold text-xl mb-2">Visit Orchard</h4>
                  <p className="text-sm text-on-surface-variant mb-2">123 Orchard Lane</p>
                  <p className="text-sm text-on-surface-variant">Fruitvale, CA 90210</p>
                </div>
              </div>
              <Link href="/products" className="inline-flex items-center gap-4 bg-primary text-on-primary px-12 py-6 rounded-full font-bold text-lg hover:bg-primary-dim shadow-xl transition-all">
                Start Shopping
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </section>
      <footer className="bg-surface-container-low border-t border-outline-variant/20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <span className="font-headline text-2xl font-extrabold text-primary tracking-tight flex items-center gap-3">
              <span className="font-headline text-2xl font-extrabold text-primary tracking-tight">RYŌSHITSU FRUITS</span>
              </span>
              <p className="mt-6 text-on-surface-variant leading-relaxed">Defining the next generation of premium wellness through the lens of nature's finest seasonal produce.</p>
            </div>
            <div className="space-y-6">
              <h5 className="font-headline font-bold text-on-surface uppercase tracking-widest text-sm">Shop</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Weekly Boxes</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Rare Varieties</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Gift Cards</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Wholesale</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-headline font-bold text-on-surface uppercase tracking-widest text-sm">Company</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping Info</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Sustainability</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-headline font-bold text-on-surface uppercase tracking-widest text-sm">Social</h5>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">public</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">camera</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-outline-variant/20 text-center">
            <p className="text-on-surface-variant text-sm font-label">© 2024 RYŌSHITSU FRUITS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-surface-container-lowest border-t border-outline-variant/10 z-50 px-4 py-2 flex justify-between items-center">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-bold">Browse</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="text-[10px] font-bold">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </>
  );
}
