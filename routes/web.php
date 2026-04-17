<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

Route::get('/', fn () => Inertia::render('Landing'));
Route::get('/products', fn () => Inertia::render('ProductListing'));
Route::get('/product/{slug}', [\App\Http\Controllers\ProductController::class, 'show']);
Route::get('/cart', fn () => Inertia::render('Cart'));
Route::get('/checkout', fn () => Inertia::render('Checkout'));
Route::get('/order-confirmation', fn () => Inertia::render('OrderConfirmation'));
Route::get('/login', fn () => Inertia::render('Login'));
Route::get('/register', fn () => Inertia::render('Register'));
Route::get('/account', fn () => Inertia::render('Account'));
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin', [\App\Http\Controllers\AuthController::class, 'adminDashboard']);
    Route::get('/admin/orders', [\App\Http\Controllers\AuthController::class, 'adminOrders']);
    Route::get('/admin/products', [\App\Http\Controllers\AuthController::class, 'adminProducts']);
    Route::get('/admin/users', fn () => Inertia::render('Admin/Users'));
});
Route::get('/offers', fn () => Inertia::render('Offers'));
Route::get('/about', fn () => Inertia::render('About'));
Route::get('/contact', fn () => Inertia::render('Contact'));
