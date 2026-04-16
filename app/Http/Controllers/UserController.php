<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function adminIndex()
    {
        return User::where('is_admin', false)->withCount('orders')->orderBy('created_at', 'desc')->paginate(20);
    }

    public function destroy($id)
    {
        $user = User::where('is_admin', false)->findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}

