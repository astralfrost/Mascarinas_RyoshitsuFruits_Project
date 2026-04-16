<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = auth()->user()->cartItems()->with('product')->get();
        $total = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);
        
        return [
            'items' => $cartItems,
            'total' => $total,
        ];
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
            ],
            [
                'quantity' => $request->quantity,
            ]
        );

        return $this->index();
    }

    public function remove(Request $request)
    {
        CartItem::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->delete();

        return $this->index();
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        CartItem::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->update(['quantity' => $request->quantity]);

        return $this->index();
    }

    public function clear()
    {
        CartItem::where('user_id', auth()->id())->delete();
        return $this->index();
    }
}
