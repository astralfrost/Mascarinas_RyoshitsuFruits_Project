<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function adminIndex()
    {
        return Product::orderBy('created_at', 'desc')->paginate(20);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'nullable|string|max:100',
            'image_url' => 'nullable|string',
            'badge' => 'nullable|string|max:50',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'nullable|string|max:100',
            'image_url' => 'nullable|string',
            'badge' => 'nullable|string|max:50',
        ]);

        if ($validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        return Inertia::render('ProductDetail', compact('product'));
    }

    public function apiShow($slug)
    {
        return Product::where('slug', $slug)->firstOrFail();
    }
}

