<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return auth()->user()->orders()->with('items.product')->get();
    }

    public function adminIndex()
    {
        return Order::with('user', 'items.product')->orderBy('created_at', 'desc')->paginate(20);
    }

    public function show($id)
    {
        return Order::findOrFail($id)->load('items.product');
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_zipcode' => 'required|string',
        ]);

        return DB::transaction(function () use ($request) {
            $cartItems = auth()->user()->cartItems()->with('product')->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['error' => 'Cart is empty'], 400);
            }

            $subtotal = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);
            $total = $subtotal + 6 + 1.5; // delivery $6 + service $1.5

            $order = Order::create([
                'user_id' => auth()->id(),
                'total' => $total,
                'status' => 'completed',
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'shipping_address' => $request->shipping_address,
                'shipping_city' => $request->shipping_city,
                'shipping_zipcode' => $request->shipping_zipcode,
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);
            }

            CartItem::where('user_id', auth()->id())->delete();

            return [
                'order' => $order->load('items.product'),
                'message' => 'Order created successfully',
            ];
        });
    }
}

