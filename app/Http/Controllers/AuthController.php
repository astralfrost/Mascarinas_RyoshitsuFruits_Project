<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);
        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'message' => 'Registered successfully'
        ];
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'message' => 'Logged in successfully'
        ];
    }

    public function logout()
    {
        request()->user()->currentAccessToken()->delete();
        return ['message' => 'Logged out successfully'];
    }

    public function user()
    {
        return request()->user();
    }

    public function adminDashboard()
    {
        return Inertia::render('Admin/Overview');
    }

    public function adminOrders()
    {
        return Inertia::render('Admin/Orders');
    }

    public function adminProducts()
    {
        return Inertia::render('Admin/Products');
    }
}

