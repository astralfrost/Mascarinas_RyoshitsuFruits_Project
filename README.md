# FruitsLaravel - E-commerce Demo

Laravel 11 + Inertia.js + React + TailwindCSS + Sanctum API

## Features
- Product catalog
- Shopping cart
- Checkout & Orders
- Admin dashboard
- User auth (register/login)

## Quick Start (Clone & Run)

1. **Clone**
   ```
   git clone <repo> fruitslaravel
   cd fruitslaravel
   ```

2. **Backend**
   ```
   composer install --optimize-autoloader --no-dev
   cp .env.example .env
   php artisan key:generate --ansi
   php artisan migrate --seed
   php artisan serve
   ```

3. **Frontend**
   ```
   npm ci
   npm run dev
   ```

4. **Open**
   http://localhost:8000

## Development

```
npm run dev  # Vite dev server
npm run build # Production build
```

## API

Protected by Sanctum Bearer tokens.

- `/api/login` POST {email, password}
- `/api/user` GET (auth)
- `/api/products` GET
- `/api/cart` GET/POST etc.

## Database

MySQL/SQLite. Edit .env.

Seeds: Products + Users.

## Troubleshooting

- 401 errors: Check SANCTUM_STATEFUL_DOMAINS in .env matches Vite port (default 5173)
- Set SESSION_DOMAIN=localhost

Enjoy!

